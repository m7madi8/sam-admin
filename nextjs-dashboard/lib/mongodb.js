import { MongoClient } from 'mongodb';

/**
 * MongoDB Connection Singleton
 * يعيد استخدام نفس الاتصال في serverless functions لتجنب فتح اتصالات كثيرة
 */

// متغيرات البيئة المطلوبة
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

/**
 * Global variable لتخزين العميل والاتصال
 * في production (Vercel) هذا سيكون موجود في memory بين الـ invocations
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

/**
 * الاتصال بقاعدة البيانات MongoDB Atlas
 * @returns {Promise<{client: MongoClient, db: Db}>}
 */
export async function connectToDatabase() {
  // إذا كان الاتصال موجود ومفتوح، نعيده مباشرة
  if (cached.conn) {
    return cached.conn;
  }

  // إذا لم يكن هناك promise للاتصال، ننشئ واحد جديد
  if (!cached.promise) {
    const opts = {
      // خيارات الاتصال الموصى بها لـ MongoDB Atlas
      maxPoolSize: 10, // عدد الاتصالات في الـ pool
      minPoolSize: 1,
      socketTimeoutMS: 45000, // timeout للـ socket
      serverSelectionTimeoutMS: 5000, // timeout لاختيار السيرفر
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      };
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // في حالة الخطأ، نمسح الـ promise لنحاول مرة أخرى
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * إغلاق الاتصال (اختياري - عادة لا نحتاجه في serverless)
 */
export async function closeConnection() {
  if (cached.conn) {
    await cached.conn.client.close();
    cached.conn = null;
    cached.promise = null;
  }
}

