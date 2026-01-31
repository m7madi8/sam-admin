# إعداد Firebase للنماذج (Forms)

تم ربط جميع النماذج التالية بـ **Firebase Firestore**:

- **الصفحة الرئيسية** (`index.html`): نموذج "Write To Us" (اتصل بنا)
- **حجز موعد** (`assets/pages/booking.html`): نموذج حجز المواعيد
- **طلب خدمة داخلي** (`assets/pages/index-interior.html`): Interior Design Request
- **طلب خدمة خارجي** (`assets/pages/index-exterior.html`): Exterior Design Request
- **طلب خدمة تنسيق** (`assets/pages/index-landscape.html`): Landscape Design Request

## الخطوات المطلوبة

### 1. إنشاء مشروع Firebase

1. ادخل إلى [Firebase Console](https://console.firebase.google.com/)
2. أنشئ مشروعاً جديداً أو اختر مشروعاً موجوداً
3. فعّل **Firestore Database** من القائمة الجانبية: Build → Firestore Database → Create database (واختر وضع الإنتاج ثم حدد الموقع المناسب)

### 2. الحصول على بيانات الإعداد (Config)

1. من Firebase Console: Project Settings (⚙️) → Your apps
2. اضغط على أيقونة الويب `</>` لإضافة تطبيق ويب
3. انسخ كائن `firebaseConfig` الذي يظهر لك

### 3. تعديل ملف الإعداد في المشروع

افتح الملف:

```
assets/js/firebase-config.js
```

واستبدل القيم الموجودة بقيم مشروعك:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",           // من Firebase Console
  authDomain: "xxx.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123..."
};
```

احفظ الملف بعد التعديل.

### 4. قواعد الأمان في Firestore (Security Rules)

في Firestore → Rules، استخدم قواعد تسمح بالكتابة للنماذج فقط (من الويب) واقرأ البيانات فقط للمستخدمين المسجلين أو من لوحة التحكم. مثال للسماح بإنشاء المستندات في مجموعة `requests` دون قراءة من العميل:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /requests/{document} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

يمكنك لاحقاً تقييد `create` بـ `request.auth != null` إذا أضفت تسجيل دخول للأدمن.

### 5. المجموعة (Collection) المستخدمة

جميع إرسالات النماذج تُحفظ في مجموعة واحدة باسم **`requests`**، مع الحقول التالية حسب نوع النموذج:

- `service`: نوع الطلب (Message, Booking, Interior Design, Exterior Design, Landscape Design)
- `name`, `email`, `phone`, `notes`, `status`, `createdAt`
- للحجز: `project_type` (نوع الخدمة)، وتفاصيل الموعد في `notes`
- لطلبات الخدمات: `location`, `construction_status`, `area`, `project_type`

يمكنك عرض البيانات من Firebase Console → Firestore → مجموعة `requests`.

---

بعد تنفيذ الخطوات أعلاه وتحديث `firebase-config.js`، النماذج ستعمل مع Firebase دون الحاجة لتغيير أي صفحة أخرى.

## استكشاف الأخطاء: النموذج يبقى "جاري الإرسال" ولا يُرسل

1. **تشغيل الموقع عبر خادم محلي (مهم)**  
   لا تفتح الموقع بفتح الملف مباشرة (`file:///...`). Firebase لا يعمل مع `file://`.  
   استخدم أحد الخيارات:
   - امتداد **Live Server** في VS Code: كليك يمين على `index.html` → Open with Live Server
   - أو من الطرفية: `npx serve .` ثم افتح الرابط الذي يظهر (مثلاً `http://localhost:3000`)

2. **تفعيل Firestore وليس Realtime Database فقط**  
   من Firebase Console: **Build** → **Firestore Database** → إن لم تكن أنشأتها من قبل، اضغط **Create database** واختر الموقع ثم اكمل. النماذج تستخدم **Firestore** وليس Realtime Database.

3. **قواعد الأمان (Security Rules)**  
   إذا ظهرت رسالة مثل "Permission denied" أو "تعذر الإرسال":
   - ادخل إلى Firebase Console → **Firestore Database** → تبويب **Rules**
   - تأكد من وجود قاعدة تسمح بإنشاء مستندات في مجموعة `requests` (مثل `allow create: if true;` كما في القسم 4 أعلاه)
   - اضغط **Publish** لحفظ القواعد

4. **انتهاء المهلة (Timeout)**  
   إذا ظهرت رسالة "انتهت المهلة" أو "Request timed out":
   - تحقق من اتصال النت
   - تأكد أن Firestore مُنشأ ومُفعّل في المشروع
   - جرّب من متصفح آخر أو بعد تعطيل الإضافات التي قد تحجب طلبات Firebase
