// Booking Form
const bookingForm = document.getElementById("bookingForm");
const showBookingBtn = document.getElementById("showBooking");
const receiptModal = document.getElementById("receiptModal");
const receiptDetails = document.getElementById("receiptDetails");
const waShare = document.getElementById("waShare");
const closeReceipt = document.querySelector('.close-receipt');

function showReceipt(data) {
  if (!data) return;
  receiptDetails.innerHTML = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Destination:</strong> ${data.destination}</p>
  `;
  // WhatsApp share link
  const waMsg = `Flight Booking Receipt%0AName: ${data.name}%0AEmail: ${data.email}%0ADestination: ${data.destination}`;
  waShare.href = `https://wa.me/254712345678?text=${waMsg}`;
  receiptModal.style.display = 'flex';
}

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const destination = document.getElementById("destination").value;
    if (name && email && destination) {
      const bookingData = { name, email, destination };
      localStorage.setItem('bookingReceipt', JSON.stringify(bookingData));
      document.getElementById("msg").textContent = `✅ Thank you, ${name}! Your trip to ${destination} is booked.`;
      showReceipt(bookingData);
      this.reset();
    } else {
      document.getElementById("msg").textContent = "⚠ Please fill all fields.";
    }
  });
}
if (showBookingBtn) {
  showBookingBtn.addEventListener('click', function() {
    const data = JSON.parse(localStorage.getItem('bookingReceipt'));
    if (data) {
      showReceipt(data);
    } else {
      alert('No booking found!');
    }
  });
}
if (closeReceipt) {
  closeReceipt.addEventListener('click', function() {
    receiptModal.style.display = 'none';
  });
}
window.addEventListener('click', function(e) {
  if (e.target === receiptModal) receiptModal.style.display = 'none';
});

// Slideshow
const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
let index = 0;
setInterval(() => {
  document.getElementById("slide").src = images[index];
  index = (index + 1) % images.length;
}, 3000);

// Dark Mode
document.getElementById("darkModeToggle").addEventListener("click", function () {
  document.body.classList.toggle("dark");
});

// Newsletter signup
document.getElementById("newsletterForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value.trim();
  if (email) {
    document.getElementById("newsletterMsg").textContent = "✅ Thanks for subscribing!";
    this.reset();
  }
});

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', function() {
    this.classList.toggle('active');
  });
});

// Fade-in animation on scroll
const fadeEls = document.querySelectorAll('.fade-in');
function handleFadeIn() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFadeIn);
window.addEventListener('DOMContentLoaded', handleFadeIn);

// Back to Top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Language Toggle
const langEnBtn = document.getElementById('langEn');
const langSoBtn = document.getElementById('langSo');
const enEls = document.querySelectorAll('.tr-en');
const soEls = document.querySelectorAll('.tr-so');

langEnBtn.addEventListener('click', function() {
  langEnBtn.classList.add('active');
  langSoBtn.classList.remove('active');
  enEls.forEach(e => e.style.display = '');
  soEls.forEach(e => e.style.display = 'none');
});
langSoBtn.addEventListener('click', function() {
  langSoBtn.classList.add('active');
  langEnBtn.classList.remove('active');
  enEls.forEach(e => e.style.display = 'none');
  soEls.forEach(e => e.style.display = '');
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contactMsgResult').textContent = langSoBtn.classList.contains('active') ? 'Fariintaada waa la helay!' : 'Your message has been received!';
    this.reset();
  });
}

