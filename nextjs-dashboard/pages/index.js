import { useState } from 'react';
import Head from 'next/head';

/**
 * الصفحة الرئيسية - تحتوي على 4 فورمات للخدمات المختلفة
 * كل فورم يرسل البيانات إلى API route منفصل
 */

export default function Home() {
  // حالة لكل فورم (نجاح/خطأ/جاري الإرسال)
  const [formStates, setFormStates] = useState({
    service1: { loading: false, success: false, error: null },
    service2: { loading: false, success: false, error: null },
    service3: { loading: false, success: false, error: null },
    service4: { loading: false, success: false, error: null },
  });

  /**
   * معالجة إرسال الفورم
   * @param {string} service - اسم الخدمة
   * @param {Event} e - Form event
   */
  const handleSubmit = async (service, e) => {
    e.preventDefault();
    
    // تحديث الحالة - بدء الإرسال
    setFormStates(prev => ({
      ...prev,
      [service]: { loading: true, success: false, error: null }
    }));

    // جمع بيانات الفورم
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email') || '',
      location: formData.get('location') || '',
      details: formData.get('details') || '',
      area: formData.get('area') || '',
      projectType: formData.get('projectType') || '',
      constructionStatus: formData.get('constructionStatus') || '',
    };

    try {
      // إرسال البيانات إلى API
      const response = await fetch(`/api/orders/${service}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok) {
        // نجاح - إعادة تعيين الفورم وإظهار رسالة نجاح
        e.target.reset();
        setFormStates(prev => ({
          ...prev,
          [service]: { loading: false, success: true, error: null }
        }));

        // إخفاء رسالة النجاح بعد 5 ثواني
        setTimeout(() => {
          setFormStates(prev => ({
            ...prev,
            [service]: { loading: false, success: false, error: null }
          }));
        }, 5000);
      } else {
        // خطأ من السيرفر
        throw new Error(result.error || 'Failed to submit order');
      }
    } catch (error) {
      // خطأ في الاتصال أو معالجة البيانات
      setFormStates(prev => ({
        ...prev,
        [service]: { 
          loading: false, 
          success: false, 
          error: error.message || 'Network error. Please try again.' 
        }
      }));
    }
  };

  /**
   * مكون الفورم القابل لإعادة الاستخدام
   */
  const FormComponent = ({ service, title, description }) => {
    const state = formStates[service];

    return (
      <div className="form-container">
        <h2>{title}</h2>
        <p className="form-description">{description}</p>
        
        <form onSubmit={(e) => handleSubmit(service, e)}>
          <div className="form-group">
            <label htmlFor={`${service}-name`}>الاسم الكامل *</label>
            <input
              type="text"
              id={`${service}-name`}
              name="name"
              required
              placeholder="أدخل اسمك الكامل"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${service}-phone`}>رقم الهاتف *</label>
            <input
              type="tel"
              id={`${service}-phone`}
              name="phone"
              required
              placeholder="0599123456"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${service}-email`}>البريد الإلكتروني</label>
            <input
              type="email"
              id={`${service}-email`}
              name="email"
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${service}-location`}>الموقع</label>
            <input
              type="text"
              id={`${service}-location`}
              name="location"
              placeholder="المدينة / المنطقة"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${service}-area`}>المساحة التقريبية (م²)</label>
            <input
              type="number"
              id={`${service}-area`}
              name="area"
              placeholder="150"
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${service}-projectType`}>نوع المشروع</label>
            <select id={`${service}-projectType`} name="projectType">
              <option value="">اختر النوع</option>
              <option value="residential">سكني</option>
              <option value="commercial">تجاري</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={`${service}-constructionStatus`}>حالة البناء</label>
            <select id={`${service}-constructionStatus`} name="constructionStatus">
              <option value="">اختر الحالة</option>
              <option value="empty-land">أرض فارغة</option>
              <option value="renovation">تجديد</option>
              <option value="from-scratch">من الصفر</option>
              <option value="structure-only">عظم فقط</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={`${service}-details`}>تفاصيل إضافية</label>
            <textarea
              id={`${service}-details`}
              name="details"
              rows="4"
              placeholder="أي معلومات إضافية تريد إضافتها..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={state.loading}
          >
            {state.loading ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>

          {state.success && (
            <div className="alert alert-success">
              ✓ تم إرسال الطلب بنجاح!
            </div>
          )}

          {state.error && (
            <div className="alert alert-error">
              ✗ {state.error}
            </div>
          )}
        </form>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Samar Ammar - Design Request Forms</title>
        <meta name="description" content="Submit your design requests" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header>
          <h1>Samar Ammar Interior Design</h1>
          <p>تقديم طلبات التصميم</p>
          <a href="/dashboard" className="dashboard-link">
            لوحة التحكم →
          </a>
        </header>

        <div className="forms-grid">
          <FormComponent
            service="service1"
            title="خدمة التصميم الداخلي"
            description="تقديم طلب لتصميم داخلي"
          />
          
          <FormComponent
            service="service2"
            title="خدمة التصميم الخارجي"
            description="تقديم طلب لتصميم خارجي"
          />
          
          <FormComponent
            service="service3"
            title="خدمة تصميم الحدائق"
            description="تقديم طلب لتصميم حدائق"
          />
          
          <FormComponent
            service="service4"
            title="خدمة الاستشارة"
            description="تقديم طلب استشارة"
          />
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          direction: rtl;
        }

        header {
          text-align: center;
          margin-bottom: 3rem;
        }

        header h1 {
          color: #a48a6d;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .dashboard-link {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #c8aa88;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.3s;
        }

        .dashboard-link:hover {
          background: #a48a6d;
        }

        .forms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .form-container {
          background: #fffdfa;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #d8cfc3;
        }

        .form-container h2 {
          color: #a48a6d;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .form-description {
          color: #666;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #4b3e2d;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d8cfc3;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #c8aa88;
          box-shadow: 0 0 0 3px rgba(200, 170, 136, 0.1);
        }

        .submit-btn {
          width: 100%;
          padding: 0.875rem;
          background: #c8aa88;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .submit-btn:hover:not(:disabled) {
          background: #a48a6d;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .alert {
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
        }

        .alert-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .alert-error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        @media (max-width: 768px) {
          .forms-grid {
            grid-template-columns: 1fr;
          }
          
          header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}

