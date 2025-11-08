import { connectToDatabase } from '../../../lib/mongodb';

/**
 * API Route لجلب جميع الطلبات من جميع الخدمات
 * 
 * GET /api/orders/all - جلب جميع الطلبات
 * 
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('orders');

    const limit = parseInt(req.query.limit) || 200;
    const since = req.query.since;
    const status = req.query.status;

    // بناء query
    const query = {};

    if (since) {
      query.createdAt = { $gte: since };
    }

    if (status) {
      query.status = status;
    }

    // جلب جميع الطلبات مرتبة حسب التاريخ
    const orders = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return res.status(200).json({ 
      ok: true, 
      count: orders.length,
      orders: orders 
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

