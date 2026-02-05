/**
 * ntfy-forms.js
 * يلتقط كل الفورمات في الصفحة ويرسل إشعاراً إلى ntfy.sh عند الإرسال.
 * استبدل NTFY_TOPIC باسم موضوعك من ntfy.sh (مثلاً: samarammar-site).
 * للإنتاج: استخدم topic سري (غير متوقع) لتفادي إرسال أي شخص إشعارات لموضوعك.
 */
(function () {
  'use strict';

  // اسم الموضوع (Topic) من ntfy.sh – غيّره ليتوافق مع اشتراكك (يفضّل topic سري في الإنتاج)
  const NTFY_TOPIC = 'sam-admin';
  const NTFY_URL = 'https://ntfy.sh/' + NTFY_TOPIC;
  const NOTIFICATION_TITLE = 'إشعار من الموقع';

  /**
   * يحدد نص الإشعار حسب نوع الفورم (id، onsubmit، أو ترتيبه في الصفحة)
   */
  function getNotificationMessage(form, formIndex) {
    const id = (form.id || '').toLowerCase();
    const onsubmitStr = (form.getAttribute('onsubmit') || '');

    if (id === 'contact-form') return 'رسالة تواصل جديدة من الموقع';
    if (id === 'booking-form') return 'طلب حجز موعد جديد';
    if (onsubmitStr.indexOf('Interior Design') !== -1) return 'طلب تصميم داخلي جديد';
    if (onsubmitStr.indexOf('Exterior Design') !== -1) return 'طلب تصميم خارجي جديد';
    if (onsubmitStr.indexOf('Landscape Design') !== -1) return 'طلب تصميم حدائق جديد';
    if (id === 'login-form') return 'محاولة تسجيل دخول إلى لوحة التحكم';

    // أول فورم في الصفحة غالباً فورم تواصل
    if (formIndex === 0) return 'رسالة جديدة من نموذج الموقع';

    return 'طلب جديد من نموذج الموقع';
  }

  /**
   * إرسال إشعار إلى ntfy.sh
   */
  function sendNtfyNotification(message) {
    return fetch(NTFY_URL, {
      method: 'POST',
      body: message,
      headers: {
        'Title': NOTIFICATION_TITLE,
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
  }

  function initNtfyForms() {
    const forms = document.querySelectorAll('form');
    if (!forms.length) return;

    forms.forEach(function (form, index) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var message = getNotificationMessage(form, index);
        var originalOnSubmit = form.onsubmit;

        sendNtfyNotification(message)
          .then(function (res) {
            if (res.ok) {
              console.log('[ntfy] تم إرسال الإشعار بنجاح:', message);
            } else {
              console.warn('[ntfy] فشل إرسال الإشعار، الحالة:', res.status, res.statusText);
            }
            if (typeof originalOnSubmit === 'function') {
              originalOnSubmit.call(form, e);
            }
          })
          .catch(function (err) {
            console.error('[ntfy] خطأ في إرسال الإشعار:', err);
            if (typeof originalOnSubmit === 'function') {
              originalOnSubmit.call(form, e);
            }
          });
      }, true);
    });

    console.log('[ntfy] تم ربط إشعارات ntfy بعدد', forms.length, 'فورم');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNtfyForms);
  } else {
    initNtfyForms();
  }
})();
