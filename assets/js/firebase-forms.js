/**
 * Firebase form handlers – shared for contact, service requests, and booking
 * Requires: firebase-app, firebase-firestore, firebase-config.js loaded first
 */

var FIREBASE_SUBMIT_TIMEOUT_MS = 15000;

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
    var t = setTimeout(function () {
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
  var form = event.target;
  var submitBtn = form.querySelector('button[type="submit"]');
  var originalText = submitBtn ? submitBtn.innerHTML : 'Send';

  if (submitBtn) {
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
  }

  try {
    var formData = new FormData(form);
    var payload = {
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

    var db = getFirebaseDb();
    await timeoutPromise(db.collection('requests').add(payload), FIREBASE_SUBMIT_TIMEOUT_MS);
    form.reset();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert('Submitted successfully.');
    }
  } catch (err) {
    console.error('Firebase submission error:', err);
    var msg = err && err.message ? err.message : 'Submission failed, please try again.';
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
  var form = event.target;
  var submitBtn = form.querySelector('button[type="submit"]');

  var fullName = (form.fullName || form.querySelector('[name="fullName"]')) ? (form.fullName || form.querySelector('[name="fullName"]')).value.trim() : '';
  var emailEl = form.email || form.querySelector('[name="email"]');
  var email = emailEl ? emailEl.value.trim() : '';
  var phoneEl = form.phone || form.querySelector('[name="phone"]');
  var phone = phoneEl ? phoneEl.value.trim() : '';
  var serviceEl = form.service || form.querySelector('[name="service"]');
  var service = serviceEl ? serviceEl.value : '';
  var messageEl = form.message || form.querySelector('[name="message"]');
  var message = messageEl ? messageEl.value.trim() : '';

  var notes = 'Request for appointment. Message: ' + (message || '-');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  try {
    var db = getFirebaseDb();
    await timeoutPromise(db.collection('requests').add({
      service: 'Booking',
      name: fullName,
      email: email,
      phone: phone,
      project_type: service || '',
      notes: notes,
      status: 'new',
      createdAt: getServerTimestamp()
    }), FIREBASE_SUBMIT_TIMEOUT_MS);
    window.location.href = 'thanks.html';
  } catch (err) {
    console.error('Booking submission error:', err);
    var msg = err && err.message ? err.message : 'تعذر إرسال الطلب الآن، حاول مرة أخرى.';
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
