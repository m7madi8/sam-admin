# Samar Ammar Design Requests Dashboard

مشروع Next.js كامل لإدارة طلبات التصميم مع MongoDB Atlas ولوحة تحكم تفاعلية.

## 📋 المميزات

- ✅ 4 فورمات منفصلة للخدمات المختلفة
- ✅ API Routes لاستقبال وحفظ البيانات
- ✅ لوحة تحكم تعرض جميع الطلبات
- ✅ تحديث تلقائي كل 3 ثواني (Polling)
- ✅ جاهز للنشر على Vercel
- ✅ اتصال آمن مع MongoDB Atlas

## 🚀 البدء السريع

### 1. تثبيت المتطلبات

```bash
# استنساخ المشروع (إذا كان في repo)
git clone <repository-url>
cd nextjs-dashboard

# تثبيت الحزم
npm install
```

### 2. إعداد MongoDB Atlas

#### الخطوة 1: إنشاء حساب مجاني
1. اذهب إلى [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. سجل حساب جديد (مجاني تماماً)
3. اختر الخطة المجانية (M0 - Free)

#### الخطوة 2: إنشاء Cluster
1. بعد تسجيل الدخول، اضغط "Build a Database"
2. اختر "M0 FREE" (الخطة المجانية)
3. اختر Cloud Provider و Region (أقرب منطقة لك)
4. اضغط "Create"

#### الخطوة 3: إعداد Network Access
1. من القائمة الجانبية، اذهب إلى **Network Access**
2. اضغط "Add IP Address"
3. للاختبار السريع، اضغط "Allow Access from Anywhere" (سيضيف `0.0.0.0/0`)
   - ⚠️ **ملاحظة أمنية**: في الإنتاج، قم بتضييق IP addresses إلى Vercel IPs فقط
4. اضغط "Confirm"

#### الخطوة 4: إنشاء Database User
1. من القائمة الجانبية، اذهب إلى **Database Access**
2. اضغط "Add New Database User"
3. اختر "Password" كطريقة المصادقة
4. أدخل username و password (احفظهم!)
5. اختر "Atlas Admin" كـ Database User Privileges
6. اضغط "Add User"

#### الخطوة 5: الحصول على Connection String
1. من القائمة الجانبية، اضغط "Connect"
2. اختر "Connect your application"
3. اختر Driver: **Node.js** و Version: **5.5 or later**
4. انسخ Connection String (سيبدو هكذا):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. استبدل `<username>` و `<password>` بالقيم التي أنشأتها
6. أضف اسم قاعدة البيانات في نهاية الـ string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
   ```

#### الخطوة 6: إنشاء Database و Collection
1. من القائمة الجانبية، اضغط "Browse Collections"
2. إذا لم تكن هناك قاعدة بيانات، اضغط "Create Database"
3. أدخل Database Name: `mydb` (أو أي اسم تفضله)
4. أدخل Collection Name: `orders`
5. اضغط "Create"

### 3. إعداد متغيرات البيئة محلياً

1. انسخ ملف `.env.local.example` إلى `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. افتح `.env.local` واملأ القيم:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
   MONGODB_DB=mydb
   ```

   ⚠️ **مهم**: استبدل:
   - `username` → اسم المستخدم الذي أنشأته
   - `password` → كلمة المرور التي أنشأتها
   - `cluster0.xxxxx` → اسم الـ cluster الخاص بك
   - `mydb` → اسم قاعدة البيانات (يمكن تغييره)

### 4. تشغيل المشروع محلياً

```bash
# تشغيل في وضع التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

### 5. اختبار الفورمات

1. اذهب إلى `http://localhost:3000`
2. املأ أحد الفورمات واضغط "إرسال الطلب"
3. يجب أن ترى رسالة نجاح
4. اذهب إلى `http://localhost:3000/dashboard` لرؤية الطلب

## 🧪 اختبار API باستخدام curl

### إرسال طلب جديد (POST)

```bash
curl -X POST http://localhost:3000/api/orders/service1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "محمد أحمد",
    "phone": "0599123456",
    "email": "mohamed@example.com",
    "location": "رام الله",
    "details": "أريد تصميم داخلي لشقة",
    "area": "150",
    "projectType": "residential",
    "constructionStatus": "renovation"
  }'
```

### جلب الطلبات (GET)

```bash
# جلب جميع الطلبات
curl http://localhost:3000/api/orders/all?limit=20

# جلب طلبات خدمة معينة
curl http://localhost:3000/api/orders/service1?limit=10

# جلب طلبات جديدة فقط
curl http://localhost:3000/api/orders/all?status=new&limit=50
```

### حذف طلب (DELETE)

```bash
# حذف طلب واحد (استبدل ORDER_ID و SERVICE_NAME)
curl -X DELETE "http://localhost:3000/api/orders/service1?id=ORDER_ID"

# حذف جميع طلبات خدمة معينة (احذر!)
curl -X DELETE http://localhost:3000/api/orders/service1
```

## 📦 النشر على Vercel

### الطريقة 1: من GitHub (موصى بها)

#### الخطوة 1: رفع المشروع إلى GitHub
```bash
# تهيئة Git (إذا لم يكن موجود)
git init

# إضافة جميع الملفات
git add .

# عمل commit
git commit -m "Initial commit"

# إضافة remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# رفع الكود
git push -u origin main
```

#### الخطوة 2: ربط المشروع مع Vercel
1. اذهب إلى [Vercel](https://vercel.com) وسجل دخول
2. اضغط "Add New Project"
3. اختر GitHub repository الخاص بك
4. اضغط "Import"

#### الخطوة 3: إضافة Environment Variables
1. في صفحة إعدادات المشروع، اذهب إلى **Settings** > **Environment Variables**
2. أضف المتغيرات التالية:

   **MONGODB_URI**
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mydb?retryWrites=true&w=majority
   ```

   **MONGODB_DB**
   ```
   mydb
   ```

3. اختر **Production**, **Preview**, و **Development** لكل متغير
4. اضغط "Save"

#### الخطوة 4: النشر
1. اضغط "Deploy"
2. انتظر حتى يكتمل البناء (عادة 1-2 دقيقة)
3. ستحصل على رابط مثل: `https://your-project.vercel.app`

### الطريقة 2: استخدام Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# إضافة Environment Variables
vercel env add MONGODB_URI
vercel env add MONGODB_DB

# النشر للإنتاج
vercel --prod
```

## 🔒 الأمان

### 1. Network Access في MongoDB Atlas

**للاختبار**: استخدم `0.0.0.0/0` (السماح من أي مكان)

**للإنتاج**: قم بتضييق IP addresses:
1. اذهب إلى MongoDB Atlas > Network Access
2. احذف `0.0.0.0/0`
3. أضف IP addresses لـ Vercel (يمكنك البحث عن "Vercel IP ranges")

### 2. حماية Dashboard

**الخيار 1: Basic Auth (موصى به)**
- استخدم Vercel's Password Protection في Project Settings
- أو أضف middleware في Next.js للتحقق من المصادقة

**الخيار 2: JWT Authentication**
- أضف نظام تسجيل دخول كامل
- استخدم cookies أو tokens للتحقق

### 3. Environment Variables

- ✅ **افعل**: احفظ متغيرات البيئة في Vercel Dashboard فقط
- ❌ **لا تفعل**: لا ترفع `.env.local` إلى GitHub
- ✅ **افعل**: استخدم `.env.local.example` كقالب فقط

## 📁 هيكل المشروع

```
nextjs-dashboard/
├── lib/
│   └── mongodb.js          # اتصال MongoDB Singleton
├── pages/
│   ├── api/
│   │   └── orders/
│   │       ├── [service].js    # API route ديناميكي
│   │       └── all.js          # جلب جميع الطلبات
│   ├── index.js            # الصفحة الرئيسية (4 فورمات)
│   └── dashboard.js        # لوحة التحكم
├── .env.local.example      # قالب متغيرات البيئة
├── .gitignore
├── package.json
└── README.md
```

## 🔍 التحقق بعد النشر

### 1. اختبار الفورمات
- [ ] اذهب إلى `https://your-project.vercel.app`
- [ ] املأ فورم واضغط إرسال
- [ ] تحقق من رسالة النجاح

### 2. اختبار Dashboard
- [ ] اذهب إلى `https://your-project.vercel.app/dashboard`
- [ ] تحقق من ظهور الطلبات
- [ ] تحقق من التحديث التلقائي (انتظر 3 ثواني)

### 3. اختبار API
```bash
# اختبار POST
curl -X POST https://your-project.vercel.app/api/orders/service1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"0599999999"}'

# اختبار GET
curl https://your-project.vercel.app/api/orders/all?limit=10
```

### 4. التحقق من MongoDB Atlas
- [ ] اذهب إلى MongoDB Atlas > Browse Collections
- [ ] تحقق من وجود البيانات في collection `orders`

## 🛠️ استكشاف الأخطاء

### خطأ: "MONGODB_URI is not defined"
- ✅ تأكد من وجود `.env.local` محلياً
- ✅ تأكد من إضافة Environment Variables في Vercel

### خطأ: "Authentication failed"
- ✅ تحقق من username و password في Connection String
- ✅ تأكد من استبدال `<username>` و `<password>` بالقيم الصحيحة

### خطأ: "Network timeout"
- ✅ تحقق من Network Access في MongoDB Atlas
- ✅ تأكد من إضافة `0.0.0.0/0` للاختبار

### Dashboard لا يعرض بيانات
- ✅ تحقق من console في المتصفح (F12)
- ✅ تحقق من Network tab لرؤية طلبات API
- ✅ تأكد من وجود بيانات في MongoDB Atlas

## 🚀 تحسينات مقترحة

### 1. MongoDB Realm / App Services
- استخدام MongoDB Realm للتحقق من الهوية
- إضافة قواعد أمان على مستوى قاعدة البيانات

### 2. JWT Authentication
- إضافة نظام تسجيل دخول للـ Dashboard
- حماية API routes بـ middleware

### 3. Real-time Updates
- استبدال Polling بـ WebSockets أو Server-Sent Events
- استخدام MongoDB Change Streams

### 4. Pagination
- إضافة pagination للطلبات في Dashboard
- تحسين الأداء للقواعد الكبيرة

### 5. Email Notifications
- إرسال إيميل عند استلام طلب جديد
- استخدام SendGrid أو Resend

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من console logs في المتصفح
2. تحقق من Vercel logs في Dashboard
3. تحقق من MongoDB Atlas logs

## 📝 الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام الحر.

---

**ملاحظة**: تأكد من تغيير كلمات المرور الافتراضية وإعدادات الأمان قبل النشر للإنتاج!

