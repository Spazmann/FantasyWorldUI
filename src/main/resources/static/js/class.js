let holdID = 0;
const ip = "localhost"
var authHeaderValue = null;
var username = null;
var password = null;

function getClasses() {
    console.log("into getClasses");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var entries = JSON.parse(this.responseText);
            renderEntries(entries);
        }
    }
    xmlHttp.open("GET", "http://" + ip + ":8081/class", true);
    xmlHttp.send();
}

function renderEntries(entries) {
    var entry_list = document.getElementById("entry_list");
    entry_list.innerHTML = "";
    for (var entry of entries) {
        // Create a container div for each entry
        var entryContainer = document.createElement("div");
        entryContainer.classList.add("entry-container");

        // Create and add elements for each entry property
        var idElement = document.createElement("span");
        idElement.textContent = "ID: " + entry.id;
        entryContainer.appendChild(idElement);

        var classNameElement = document.createElement("p");
        classNameElement.textContent = "Class Name: " + entry.className;
        entryContainer.appendChild(classNameElement);

        var classDescriptionElement = document.createElement("p");
        classDescriptionElement.textContent = "Class Description: " + entry.classDescription;
        entryContainer.appendChild(classDescriptionElement);

        if (entry.classImage) {
            var imageElement = document.createElement("img");
            imageElement.src = entry.classImage;
            imageElement.classList.add("entry-image");
            entryContainer.appendChild(imageElement);
        }

        // Add the entryContainer to the entry_list
        entry_list.appendChild(entryContainer);
    }
}


window.onload = function() {
    console.log("page loading");
    getClasses();
    authHeaderValue = sessionStorage.getItem("authHeaderValue")
    username = sessionStorage.getItem("username")
    password = sessionStorage.getItem("password")
    var logged = document.getElementById("logged-in");
    if (username == null) username = "None"
    logged.textContent = "Logged-In as " + username
}

function createClass() {
    console.log("Creating Class...");
    var className = document.getElementById("className").value;
    var classImage = document.getElementById("classImage").value;
    var classDescription = document.getElementById("classDescription").value;
    var entry = {
        "id": null,
        "className": className,
        "classImage": classImage,
        "classDescription": classDescription
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8081/class", true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                location.reload()
            } else {
                console.error("Error creating class:", this.status, this.responseText);
            }
        }
    };
    xmlHttp.send(JSON.stringify(entry));
    holdID = 0;
}

function find() {
    console.log("find()");
    var id = document.getElementById("search").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://" + ip + ":8081/class/" + id);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var jsnMsg = JSON.parse(this.responseText);
            className.value = jsnMsg.className;
            classImage.value = jsnMsg.classImage;
            classDescription.value = jsnMsg.classDescription;
        }
    }
    holdID = id;
}

function deleteIt() {
    console.log("into deleteIt()");
    var id = document.getElementById("search").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", "http://" + ip + ":8081/class/" + id, true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                location.reload()
            } else {
                console.error("Error deleting class:", this.status, this.responseText);
            }
        }
    };
}

function updateClass() {
    if (holdID === 0) {
        return;
    }
    console.log("Updating Class...");
    var className = document.getElementById("className").value;
    var classImage = document.getElementById("classImage").value;
    var classDescription = document.getElementById("classDescription").value;
    var entry = {
        "id": null,
        "className": className,
        "classImage": classImage,
        "classDescription": classDescription
    };

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", "http://" + ip + ":8081/class/" + holdID, true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                location.reload()
            } else {
                console.error("Error updating class:", this.status, this.responseText);
            }
        }
    };
    xmlHttp.send(JSON.stringify(entry));
}
