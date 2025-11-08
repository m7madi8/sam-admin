# ⚡ البدء السريع (5 دقائق)

## 1️⃣ تثبيت الحزم
```bash
npm install
```

## 2️⃣ إعداد MongoDB Atlas
1. سجل في [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. أنشئ Cluster مجاني (M0)
3. في Network Access: أضف `0.0.0.0/0`
4. في Database Access: أنشئ user جديد
5. احصل على Connection String من "Connect" > "Connect your application"

## 3️⃣ إعداد Environment Variables
```bash
# انسخ ملف env.example
cp env.example .env.local

# افتح .env.local واملأ القيم:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mydb?retryWrites=true&w=majority
# MONGODB_DB=mydb
```

## 4️⃣ تشغيل المشروع
```bash
npm run dev
```

افتح: http://localhost:3000

## 5️⃣ النشر على Vercel
1. ارفع المشروع إلى GitHub
2. في Vercel: Import Project
3. أضف Environment Variables (MONGODB_URI, MONGODB_DB)
4. اضغط Deploy

**تم! 🎉**

للتفاصيل الكاملة: راجع `README.md`

