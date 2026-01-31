/**
 * Firebase form handlers – shared for contact, service requests, and booking
 * Requires: firebase-app, firebase-firestore, firebase-config.js loaded first
 */

function getFirebaseDb() {
  if (typeof window.firebaseDb === 'undefined') {
    throw new Error('Firebase not initialized. Check firebase-config.js and that Firebase scripts are loaded.');
  }
  return window.firebaseDb;
}

/**
 * Generic submit for contact + service request forms (Message, Interior Design, Exterior Design, Landscape Design)
 * @param {Event} event - form submit event
 * @param {string} serviceType - e.g. 'Message', 'Interior Design', 'Exterior Design', 'Landscape Design'
 * @param {string} [redirectUrl] - optional URL to redirect after success
 */
async function handleFirebaseSubmit(event, serviceType, redirectUrl) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn?.innerHTML;

  if (submitBtn) {
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
  }

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
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    const db = getFirebaseDb();
    await db.collection('requests').add(payload);
    form.reset();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert('Submitted successfully.');
    }
  } catch (err) {
    console.error('Firebase submission error:', err);
    alert('Submission failed, please try again.');
  } finally {
    if (submitBtn) {
      submitBtn.innerHTML = originalText || 'Send';
      submitBtn.disabled = false;
    }
  }
}

/**
 * Booking form submit – stores in Firestore 'requests' with service 'Booking'
 * @param {Event} event - form submit event
 */
async function handleBookingFirebaseSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  const fullName = (form.fullName || form.querySelector('[name="fullName"]'))?.value?.trim() || '';
  const email = (form.email || form.querySelector('[name="email"]'))?.value?.trim() || '';
  const phone = (form.phone || form.querySelector('[name="phone"]'))?.value?.trim() || '';
  const service = (form.service || form.querySelector('[name="service"]'))?.value || '';
  const date = (form.date || form.querySelector('[name="date"]'))?.value || '';
  const time = (form.time || form.querySelector('[name="time"]'))?.value || '';
  const message = (form.message || form.querySelector('[name="message"]'))?.value?.trim() || '';

  const notes = `Preferred date: ${date || '-'} | time: ${time || '-'} | message: ${message || '-'}`;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  try {
    const db = getFirebaseDb();
    await db.collection('requests').add({
      service: 'Booking',
      name: fullName,
      email,
      phone,
      project_type: service || '',
      notes,
      status: 'new',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    window.location.href = 'thanks.html';
  } catch (err) {
    console.error('Booking submission error:', err);
    alert('تعذر إرسال الطلب الآن، حاول مرة أخرى.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Request';
    }
  }
}
