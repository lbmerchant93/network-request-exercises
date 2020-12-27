const displayArea = document.querySelector(".display-area");
const deleteButton = document.querySelector(".delete-button");
const createButton = document.querySelector(".create-button");
const idInput = document.querySelector(".user-id-input");
const nameInput = document.querySelector(".user-name-input");
const statusInput = document.querySelector(".user-status-input");
const interestsInput = document.querySelector(".user-interests-input");
const deleteUserByID = document.querySelector(".delete-user-id-input")

window.addEventListener('load', retrieveData);
deleteButton.addEventListener('click', deleteUser);
createButton.addEventListener('click', createUser);

function clearInputs() {
  idInput.value = "";
  nameInput.value = "";
  statusInput.value = "";
  interestsInput.value = "";
  deleteUserByID.value = "";
}

function showUsers(data) {
  displayArea.innerText = '';
  data.forEach(data => {
    displayArea.innerText += `
    ${data.name} is ${data.status} and interested in: ${data.interests}
  `
  })
}

function retrieveData() {
  fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(data => showUsers(data));
}

function deleteUser() {
  fetch(`http://localhost:3001/api/v1/users/${deleteUserByID.value}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => retrieveData());
  clearInputs();
}

function createUser() {
  fetch("http://localhost:3001/api/v1/users", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: idInput.value,
        name: nameInput.value,
        status: statusInput.value,
        interests: interestsInput.value
      })
    })
    .then(response => response.json())
    .then(data => retrieveData());
  clearInputs();
}



//
