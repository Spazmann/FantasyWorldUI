let holdID = 0;
const ip = "localhost"
var authHeaderValue = null;
var username = null;
var password = null;

function getUsers() {
    console.log("into getUsers");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var entries = JSON.parse(this.responseText);
            renderEntries(entries);
        }
    }
    xmlHttp.open("GET", "http://" + ip + ":8081/user", true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
}

function renderEntries(entries) {
    var entry_list = document.getElementById("entry_list");
    entry_list.innerHTML = "";
    for (var entry of entries) {
        var entryContainer = document.createElement("div");
        entryContainer.classList.add("entry-container");

        var idElement = document.createElement("span");
        idElement.textContent = "ID: " + entry.id;
        entryContainer.appendChild(idElement);

        var classNameElement = document.createElement("p");
        classNameElement.textContent = "Role: " + entry.username;
        entryContainer.appendChild(classNameElement);

        var classDescriptionElement = document.createElement("p");
        classDescriptionElement.textContent = "Username: " + entry.password;
        entryContainer.appendChild(classDescriptionElement);

        var classPrimaryAbilityElement = document.createElement("p");
        classPrimaryAbilityElement.textContent = "Password: " + entry.role;
        entryContainer.appendChild(classPrimaryAbilityElement);

        entry_list.appendChild(entryContainer);
    }
}


window.onload = function() {
    console.log("page loading");
    authHeaderValue = sessionStorage.getItem("authHeaderValue")
    username = sessionStorage.getItem("username")
    password = sessionStorage.getItem("password")
    var logged = document.getElementById("logged-in");
    if (username == null) username = "None"
    logged.textContent = "Logged-In as " + username
    getUsers();
}

function createUser() {
    console.log("Creating User...");
    var userType = document.getElementById("userType").value;
    var createUsername = document.getElementById("createUsername").value;
    var createPassword = document.getElementById("createPassword").value;
    var entry = {
        "id": null,
        "role": userType,
        "username": createUsername,
        "password": createPassword
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8081/user", true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                location.reload()
            } else {
                console.error("Error creating user:", this.status, this.responseText);
            }
        }
    };
    xmlHttp.send(JSON.stringify(entry));
    holdID = 0;
}

