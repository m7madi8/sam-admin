/**
 * Firebase form handlers – shared for contact, service requests, and booking
 * Requires: firebase-app, firebase-firestore, firebase-config.js loaded first
 *
 * الفورمات تُحفَظ في Firestore (الداشبورد) وتُرسَل أيضاً إلى الإيميل عبر Web3Forms.
 * للحصول على Access Key: ادخل إلى https://web3forms.com وأدخل إيميلك (sam.ammar1992@gmail.com)
 * واحصل على المفتاح، ثم ضعه في window.WEB3FORMS_ACCESS_KEY قبل تحميل هذا الملف.
 */
const FIREBASE_SUBMIT_TIMEOUT_MS = 15000;

var WEB3FORMS_ACCESS_KEY = typeof window !== 'undefined' && window.WEB3FORMS_ACCESS_KEY
  ? window.WEB3FORMS_ACCESS_KEY
  : '';

/**
 * يرسل بيانات الفورم إلى إيميلك عبر Web3Forms (يعمل بالتوازي مع حفظ Firestore)
 */
function sendToEmail(data) {
  if (!WEB3FORMS_ACCESS_KEY) return;
  var body = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: 'Samar Ammar Interior Design',
    subject: '[Samar Ammar] ' + (data.service || 'طلب جديد'),
    name: data.name || 'N/A',
    email: data.email || '',
    phone: data.phone || 'N/A',
    service: data.service || '',
    location: data.location || '',
    area: data.area || '',
    project_type: data.project_type || '',
    construction_status: data.construction_status || '',
    notes: data.notes || ''
  };
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body)
  }).catch(function (e) { console.warn('[Web3Forms] فشل إرسال الإيميل:', e); });
}

function getFirebaseDb() {
  if (typeof window.firebaseDb === 'undefined') {
    throw new Error('Firebase not initialized. Check firebase-config.js and that Firebase scripts are loaded.');
  }
  return window.firebaseDb;
}

function getServerTimestamp() {
  if (typeof firebase === 'undefined' || !firebase.firestore || !firebase.firestore.FieldValue) {
    throw new Error('Firebase Firestore not loaded. Load firebase-firestore-compat.js before this script.');
  }
  return firebase.firestore.FieldValue.serverTimestamp();
}

function timeoutPromise(promise, ms) {
  return new Promise(function (resolve, reject) {
    const t = setTimeout(function () {
      reject(new Error('Request timed out. Create Firestore Database in Firebase Console (Build → Firestore Database → Create database), then set Security Rules to allow create on requests.'));
    }, ms);
    promise.then(function (r) {
      clearTimeout(t);
      resolve(r);
    }, function (e) {
      clearTimeout(t);
      reject(e);
    });
  });
}

/**
 * Generic submit for contact + service request forms (Message, Interior Design, Exterior Design, Landscape Design)
 */
async function handleFirebaseSubmit(event, serviceType, redirectUrl) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : 'Send';

  if (submitBtn) {
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
  }

  try {
    const formData = new FormData(form);
    const payload = {
      service: serviceType,
      name: formData.get('name') || 'N/A',
      phone: formData.get('phone') || 'N/A',
      email: formData.get('email') || '',
      location: formData.get('location') || '',
      construction_status: formData.get('construction-status') || '',
      area: formData.get('approx-area') || '',
      project_type: formData.get('project-type') || '',
      notes: formData.get('notes') || formData.get('message') || '',
      status: 'new',
      createdAt: getServerTimestamp()
    };

    sendToEmail(payload);
    const db = getFirebaseDb();
    await timeoutPromise(db.collection('requests').add(payload), FIREBASE_SUBMIT_TIMEOUT_MS);
    form.reset();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert('Submitted successfully.');
    }
  } catch (err) {
    console.error('Firebase submission error:', err);
    let msg = err && err.message ? err.message : 'Submission failed, please try again.';
    if (msg.indexOf('permission') !== -1 || msg.indexOf('PERMISSION_DENIED') !== -1) {
      msg = 'Permission denied. In Firestore → Rules, add: allow create: if true; for collection requests.';
    }
    if (msg.indexOf('Request timed out') !== -1 || msg.indexOf('timed out') !== -1) {
      msg = 'انتهت المهلة. أنشئ قاعدة Firestore: Firebase Console → Build → Firestore Database → Create database، ثم Rules اسمح بـ create لمجموعة requests.';
    }
    alert(msg);
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }
}

/**
 * Booking form submit – stores in Firestore 'requests' with service 'Booking'
 */
async function handleBookingFirebaseSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const fullName = (form.fullName || form.querySelector('[name="fullName"]')) ? (form.fullName || form.querySelector('[name="fullName"]')).value.trim() : '';
  const emailEl = form.email || form.querySelector('[name="email"]');
  const email = emailEl ? emailEl.value.trim() : '';
  const phoneEl = form.phone || form.querySelector('[name="phone"]');
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const serviceEl = form.service || form.querySelector('[name="service"]');
  const service = serviceEl ? serviceEl.value : '';
  const messageEl = form.message || form.querySelector('[name="message"]');
  const message = messageEl ? messageEl.value.trim() : '';

  const notes = 'Request for appointment. Message: ' + (message || '-');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  var bookingPayload = {
    service: 'Booking',
    name: fullName,
    email: email,
    phone: phone,
    project_type: service || '',
    notes: notes,
    status: 'new',
    createdAt: getServerTimestamp()
  };
  try {
    sendToEmail(bookingPayload);
    const db = getFirebaseDb();
    await timeoutPromise(db.collection('requests').add(bookingPayload), FIREBASE_SUBMIT_TIMEOUT_MS);
    window.location.href = 'thanks.html';
  } catch (err) {
    console.error('Booking submission error:', err);
    let msg = err && err.message ? err.message : 'تعذر إرسال الطلب الآن، حاول مرة أخرى.';
    if (String(msg).indexOf('permission') !== -1 || String(msg).indexOf('PERMISSION_DENIED') !== -1) {
      msg = 'Permission denied. تحقق من قواعد الأمان في Firestore.';
    }
    if (String(msg).indexOf('timed out') !== -1 || String(msg).indexOf('Request timed out') !== -1) {
      msg = 'انتهت المهلة. أنشئ قاعدة Firestore: Firebase Console → Build → Firestore Database → Create database.';
    }
    alert(msg);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Request';
    }
  }
}
