# 🔒 دليل الأمان

## 1. MongoDB Atlas Network Access

### للاختبار (غير آمن)
```
IP Address: 0.0.0.0/0
Comment: Allow from anywhere (testing only)
```

### للإنتاج (آمن)
1. احذف `0.0.0.0/0`
2. أضف IP ranges لـ Vercel فقط
3. أو استخدم MongoDB Atlas App Services مع IP Whitelist

## 2. حماية Dashboard

### الخيار 1: Vercel Password Protection
1. اذهب إلى Project Settings > Deployment Protection
2. فعّل "Password Protection"
3. أدخل username و password

### الخيار 2: Basic Auth في Next.js
أضف middleware في `pages/dashboard.js`:

```javascript
// في بداية dashboard.js
import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    const auth = sessionStorage.getItem('dashboard_auth');
    if (!auth) {
      const password = prompt('أدخل كلمة المرور:');
      if (password === 'YOUR_PASSWORD') {
        sessionStorage.setItem('dashboard_auth', 'true');
      } else {
        window.location.href = '/';
      }
    }
  }, []);
  
  // باقي الكود...
}
```

### الخيار 3: JWT Authentication (الأفضل)
- إضافة `/api/auth/login` endpoint
- استخدام cookies أو tokens
- حماية جميع API routes

## 3. Environment Variables

### ✅ افعل:
- احفظ متغيرات البيئة في Vercel Dashboard فقط
- استخدم `.env.local.example` كقالب
- لا ترفع `.env.local` إلى GitHub

### ❌ لا تفعل:
- لا تضع credentials في الكود
- لا ترفع `.env` files إلى Git
- لا تشارك Connection Strings علناً

## 4. MongoDB Database User

### أفضل الممارسات:
1. أنشئ user منفصل للإنتاج (ليس admin)
2. امنحه صلاحيات محدودة فقط (read/write على collection معينة)
3. استخدم password قوي (12+ characters)
4. فعّل 2FA على MongoDB Atlas account

## 5. API Rate Limiting

أضف rate limiting لحماية API:

```javascript
// في pages/api/orders/[service].js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100 // 100 طلب لكل IP
});
```

## 6. Input Validation

- ✅ تحقق من جميع المدخلات
- ✅ استخدم sanitization للـ strings
- ✅ تحقق من أنواع البيانات
- ✅ حدد طول الحقول

## 7. HTTPS Only

Vercel يوفر HTTPS تلقائياً، لكن تأكد من:
- ✅ Redirect HTTP إلى HTTPS
- ✅ استخدام HSTS headers

## 8. Monitoring & Logging

- راقب MongoDB Atlas logs
- راقب Vercel logs
- أضف error tracking (مثل Sentry)

## 9. Backup

- فعّل MongoDB Atlas automated backups
- احفظ نسخة من Environment Variables في مكان آمن

## 10. تحديثات الأمان

- ✅ حافظ على تحديث dependencies
- ✅ استخدم `npm audit` بانتظام
- ✅ راقب MongoDB Atlas security alerts

