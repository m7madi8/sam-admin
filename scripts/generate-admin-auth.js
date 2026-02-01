/**
 * يولد admin-auth.js من متغيرات البيئة (Vercel أو غيره). اسم المستخدم وكلمة المرور فقط.
 */
const fs = require('fs');
const path = require('path');

const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  console.log('ADMIN_USERNAME أو ADMIN_PASSWORD غير مضبوطين — تخطي إنشاء admin-auth.js');
  process.exit(0);
}

const outDir = path.join(__dirname, '..', 'assets', 'js');
const outFile = path.join(outDir, 'admin-auth.js');
const content = `/**
 * مولّد من متغيرات البيئة عند النشر.
 */
window.ADMIN_AUTH = {
  username: ${JSON.stringify(username)},
  password: ${JSON.stringify(password)}
};
`;

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(outFile, content, 'utf8');
console.log('تم إنشاء assets/js/admin-auth.js من متغيرات البيئة.');