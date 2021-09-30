// const urlContent = "http://localhost:3000/v1/groups/groups";
const urlContent = "https://split-bills-backend-5naym.ondigitalocean.app/v1/groups/groups";
const token = window.localStorage.getItem("token");

showData();
addGroup();

function showData() {
  if (token) {
    fetch(urlContent, {
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
  data.forEach((item) => {
    const output = document.getElementById("output");
    const section = document.createElement("section");
    section.classList = "blocks";
    const title = document.createElement("h2");
    title.textContent = `ID: ${item.id}`;

    const content = document.createElement("p");
    content.textContent = `${item.name}`;

    const delBTN = document.createElement("button");
    delBTN.textContent = "DELETE";
    delBTN.addEventListener("click", () => {
      const delConfirm = confirm("Do you want to delete this item?");

      if (delConfirm) {
        fetch(`${urlContent}/${item.id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            section.remove();
            alert(`Group ${item.name} has been removed from your account`);
          });
      }
    });

    section.append(title, content, delBTN);
    output.append(section);
  });
}

function addGroup() {
  const form = document.getElementById("addgroup");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();

    fetch(urlContent, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          return alert(data.err);
        }
        form.reset();
        setTimeout(() => {
          location.reload();
        }, 500);
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
