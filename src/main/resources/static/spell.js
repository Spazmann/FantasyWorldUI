let holdID = 0;

function getSpells() {
    console.log("into getSpells");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var entries = JSON.parse(this.responseText);
            renderEntries(entries);
        }
    }
    xmlHttp.open("GET", "http://localhost:8081/spell", true);
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

        var spellCastingTimeElement = document.createElement("p");
        spellCastingTimeElement.textContent = "Casting Time: " + entry.spellCastingTime;
        entryContainer.appendChild(spellCastingTimeElement);

        var spellCostElement = document.createElement("p");
        spellCostElement.textContent = "Saves: " + entry.spellCost;
        entryContainer.appendChild(spellCostElement);

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
}

function createSpell() {
    console.log("Creating Spell...");
    var spellName = document.getElementById("spellName").value;
    var spellImage = document.getElementById("spellImage").value;
    var spellDescription = document.getElementById("spellDescription").value;
    var spellCastingTime = document.getElementById("spellCastingTime").value;
    var spellCost = document.getElementById("spellCost").value;
    var entry = {
        "id": null,
        "spellName": spellName,
        "spellImage": spellImage,
        "spellDescription": spellDescription,
        "spellCastingTime": spellCastingTime,
        "spellCost": spellCost
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", 'http://localhost:8081/spell');
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //adding message is done, show results
            getSpells();
        }
    }
    xmlHttp.send(JSON.stringify(entry));
    holdID = 0;
}

function find() {
    console.log("find()");
    var id = document.getElementById("search").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8081/spell/' + id);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var jsnMsg = JSON.parse(this.responseText);
            spellName.value = jsnMsg.spellName;
            spellImage.value = jsnMsg.spellImage;
            spellDescription.value = jsnMsg.spellDescription;
            spellCastingTime.value = jsnMsg.spellCastingTime;
            spellCost.value = jsnMsg.spellCost;
        }
    }
    holdID = id;
}

function deleteIt() {
    console.log("into deleteIt()");
    var id = document.getElementById("search").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", 'http://localhost:8081/spell/' + id);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            getSpells();
        }
    }
    location.reload();
}

function updateSpell() {
    if (holdID === 0) {
        return
    }
    console.log("Updating Spell...");
    var spellName = document.getElementById("spellName").value;
    var spellImage = document.getElementById("spellImage").value;
    var spellDescription = document.getElementById("spellDescription").value;
    var spellCastingTime = document.getElementById("spellCastingTime").value;
    var spellCost = document.getElementById("spellCost").value;
    var entry = {
        "id": null,
        "spellName": spellName,
        "spellImage": spellImage,
        "spellDescription": spellDescription,
        "spellCastingTime": spellCastingTime,
        "spellCost": spellCost
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", 'http://localhost:8081/spell/' + holdID);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //adding message is done, show results
            getSpells();
        }
    }
    xmlHttp.send(JSON.stringify(entry));
    holdID = 0;
}