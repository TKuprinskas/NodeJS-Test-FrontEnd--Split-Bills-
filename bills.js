const urlContent = "http://localhost:3000/v1/bills/bills";
const doContent = https://split-bills-backend-5naym.ondigitalocean.app/bills";
const totalURL = "http://localhost:3000/v1/bills/total";
const doTotal = "https://split-bills-backend-5naym.ondigitalocean.app/total";
const queryString = window.location.search;
const params = queryString.split("=")[1];
const token = window.localStorage.getItem("token");

showData();
addBill();
total();

function total() {
  if (token) {
    fetch(`${doTotal}/${params}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getTotal(data);
      })
      .catch((err) => console.log(err));
  } else {
    alert("You are not authorized to see this page");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  }
}

function getTotal(data) {
  const total = document.getElementById("totalSum");
  total.textContent = `Total amount for the bill: ${data[0].total}€`;
}

function showData() {
  if (token) {
    fetch(`${doContent}/${params}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        showInfo(data);
      })
      .catch((err) => console.log(err));
  } else {
    alert("You are not authorized to see this page");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  }
}

function showInfo(data) {
  const table = document.querySelector("tbody");
  data.forEach((item) => {
    const tr = table.insertRow();
    tr.classList = "rows";
    const td1 = tr.insertCell();
    td1.textContent = item.id;
    td1.id = "td1";
    const td2 = tr.insertCell();
    td2.textContent = item.description;
    td2.id = "td2";
    const td3 = tr.insertCell();
    td3.textContent = `${item.amount}€`;
    td3.id = "td3";
  });
}

function addBill() {
  const form = document.getElementById("addbill");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = e.target.elements.amount.value.trim();
    const description = e.target.elements.description.value.trim();

    fetch(`${urlContent}/${params}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          return alert(data.err);
        }
        form.reset();
        location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  });
}

document.getElementById("signout").addEventListener("click", () => {
  localStorage.removeItem("token");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
});
