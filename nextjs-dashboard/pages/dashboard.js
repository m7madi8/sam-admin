import { useState, useEffect } from 'react';
import Head from 'next/head';

/**
 * لوحة التحكم - تعرض جميع الطلبات مع تحديث تلقائي كل 3 ثواني
 */

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [filter, setFilter] = useState('all'); // all, service1, service2, etc.
  const [statusFilter, setStatusFilter] = useState('all'); // all, new, viewed, archived

  /**
   * جلب الطلبات من API
   */
  const fetchOrders = async () => {
    try {
      setError(null);
      
      // بناء URL حسب الفلتر
      let url = '/api/orders/all?limit=200';
      if (filter !== 'all') {
        url = `/api/orders/${filter}?limit=200`;
      }
      
      // إضافة فلتر الحالة إذا كان موجود
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.ok) {
        setOrders(result.orders);
        setLastUpdate(new Date());
      } else {
        throw new Error(result.error || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * تحديث تلقائي كل 3 ثواني
   */
  useEffect(() => {
    // جلب البيانات فوراً
    fetchOrders();

    // إعداد interval للتحديث التلقائي
    const interval = setInterval(() => {
      fetchOrders();
    }, 3000); // 3 ثواني

    // تنظيف interval عند إغلاق المكون
    return () => clearInterval(interval);
  }, [filter, statusFilter]); // إعادة الجلب عند تغيير الفلتر

  /**
   * تحديث حالة الطلب
   */
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // هنا يمكن إضافة API endpoint لتحديث الحالة
      // مؤقتاً سنقوم بتحديث الحالة محلياً فقط
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  /**
   * حذف طلب
   */
  const deleteOrder = async (orderId, service) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${service}?id=${orderId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.ok) {
        // إزالة الطلب من القائمة
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
      } else {
        alert('فشل حذف الطلب: ' + result.error);
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('حدث خطأ أثناء حذف الطلب');
    }
  };

  /**
   * تنسيق التاريخ
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * الحصول على اسم الخدمة بالعربية
   */
  const getServiceName = (service) => {
    const names = {
      service1: 'التصميم الداخلي',
      service2: 'التصميم الخارجي',
      service3: 'تصميم الحدائق',
      service4: 'الاستشارة',
    };
    return names[service] || service;
  };

  /**
   * الحصول على لون الحالة
   */
  const getStatusColor = (status) => {
    const colors = {
      new: '#17a2b8',
      viewed: '#6c757d',
      archived: '#ffc107',
    };
    return colors[status] || '#6c757d';
  };

  return (
    <>
      <Head>
        <title>لوحة التحكم - Samar Ammar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>لوحة التحكم</h1>
          <div className="header-info">
            <a href="/" className="back-link">← العودة للصفحة الرئيسية</a>
            {lastUpdate && (
              <span className="last-update">
                آخر تحديث: {formatDate(lastUpdate.toISOString())}
              </span>
            )}
          </div>
        </header>

        {/* الفلاتر */}
        <div className="filters">
          <div className="filter-group">
            <label>الخدمة:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">جميع الخدمات</option>
              <option value="service1">التصميم الداخلي</option>
              <option value="service2">التصميم الخارجي</option>
              <option value="service3">تصميم الحدائق</option>
              <option value="service4">الاستشارة</option>
            </select>
          </div>

          <div className="filter-group">
            <label>الحالة:</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">جميع الحالات</option>
              <option value="new">جديد</option>
              <option value="viewed">معروض</option>
              <option value="archived">مؤرشف</option>
            </select>
          </div>

          <button onClick={fetchOrders} className="refresh-btn" disabled={loading}>
            {loading ? 'جاري التحديث...' : 'تحديث'}
          </button>
        </div>

        {/* رسالة الخطأ */}
        {error && (
          <div className="alert alert-error">
            خطأ: {error}
          </div>
        )}

        {/* جدول الطلبات */}
        {loading && orders.length === 0 ? (
          <div className="loading">جاري تحميل البيانات...</div>
        ) : orders.length === 0 ? (
          <div className="empty-state">لا توجد طلبات</div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>الخدمة</th>
                  <th>الاسم</th>
                  <th>الهاتف</th>
                  <th>البريد</th>
                  <th>الموقع</th>
                  <th>المساحة</th>
                  <th>التاريخ</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="service-badge">{getServiceName(order.service)}</span>
                    </td>
                    <td>{order.name}</td>
                    <td>
                      <a href={`tel:${order.phone}`}>{order.phone}</a>
                    </td>
                    <td>{order.email || '-'}</td>
                    <td>{order.location || '-'}</td>
                    <td>{order.area ? `${order.area} م²` : '-'}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <select
                        value={order.status || 'new'}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        style={{ 
                          backgroundColor: getStatusColor(order.status || 'new'),
                          color: 'white',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="new">جديد</option>
                        <option value="viewed">معروض</option>
                        <option value="archived">مؤرشف</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteOrder(order._id, order.service)}
                        className="delete-btn"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* إحصائيات */}
        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">{orders.length}</div>
            <div className="stat-label">إجمالي الطلبات</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {orders.filter(o => o.status === 'new').length}
            </div>
            <div className="stat-label">طلبات جديدة</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {orders.filter(o => o.status === 'viewed').length}
            </div>
            <div className="stat-label">معروضة</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          direction: rtl;
        }

        .dashboard-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #d8cfc3;
        }

        .dashboard-header h1 {
          color: #a48a6d;
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .header-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .back-link {
          color: #c8aa88;
          text-decoration: none;
          font-weight: 500;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .last-update {
          color: #666;
          font-size: 0.9rem;
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-group label {
          font-weight: 600;
          color: #4b3e2d;
        }

        .filter-group select {
          padding: 0.5rem;
          border: 1px solid #d8cfc3;
          border-radius: 6px;
          font-size: 0.95rem;
        }

        .refresh-btn {
          padding: 0.5rem 1rem;
          background: #c8aa88;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .refresh-btn:hover:not(:disabled) {
          background: #a48a6d;
        }

        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading, .empty-state {
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.2rem;
        }

        .orders-table-container {
          overflow-x: auto;
          margin-bottom: 2rem;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .orders-table th {
          background: #c8aa88;
          color: white;
          padding: 1rem;
          text-align: right;
          font-weight: 600;
        }

        .orders-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #e0e0e0;
        }

        .orders-table tr:hover {
          background: #f8f5f0;
        }

        .service-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #e3f2fd;
          color: #1976d2;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .delete-btn {
          padding: 0.25rem 0.75rem;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
        }

        .delete-btn:hover {
          background: #c82333;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }

        .stat-card {
          background: #fffdfa;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #d8cfc3;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #a48a6d;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }

        .alert {
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .orders-table {
            font-size: 0.85rem;
          }

          .orders-table th,
          .orders-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

