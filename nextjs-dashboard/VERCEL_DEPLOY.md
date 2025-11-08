# 🚀 دليل النشر السريع على Vercel (5 خطوات)

## الخطوة 1: رفع المشروع إلى GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## الخطوة 2: إنشاء مشروع جديد في Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "Add New Project"
3. اختر GitHub repository
4. اضغط "Import"

## الخطوة 3: إضافة Environment Variables
في صفحة الإعدادات:
- **MONGODB_URI**: `mongodb+srv://username:password@cluster.mongodb.net/mydb?retryWrites=true&w=majority`
- **MONGODB_DB**: `mydb`

## الخطوة 4: النشر
1. اضغط "Deploy"
2. انتظر 1-2 دقيقة
3. احصل على الرابط: `https://your-project.vercel.app`

## الخطوة 5: التحقق
- ✅ اختبر الفورمات: `https://your-project.vercel.app`
- ✅ اختبر Dashboard: `https://your-project.vercel.app/dashboard`
- ✅ تحقق من MongoDB Atlas أن البيانات تم حفظها

**تم! 🎉**

