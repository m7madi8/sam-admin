#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
سكريبت نسخ احتياطي لجدول الطلبات (orders)
- تصدير الجدول إلى CSV مع الحفاظ على الترتيب حسب created_at
- رفع الملف إلى Google Drive
- قابل للتشغيل يدوياً أو عبر جدولة (Cron/Task Scheduler)
جميع المكتبات المستخدمة مجانية.
"""

import os
import sys
import csv
import pickle
from datetime import datetime
from pathlib import Path

# مجلد السكريبت (لتحميل .env و credentials و backups)
_script_dir = Path(__file__).resolve().parent

# تحميل المتغيرات من ملف .env إن وُجد (من مجلد السكريبت أو المسار الحالي)
try:
    from dotenv import load_dotenv
    load_dotenv(_script_dir / ".env")
    load_dotenv()  # المسار الحالي أيضاً
except ImportError:
    pass

# ========== إعدادات قاعدة البيانات (من متغيرات البيئة أو .env) ==========
# نوع القاعدة: mysql أو postgresql
DB_TYPE = os.getenv("DB_TYPE", "mysql").strip().lower()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "3306") if DB_TYPE == "mysql" else os.getenv("DB_PORT", "5432"))
DB_USER = os.getenv("DB_USER", "")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_NAME = os.getenv("DB_NAME", "")
# اسم جدول الطلبات
ORDERS_TABLE = os.getenv("ORDERS_TABLE", "orders")
# عمود التاريخ للترتيب (يُستخدم في ORDER BY)
CREATED_AT_COLUMN = os.getenv("CREATED_AT_COLUMN", "created_at")

# ========== إعدادات Google Drive ==========
# معرّف المجلد في Google Drive الذي تُرفع فيه النسخ (من رابط المجلد)
DRIVE_FOLDER_ID = os.getenv("DRIVE_FOLDER_ID", "")
# مسار ملف credentials من Google Cloud Console (OAuth 2.0)
CREDENTIALS_PATH = os.getenv("CREDENTIALS_PATH", "credentials.json")
if not Path(CREDENTIALS_PATH).is_absolute():
    CREDENTIALS_PATH = str(_script_dir / CREDENTIALS_PATH)
# مجلد مؤقت لحفظ CSV قبل الرفع (داخل مجلد السكريبت)
BACKUP_DIR = _script_dir / "backups"


def validate_config():
    """التحقق من وجود الإعدادات الضرورية قبل التشغيل."""
    errors = []
    if not DB_USER:
        errors.append("DB_USER غير معرّف. عيّنه في .env أو متغير البيئة.")
    if not DB_PASSWORD and DB_TYPE == "mysql":
        # PostgreSQL يسمح بمصادقة بدون كلمة مرور (مثلاً peer)
        pass
    if not DB_NAME:
        errors.append("DB_NAME غير معرّف.")
    if not DRIVE_FOLDER_ID:
        errors.append("DRIVE_FOLDER_ID غير معرّف. ضع معرّف مجلد Google Drive.")
    if not Path(CREDENTIALS_PATH).exists():
        errors.append(f"ملف credentials غير موجود: {CREDENTIALS_PATH}")
    if errors:
        print("أخطاء إعداد:")
        for e in errors:
            print("  -", e)
        sys.exit(1)


def get_db_connection():
    """
    إنشاء اتصال بقاعدة البيانات حسب النوع (MySQL أو PostgreSQL).
    يُستخدم اتصال واحد لتنفيذ الاستعلام وجلب النتائج.
    """
    if DB_TYPE == "mysql":
        try:
            import mysql.connector
        except ImportError:
            print("تثبيت مكتبة MySQL مطلوب: pip install mysql-connector-python")
            sys.exit(1)
        conn = mysql.connector.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME,
        )
        return conn
    elif DB_TYPE == "postgresql":
        try:
            import psycopg2
        except ImportError:
            print("تثبيت مكتبة PostgreSQL مطلوب: pip install psycopg2-binary")
            sys.exit(1)
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME,
        )
        return conn
    else:
        print(f"نوع قاعدة غير مدعوم: {DB_TYPE}. استخدم mysql أو postgresql.")
        sys.exit(1)


def export_orders_to_csv(csv_path: Path) -> int:
    """
    تصدير جدول orders إلى ملف CSV مع الحفاظ على الترتيب حسب created_at.
    يُرجع عدد الصفوف المُصدّرة.
    """
    # التأكد من وجود المجلد المؤقت
    csv_path.parent.mkdir(parents=True, exist_ok=True)

    conn = get_db_connection()
    cursor = conn.cursor()

    # استعلام بترتيب حسب تاريخ الإنشاء (الأقدم أولاً؛ غيّر إلى DESC للأحدث أولاً)
    # PostgreSQL: أسماء الجداول/الأعمدة بين مزدوجتين؛ MySQL: بين backticks
    if DB_TYPE == "postgresql":
        query = f'SELECT * FROM "{ORDERS_TABLE}" ORDER BY "{CREATED_AT_COLUMN}"'
    else:
        query = f"SELECT * FROM `{ORDERS_TABLE}` ORDER BY `{CREATED_AT_COLUMN}`"
    cursor.execute(query)

    # أسماء الأعمدة
    columns = [desc[0] for desc in cursor.description]
    row_count = 0

    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(columns)
        for row in cursor:
            # تحويل أي قيمة None أو bytes إلى شكل مناسب للنص
            writer.writerow([str(c) if c is not None else "" for c in row])
            row_count += 1

    cursor.close()
    conn.close()
    return row_count


def get_drive_service():
    """
    بناء كائن الخدمة لـ Google Drive API باستخدام OAuth2.
    عند أول تشغيل يفتح المتصفح للمصادقة ويحفظ token في token.pickle.
    """
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    SCOPES = ["https://www.googleapis.com/auth/drive.file"]
    token_path = Path(__file__).resolve().parent / "token.pickle"

    creds = None
    if token_path.exists():
        with open(token_path, "rb") as f:
            creds = pickle.load(f)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, "wb") as f:
            pickle.dump(creds, f)

    return build("drive", "v3", credentials=creds)


def upload_to_drive(file_path: Path, folder_id: str) -> str:
    """
    رفع ملف إلى مجلد محدد في Google Drive.
    يُرجع معرّف الملف في Drive (id).
    """
    service = get_drive_service()
    file_name = file_path.name
    mime_type = "text/csv"

    from googleapiclient.http import MediaFileUpload

    media = MediaFileUpload(str(file_path), mimetype=mime_type, resumable=True)
    file_metadata = {"name": file_name, "parents": [folder_id]}

    created = service.files().create(body=file_metadata, media_body=media, fields="id").execute()
    return created.get("id")


def main():
    """التسلسل الرئيسي: التحقق من الإعداد → تصدير CSV → رفع إلى Drive."""
    validate_config()

    # اسم الملف بالتاريخ والوقت
    now = datetime.now()
    filename = f"orders_backup_{now.strftime('%Y%m%d_%H%M')}.csv"
    csv_path = BACKUP_DIR / filename

    print("جاري تصدير جدول الطلبات مع الترتيب حسب created_at...")
    row_count = export_orders_to_csv(csv_path)
    print(f"تم تصدير {row_count} صف إلى: {csv_path}")

    print("جاري الرفع إلى Google Drive...")
    file_id = upload_to_drive(csv_path, DRIVE_FOLDER_ID)
    print(f"تم الرفع بنجاح. معرّف الملف في Drive: {file_id}")

    # اختياري: حذف الملف المحلي بعد الرفع لتوفير المساحة
    # csv_path.unlink()
    print("اكتمل النسخ الاحتياطي بنجاح.")


if __name__ == "__main__":
    main()
