// Basic client-side validation for enquiry form (PoE demo)
// Place this file at /js/script.js and ensure enquiry.html loads it with defer.

function isValidEmail(email) {
  // Simple email regex for demo purposes
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isFutureOrToday(dateString) {
  if (!dateString) return true; // empty is allowed
  const picked = new Date(dateString);
  const today = new Date();
  // normalize time
  picked.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  return picked >= today;
}

function showResult(message, success = true) {
  const el = document.getElementById('enquiryResult');
  if (!el) return;
  el.textContent = message;
  el.style.color = success ? 'green' : 'red';
  // optionally focus for accessibility
  el.focus?.();
}

function validateEnquiryForm(event) {
  event?.preventDefault?.();

  const name = document.getElementById('name')?.value?.trim();
  const email = document.getElementById('email')?.value?.trim();
  const phone = document.getElementById('phone')?.value?.trim();
  const pickupDate = document.getElementById('pickupDate')?.value;
  const details = document.getElementById('details')?.value?.trim();

  // Name
  if (!name) {
    showResult('Please enter your full name.', false);
    document.getElementById('name').focus();
    return false;
  }

  // Email
  if (!email || !isValidEmail(email)) {
    showResult('Please enter a valid email address.', false);
    document.getElementById('email').focus();
    return false;
  }

  // Optional: phone basic check (if provided)
  if (phone && phone.length < 7) {
    showResult('If provided, phone number looks too short.', false);
    document.getElementById('phone').focus();
    return false;
  }

  // Pickup date (optional) must be today or future
  if (pickupDate && !isFutureOrToday(pickupDate)) {
    showResult('Preferred pickup date must be today or a future date.', false);
    document.getElementById('pickupDate').focus();
    return false;
  }

  // Details
  if (!details) {
    showResult('Please include your order details or enquiry.', false);
    document.getElementById('details').focus();
    return false;
  }

  // Simulate success (no backend)
  showResult('Thank you — your enquiry has been recorded. We will contact you shortly.', true);

  // Reset form (simulate successful submit)
  document.getElementById('enquiryForm')?.reset();

  return false; // Prevent actual submit for demo
}

// Attach handler when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('enquiryForm');
  if (form) {
    form.addEventListener('submit', validateEnquiryForm);
  }
});