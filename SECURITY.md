# الأمان (Security)

## لوحة التحكم (f1.html)

- **كلمة السر**: لا تُخزّن في الكود. تُستخدم ملفات منفصلة:
  - `admin-auth.example.js`: نموذج فقط (يُرفع إلى Git).
  - `admin-auth.js`: يحتوي hash كلمة السر (مُستثنى من Git via `.gitignore`).
- إنشاء `admin-auth.js` من النموذج وتوليد الـ hash كما في التعليقات داخل الملف.

## Firebase

- إعدادات Firebase (firebase-config.js) تظهر في الواجهة؛ هذا معتاد. حماية البيانات عبر:
  - **قواعد أمان Firestore**: حدّد من يمكنه القراءة/الكتابة (مثلاً السماح بـ create للطلبات فقط، وقراءة محمية).
  - **Firebase Console**: قيّد مفتاح الويب (API key) بالنطاقات المسموحة (Application restriction → HTTP referrers).

### مثال قواعد Firestore (مجموعة requests)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /requests/{requestId} {
      // السماح للزوار بإنشاء طلب فقط (من الموقع)
      allow create: if true;
      // القراءة والحذف والتحديث: فقط لمستخدمين مصادقين (أو عبر Cloud Functions)
      allow read, update, delete: if false;
    }
  }
}
```

بعد التأكد من عمل الموقع، يمكنك تشديد `create` (مثلاً التحقق من الحقول أو استخدام App Check). للقراءة من لوحة التحكم (f1.html) ستحتاج إما مصادقة Firebase Auth أو backend يقرأ Firestore بصلاحيات الأدمن.

## النشر

- استخدم **HTTPS** دائماً في الإنتاج.
- يمكن منع فهرسة صفحة لوحة التحكم في محركات البحث (مثلاً `robots.txt` أو عدم ربطها من الصفحة الرئيسية).
