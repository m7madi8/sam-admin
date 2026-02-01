# نسخ احتياطي لجدول الطلبات → CSV → Google Drive

سكريبت Python يصدر جدول `orders` إلى CSV (مرتباً حسب `created_at`) ويرفع الملف إلى مجلد في Google Drive.

## المتطلبات (كلها مجانية)

- Python 3.8+
- قاعدة بيانات MySQL/MariaDB أو PostgreSQL
- حساب Google وملف `credentials.json` من Google Cloud

## التثبيت

```bash
cd orders_backup
pip install -r requirements.txt
```

إذا استخدمت **MySQL فقط** يمكنك تثبيت:
```bash
pip install mysql-connector-python google-api-python-client google-auth-httplib2 google-auth-oauthlib python-dotenv
```

إذا استخدمت **PostgreSQL فقط**:
```bash
pip install psycopg2-binary google-api-python-client google-auth-httplib2 google-auth-oauthlib python-dotenv
```

## إعداد قاعدة البيانات

1. انسخ `config.example.env` إلى `.env`.
2. عدّل في `.env`:
   - `DB_TYPE=mysql` أو `postgresql`
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `ORDERS_TABLE=orders` و `CREATED_AT_COLUMN=created_at` إذا اختلفت الأسماء عندك.

## إعداد Google Drive API

1. ادخل إلى [Google Cloud Console](https://console.cloud.google.com/).
2. أنشئ مشروعاً (أو اختر مشروعاً موجوداً).
3. فعّل **Google Drive API** للمشروع.
4. من **APIs & Services → Credentials** أنشئ **OAuth 2.0 Client ID** (نوع Desktop).
5. حمّل ملف JSON وضعه في مجلد `orders_backup` باسم `credentials.json`.
6. أنشئ مجلداً في Google Drive للنسخ الاحتياطية، افتحه، ثم انسخ من الرابط الجزء بعد `folders/` — هذا هو `DRIVE_FOLDER_ID`.
7. في `.env` ضع: `DRIVE_FOLDER_ID=المعرّف_الذي_نسخته`.

## التشغيل

```bash
python backup_orders.py
```

أول تشغيل سيفتح المتصفح للمصادقة مع Google ويحفظ `token.pickle` لاحقاً.

## التشغيل اليومي (جدولة)

- **Windows:** استخدم "المجدول" (Task Scheduler) لتشغيل `python C:\path\to\orders_backup\backup_orders.py` يومياً.
- **Linux/Mac:** أضف في crontab:
  ```text
  0 2 * * * /usr/bin/python3 /path/to/orders_backup/backup_orders.py
  ```
  (مثال: الساعة 2 صباحاً كل يوم.)

## الملفات الناتجة

- CSV يُحفظ في `orders_backup/backups/` باسم مثل: `orders_backup_20260131_1430.csv`.
- نفس الملف يُرفع إلى المجلد المحدد في Google Drive.

بعد وضع بيانات قاعدة البيانات وملف `credentials.json` وتعبئة `.env`، السكريبت جاهز للتشغيل.
