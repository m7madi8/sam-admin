# 🧪 دليل الاختبار

## اختبار محلي

### 1. اختبار الفورمات
```bash
# شغّل المشروع
npm run dev

# افتح المتصفح
http://localhost:3000
```

**التحقق:**
- [ ] جميع الفورمات الأربعة تظهر
- [ ] يمكن ملء الحقول
- [ ] عند الإرسال تظهر رسالة نجاح
- [ ] البيانات تُحفظ في MongoDB

### 2. اختبار Dashboard
```bash
# افتح Dashboard
http://localhost:3000/dashboard
```

**التحقق:**
- [ ] الطلبات تظهر في الجدول
- [ ] التحديث التلقائي يعمل (كل 3 ثواني)
- [ ] الفلاتر تعمل (الخدمة والحالة)
- [ ] يمكن تغيير حالة الطلب
- [ ] يمكن حذف الطلبات

### 3. اختبار API باستخدام curl

#### POST - إرسال طلب
```bash
curl -X POST http://localhost:3000/api/orders/service1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "محمد أحمد",
    "phone": "0599123456",
    "email": "test@example.com",
    "location": "رام الله",
    "details": "أريد تصميم داخلي",
    "area": "150",
    "projectType": "residential",
    "constructionStatus": "renovation"
  }'
```

**النتيجة المتوقعة:**
```json
{
  "ok": true,
  "id": "507f1f77bcf86cd799439011",
  "message": "Order submitted successfully"
}
```

#### GET - جلب الطلبات
```bash
# جميع الطلبات
curl http://localhost:3000/api/orders/all?limit=10

# طلبات خدمة معينة
curl http://localhost:3000/api/orders/service1?limit=5

# طلبات جديدة فقط
curl http://localhost:3000/api/orders/all?status=new
```

**النتيجة المتوقعة:**
```json
{
  "ok": true,
  "count": 5,
  "orders": [
    {
      "_id": "...",
      "service": "service1",
      "name": "محمد أحمد",
      "phone": "0599123456",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "status": "new"
    }
  ]
}
```

#### DELETE - حذف طلب
```bash
# حذف طلب واحد
curl -X DELETE "http://localhost:3000/api/orders/service1?id=ORDER_ID"

# حذف جميع طلبات خدمة (احذر!)
curl -X DELETE http://localhost:3000/api/orders/service1
```

### 4. اختبار باستخدام Postman

1. **إنشاء Request جديد:**
   - Method: POST
   - URL: `http://localhost:3000/api/orders/service1`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Test User",
     "phone": "0599999999",
     "email": "test@test.com",
     "location": "Test Location",
     "details": "Test details"
   }
   ```

2. **اختبار GET:**
   - Method: GET
   - URL: `http://localhost:3000/api/orders/all?limit=10`

## اختبار بعد النشر على Vercel

### 1. اختبار الفورمات
```
https://your-project.vercel.app
```
- [ ] الفورمات تعمل
- [ ] البيانات تُحفظ
- [ ] رسائل النجاح تظهر

### 2. اختبار Dashboard
```
https://your-project.vercel.app/dashboard
```
- [ ] الطلبات تظهر
- [ ] التحديث التلقائي يعمل
- [ ] جميع الوظائف تعمل

### 3. اختبار API
```bash
# استبدل YOUR_PROJECT_URL برابط Vercel
curl -X POST https://YOUR_PROJECT_URL.vercel.app/api/orders/service1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"0599999999"}'
```

## اختبار MongoDB Atlas

1. اذهب إلى MongoDB Atlas Dashboard
2. اضغط "Browse Collections"
3. اختر database `mydb`
4. اختر collection `orders`
5. تحقق من وجود البيانات

## قائمة التحقق النهائية

### قبل النشر:
- [ ] جميع الفورمات تعمل محلياً
- [ ] Dashboard يعرض البيانات
- [ ] API routes تستجيب بشكل صحيح
- [ ] MongoDB connection يعمل
- [ ] Environment variables مضبوطة

### بعد النشر:
- [ ] الموقع يعمل على Vercel
- [ ] الفورمات تعمل على Vercel
- [ ] Dashboard يعمل على Vercel
- [ ] البيانات تُحفظ في MongoDB
- [ ] التحديث التلقائي يعمل
- [ ] لا توجد أخطاء في console

## استكشاف الأخطاء

### خطأ: "Cannot connect to MongoDB"
- ✅ تحقق من MONGODB_URI في Environment Variables
- ✅ تحقق من Network Access في MongoDB Atlas
- ✅ تحقق من username و password

### خطأ: "404 Not Found"
- ✅ تحقق من أن الملفات في المسار الصحيح
- ✅ تحقق من أن API routes موجودة في `pages/api/`

### خطأ: "CORS error"
- ✅ تحقق من CORS headers في API routes
- ✅ تحقق من next.config.js

### Dashboard لا يعرض بيانات
- ✅ افتح Developer Tools (F12)
- ✅ تحقق من Network tab
- ✅ تحقق من Console للأخطاء
- ✅ تحقق من أن API يعيد بيانات صحيحة

