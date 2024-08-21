
const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let number = document.getElementById('number');
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Smooth scroll to the top
scrollToTopBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  let phoneNumber = number.value.trim();

  // Check if the phone number is provided and matches the pattern
  if (phoneNumber && !phonePattern.test(phoneNumber)) {
    alert('Please enter a valid phone number. Example formats: (123) 456-7890, 123-456-7890, 123.456.7890, or 123 456 7890.');
    return;
  }
  let formData = {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
    number: number.value
  };

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      console.log('Response:', data);

      if (data.trim() === 'Success') {
        alert('Email sent successfully');
        name.value = '';
        email.value = '';
        subject.value = '';
        message.value = '';
        number.value = ''
      } else {
        alert('Something went wrong');
      }
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
      alert('Request failed');
    });
});
