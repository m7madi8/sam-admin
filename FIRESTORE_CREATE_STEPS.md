# حل "Request timed out" – إنشاء قاعدة Firestore

إذا ظهرت رسالة **Request timed out** أو **انتهت المهلة** عند إرسال النموذج، السبب غالباً أن **قاعدة بيانات Firestore غير منشأة** في مشروعك. Realtime Database شيء مختلف؛ النماذج تحتاج **Firestore**.

## الخطوات (مشروعك: mido-wos)

### 1. إنشاء قاعدة Firestore

1. افتح [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروعك **mido-wos**
3. من القائمة اليسرى: **Build** → **Firestore Database**
4. إذا ظهر زر **Create database** اضغط عليه
5. اختر **موقع (location)** لقاعدة البيانات (مثلاً `europe-west1` أو الأقرب لك) ثم **Next**
6. في **Security rules** اختر **Start in test mode** (للاختبار) ثم **Next**، أو **Production mode** ثم عدّل القواعد في الخطوة التالية
7. اضغط **Create** وانتظر حتى تكتمل العملية

### 2. قواعد الأمان (Security Rules)

1. في نفس صفحة Firestore اضغط تبويب **Rules**
2. استبدل القواعد الحالية بهذا (يسمح بإنشاء طلبات من الموقع فقط):

```
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

3. اضغط **Publish**

### 3. التأكد

1. افتح الموقع عبر خادم محلي (مثلاً Live Server أو `npx serve .`) وليس بفتح الملف مباشرة
2. املأ النموذج واضغط إرسال
3. في Firebase Console → Firestore Database → **Data** يجب أن تظهر مجموعة **requests** والمستندات الجديدة بعد الإرسال

بعد تنفيذ هذه الخطوات، إنتهاء المهلة (Request timed out) يجب أن يختفي إذا كان السبب عدم وجود Firestore أو قواعد خاطئة.
