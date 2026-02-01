/**
 * يولد ملف admin-auth.js من متغيرات البيئة (للاستخدام على Vercel أو أي استضافة تدعم env).
 * لا يشغّل على جهازك المحلي إن لم تُضبط المتغيرات.
 */
const fs = require('fs');
const path = require('path');

const username = process.env.ADMIN_USERNAME;
const passwordHash = process.env.ADMIN_PASSWORD_HASH;

if (!username || !passwordHash) {
  console.log('ADMIN_USERNAME أو ADMIN_PASSWORD_HASH غير مضبوطين — تخطي إنشاء admin-auth.js');
  process.exit(0);
}

const outDir = path.join(__dirname, '..', 'assets', 'js');
const outFile = path.join(outDir, 'admin-auth.js');
const content = `/**
 * مولّد من متغيرات البيئة عند النشر — لا تعدّل يدوياً على الاستضافة.
 */
window.ADMIN_AUTH = {
  username: ${JSON.stringify(username)},
  passwordHash: ${JSON.stringify(passwordHash)}
};
`;

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(outFile, content, 'utf8');
console.log('تم إنشاء assets/js/admin-auth.js من متغيرات البيئة.');
