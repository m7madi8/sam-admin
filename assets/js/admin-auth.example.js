/**
 * إعداد تسجيل دخول لوحة التحكم – لا ترفع هذا الملف مع كلمة السر الحقيقية.
 *
 * 1) انسخ هذا الملف إلى admin-auth.js (ملف admin-auth.js مُستثنى من Git).
 * 2) ولّد hash كلمة السر بتشغيل هذا في وحدة تحكم المتصفح (Console):
 *
 *    function h(s){let n=0;for(let i=0;i<s.length;i++){n=((n<<5)-n)+s.charCodeAt(i);n=n&n;}return n.toString();}
 *    h('كلمة_السر_الخاصة_بك')
 *
 * 3) ضع الناتج في passwordHash أدناه.
 */
window.ADMIN_AUTH = {
  username: 'admin',
  passwordHash: ''   // مثال: '-456789012' — استبدله بناتج الدالة أعلاه
};
