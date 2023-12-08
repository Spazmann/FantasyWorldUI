var authHeaderValue = localStorage.getItem("authHeaderValue");
var username = localStorage.getItem("username");;
var password = localStorage.getItem("password");;

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var authHeaderValue = "Basic " + btoa(username + ":" + password);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:8081/user/checkUser?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password), true);
    xmlHttp.setRequestHeader("Authorization", authHeaderValue);
    xmlHttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                // Authentication successful
                console.log("Authentication successful");
                sessionStorage.setItem("authHeaderValue", authHeaderValue);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("password", password);
                location.reload();
            } else {
                // Authentication failed
                console.log("Authentication failed");
                location.reload();
            }
        }
    };
    xmlHttp.send();
}

function logout() {
    sessionStorage.clear();
    location.reload();
}
