const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Validate email format
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

//check password match

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Password do not match');
  }
}

// Event listener for form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    username: username.value,
    email: email.value,
    password: password.value,
    password2: password2.value
  }

  console.log('Form Data: ', data);

  if (email.value === '') {
    showError(email, 'Email is required');
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
  }

  const fields = [username, password, password2];
  fields.forEach(field => {
    if (field.value.trim() === '') {
      showError(field, `${field.id.charAt(0).toUpperCase() + field.id.slice(1)} is required`);
    } else {
      showSuccess(field);
    }
  });

  checkLength(username, 3, 15);
  checkLength(password, 6, 35);
  checkLength(password2, 6, 35);
  checkPasswordsMatch(password, password2);
});