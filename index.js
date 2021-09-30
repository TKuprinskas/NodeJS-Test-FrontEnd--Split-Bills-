// const url = "http://localhost:3000/v1/auth/login";
const url = "https://split-bill-backend-63jrj.ondigitalocean.app/back/v1/auth/login";

const form = document.getElementById("login");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
    
      if (data.err) {
        return alert(data.err);
      }
      localStorage.setItem("token", `${data.token}`);
    console.log(data.token);
      setTimeout(() => {
        window.location.href = "mygroups.html";
      }, 1000);
    })

    .catch((err) => console.log(err));
});

function showPassword() {
  const input = document.getElementById("password");
  input.type = "text";
}

function hidePassword() {
  const input = document.getElementById("password");
  input.type = "password";
}
