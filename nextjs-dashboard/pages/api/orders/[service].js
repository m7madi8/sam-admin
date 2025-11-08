import { connectToDatabase } from '../../../lib/mongodb';

/**
 * API Route ديناميكي لاستقبال وحفظ الطلبات
 * 
 * POST /api/orders/[service] - حفظ طلب جديد
 * GET /api/orders/[service] - جلب الطلبات لخدمة معينة
 * DELETE /api/orders/[service] - حذف طلبات (اختياري)
 * 
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */

export default async function handler(req, res) {
  // CORS headers للسماح بالطلبات من أي مصدر (يمكن تقييدها لاحقاً)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // معالجة OPTIONS request للـ CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { service } = req.query;

  // التحقق من وجود اسم الخدمة
  if (!service || service === 'undefined') {
    return res.status(400).json({ 
      ok: false, 
      error: 'Service name is required' 
    });
  }

  try {
    // الاتصال بقاعدة البيانات
    const { db } = await connectToDatabase();
    const collection = db.collection('orders');

    // POST - حفظ طلب جديد
    if (req.method === 'POST') {
      const { name, phone, email, location, details, area, projectType, constructionStatus } = req.body;

      // التحقق من الحقول المطلوبة
      if (!name || !phone) {
        return res.status(400).json({ 
          ok: false, 
          error: 'Name and phone are required' 
        });
      }

      // إنشاء المستند مع البيانات
      const order = {
        service: service, // اسم الخدمة من URL
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || '',
        location: location?.trim() || '',
        details: details?.trim() || '',
        area: area?.trim() || '',
        projectType: projectType?.trim() || '',
        constructionStatus: constructionStatus?.trim() || '',
        createdAt: new Date().toISOString(), // تاريخ الإنشاء
        status: 'new', // حالة الطلب (new, viewed, archived)
      };

      // إدراج المستند في قاعدة البيانات
      const result = await collection.insertOne(order);

      return res.status(201).json({ 
        ok: true, 
        id: result.insertedId,
        message: 'Order submitted successfully'
      });
    }

    // GET - جلب الطلبات
    if (req.method === 'GET') {
      const limit = parseInt(req.query.limit) || 100; // عدد الطلبات (افتراضي 100)
      const since = req.query.since; // تاريخ للفلترة (اختياري)
      const status = req.query.status; // حالة الطلب (اختياري)

      // بناء query للبحث
      const query = { service: service };

      // إضافة فلتر التاريخ إذا كان موجود
      if (since) {
        query.createdAt = { $gte: since };
      }

      // إضافة فلتر الحالة إذا كان موجود
      if (status) {
        query.status = status;
      }

      // جلب الطلبات مرتبة حسب التاريخ (الأحدث أولاً)
      const orders = await collection
        .find(query)
        .sort({ createdAt: -1 }) // ترتيب تنازلي
        .limit(limit)
        .toArray();

      return res.status(200).json({ 
        ok: true, 
        count: orders.length,
        orders: orders 
      });
    }

    // DELETE - حذف طلبات
    if (req.method === 'DELETE') {
      const { id } = req.query; // حذف طلب واحد حسب ID

      if (id) {
        // حذف طلب واحد
        const ObjectId = require('mongodb').ObjectId;
        const result = await collection.deleteOne({ 
          _id: new ObjectId(id),
          service: service 
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ 
            ok: false, 
            error: 'Order not found' 
          });
        }

        return res.status(200).json({ 
          ok: true, 
          message: 'Order deleted successfully' 
        });
      } else {
        // حذف جميع الطلبات للخدمة (احذر!)
        const result = await collection.deleteMany({ service: service });
        
        return res.status(200).json({ 
          ok: true, 
          deletedCount: result.deletedCount,
          message: `Deleted ${result.deletedCount} orders` 
        });
      }
    }

    // Method not allowed
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

