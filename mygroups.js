// const urlContent = "http://localhost:3000/v1/accounts/accounts";
const urlContent = "https://split-bills-backend-5naym.ondigitalocean.app/v1/accounts/accounts";
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
    const div = document.createElement("div");
    div.classList = "blocks mygroups";
    const title = document.createElement("h2");
    title.textContent = `ID: ${item.group_id}`;

    const content = document.createElement("p");
    content.textContent = `${item.name}`;

    const btnDiv = document.createElement("div");
    btnDiv.classList = "btndiv";
    const viewBTN = document.createElement("button");
    viewBTN.textContent = "VIEW";
    viewBTN.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `/bills.html?group_id=${item.group_id}`;
    });

    const delBTN = document.createElement("button");
    delBTN.textContent = "DELETE";
    delBTN.addEventListener("click", () => {
      const delConfirm = confirm("Do you want to delete this item?");

      if (delConfirm) {
        fetch(`${urlContent}/${item.group_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            div.remove();
            alert(`Group ${item.name} has been removed from your account`);
          });
      }
    });

    btnDiv.append(viewBTN, delBTN);
    div.append(title, content, btnDiv);
    output.append(div);
  });
}

function addGroup() {
  const form = document.getElementById("addgroup");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const groupID = e.target.elements.groupID.value.trim();

    fetch(urlContent, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupID,
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
