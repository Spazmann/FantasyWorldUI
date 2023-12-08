let holdID = 0;
const ip = "localhost"
var authHeaderValue = null;
var username = null;
var password = null;

function getSpells() {
    console.log("into getSpells");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var entries = JSON.parse(this.responseText);
            renderEntries(entries);
        }
    }
    xmlHttp.open("GET", "http://" + ip + ":8081/spell", true);
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

        var spellNameElement = document.createElement("p");
        spellNameElement.textContent = "Spell Name: " + entry.spellName;
        entryContainer.appendChild(spellNameElement);

        var spellDescriptionElement = document.createElement("p");
        spellDescriptionElement.textContent = "Spell Description: " + entry.spellDescription;
        entryContainer.appendChild(spellDescriptionElement);

        if (entry.spellImage) {
            var imageElement = document.createElement("img");
            imageElement.src = entry.spellImage;
            imageElement.classList.add("entry-image");
            entryContainer.appendChild(imageElement);
        }

        // Add the entryContainer to the entry_list
        entry_list.appendChild(entryContainer);
    }
}


window.onload = function() {
    console.log("page loading");
    getSpells();
    authHeaderValue = sessionStorage.getItem("authHeaderValue")
    username = sessionStorage.getItem("username")
    password = sessionStorage.getItem("password")
    var logged = document.getElementById("logged-in");
    if (username == null) username = "None"
    logged.textContent = "Logged-In as " + username
}

function createSpell() {
    console.log("Creating spell...");
    var spellName = document.getElementById("spellName").value;
    var spellImage = document.getElementById("spellImage").value;
    var spellDescription = document.getElementById("spellDescription").value;
    var entry = {
        "id": null,
        "spellName": spellName,
        "spellImage": spellImage,
        "spellDescription": spellDescription
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:8081/spell", true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                location.reload()
            } else {
                console.error("Error creating spell:", this.status, this.responseText);
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
    xmlHttp.open("GET", "http://" + ip + ":8081/spell/" + id);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var jsnMsg = JSON.parse(this.responseText);
            spellName.value = jsnMsg.spellName;
            spellImage.value = jsnMsg.spellImage;
            spellDescription.value = jsnMsg.spellDescription;
        }
    }
    holdID = id;
}

function deleteIt() {
    console.log("into deleteIt()");
    var id = document.getElementById("search").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", "http://" + ip + ":8081/spell/" + id, true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                location.reload()
            } else {
                console.error("Error deleting spell:", this.status, this.responseText);
            }
        }
    };
}

function updateSpell() {
    if (holdID === 0) {
        return;
    }
    console.log("Updating spell...");
    var spellName = document.getElementById("spellName").value;
    var spellImage = document.getElementById("spellImage").value;
    var spellDescription = document.getElementById("spellDescription").value;
    var entry = {
        "id": null,
        "spellName": spellName,
        "spellImage": spellImage,
        "spellDescription": spellDescription
    };

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", "http://" + ip + ":8081/spell/" + holdID, true);
    xmlHttp.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                location.reload()
            } else {
                console.error("Error updating spell:", this.status, this.responseText);
            }
        }
    };
    xmlHttp.send(JSON.stringify(entry));
}