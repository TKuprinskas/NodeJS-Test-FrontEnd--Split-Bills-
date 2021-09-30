const url = "http://localhost:3000/v1/auth/register";

const form = document.getElementById("register");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const full_name = e.target.elements.fullname.value.trim();
  const email = e.target.elements.email.value.trim();
  const password = e.target.elements.password.value.trim();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      full_name,
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        return alert(data.err);
      }
      alert(`You have successfully registered!`);
      form.reset();
      //   setTimeout(() => {
      //     window.location.href = "index.html";
      //   }, 1000);
    })
    .catch((err) => {
      alert("Something went wrong, please try again");
    });
});

function checkPassword() {
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirmPassword");
  if (confirm.value === password.value) {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").textContent = "Password is matching";
    document.getElementById("submit").disabled = false;
  } else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").textContent = "Password is not matching";
    document.getElementById("submit").disabled = true;
  }
}

function showPassword() {
  const input = document.getElementById("password");
  input.type = "text";
}

function hidePassword() {
  const input = document.getElementById("password");
  input.type = "password";
}

function showPassword2() {
  const input = document.getElementById("confirmPassword");
  input.type = "text";
}

function hidePassword2() {
  const input = document.getElementById("confirmPassword");
  input.type = "password";
}
