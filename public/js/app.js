// const contactForm = document.querySelector('.contact-form')
// let name = document.getElementById('name')
// let email = document.getElementById('email')
// let subject = document.getElementById('subject')
// let message = document.getElementById('message')


// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   let formData = {
//     name: name.value,
//     email: email.value,
//     subject: subject.value,
//     message: message.value
//   };

//   let xhr = new XMLHttpRequest();
//   xhr.open('POST', '/');
//   xhr.setRequestHeader('Content-Type', 'application/json');

//   xhr.onload = function () {
//     console.log(xhr.responseText);  // Debugging: Log the actual response

//     if (xhr.status === 200 && xhr.responseText.trim() === 'Success') {
//       alert('Email sent successfully');
//       name.value = '';
//       email.value = '';
//       subject.value = '';
//       message.value = '';
//     } else {
//       alert('Something went wrong');
//     }
//   };

//   xhr.onerror = function () {
//     alert('Request failed');
//   };

//   xhr.send(JSON.stringify(formData));
// });

// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   let formData = {
//     name: name.value,
//     email: email.value,
//     subject: subject.value,
//     message: message.value
//   }
//   let xhr = new XMLHttpRequest();
//   xhr.open('POST', '/');
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.onload = function () {
//     console.log(xhr.responseText);
//     if (xhr.responseText == 'success') {
//       alert('email sent ')
//       name.value = ''
//       email.value = ''
//       subject.value = ''
//       message.value = ''
//     }
//     else {
//       alert('something went wrong')
//     }


//   }
//   xhr.send(JSON.stringify(formData))
// })

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
    return; // Stop form submission if validation fails
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
      return response.text(); // Assuming the server responds with plain text
    })
    .then((data) => {
      console.log('Response:', data);  // Debugging: Log the actual response

      if (data.trim() === 'Success') { // Check if response is 'Success'
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
