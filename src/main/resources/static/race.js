let holdID = 0;

function getRaces() {
    console.log("into getRaces");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var entries = JSON.parse(this.responseText);
            renderEntries(entries);
        }
    }
    xmlHttp.open("GET", "http://localhost:8081/race", true);
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

        var raceNameElement = document.createElement("p");
        raceNameElement.textContent = "Race Name: " + entry.raceName;
        entryContainer.appendChild(raceNameElement);

        var raceDescriptionElement = document.createElement("p");
        raceDescriptionElement.textContent = "Race Description: " + entry.raceDescription;
        entryContainer.appendChild(raceDescriptionElement);

        var raceRacialTraits = document.createElement("p");
        raceRacialTraits.textContent = "Racial Traits: " + entry.raceRacialTraits;
        entryContainer.appendChild(raceRacialTraits);

        if (entry.raceImage) {
            var imageElement = document.createElement("img");
            imageElement.src = entry.raceImage;
            imageElement.classList.add("entry-image");
            entryContainer.appendChild(imageElement);
        }

        // Add the entryContainer to the entry_list
        entry_list.appendChild(entryContainer);
    }
}


window.onload = function() {
    console.log("page loading");
    getRaces();
}

function createRace() {
    console.log("Creating Race...");
    var raceName = document.getElementById("raceName").value;
    var raceImage = document.getElementById("raceImage").value;
    var raceDescription = document.getElementById("raceDescription").value;
    var raceRacialTraits = document.getElementById("raceRacialTraits").value;
    var raceRacialTraitsArray = raceRacialTraits.split(', ');
    var entry = {
        "id": null,
        "raceName": raceName,
        "raceImage": raceImage,
        "raceDescription": raceDescription,
        "raceRacialTraits": raceRacialTraitsArray
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", 'http://localhost:8081/race');
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //adding message is done, show results
            getRaces();
        }
    }
    xmlHttp.send(JSON.stringify(entry));
    holdID = 0;
}

function find() {
    console.log("find()");
    var id = document.getElementById("search").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:8081/race/' + id);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var jsnMsg = JSON.parse(this.responseText);
            raceName.value = jsnMsg.raceName;
            raceImage.value = jsnMsg.raceImage;
            raceDescription.value = jsnMsg.raceDescription;
            raceRacialTraits.value = jsnMsg.raceRacialTraits;
        }
    }
    holdID = id;
}

function deleteIt() {
    console.log("into deleteIt()");
    var id = document.getElementById("search").value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", 'http://localhost:8081/race/' + id);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            getRaces();
        }
    }
    location.reload();
}

function updateRace() {
    if (holdID === 0) {
        return
    }
    console.log("Updating Race...");
    var raceName = document.getElementById("raceName").value;
    var raceImage = document.getElementById("raceImage").value;
    var raceDescription = document.getElementById("raceDescription").value;
    var raceRacialTraits = document.getElementById("raceRacialTraits").value;
    var raceRacialTraitsArray = raceRacialTraits.split(', ');
    var entry = {
        "id": null,
        "raceName": raceName,
        "raceImage": raceImage,
        "raceDescription": raceDescription,
        "raceRacialTraits": raceRacialTraitsArray
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", 'http://localhost:8081/race/' + holdID);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            //adding message is done, show results
            getRaces();
        }
    }
    xmlHttp.send(JSON.stringify(entry));
}