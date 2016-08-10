var lock = new Auth0Lock(
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN, {
        auth: {
            params: {
                scope: 'openid'
            }
        }
    }
);

//Show lock once login button is clicked
document.getElementById('btn-login').addEventListener('click', function() {
    lock.show();
});

//Once authentication attempt is made trigger notify()
lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
            console.log(error);
            notify();
            return;
        }
        console.log("Auth Results", authResult);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        showLoggedIn();
        notify();
    });
});

//get profile once token is set
var id_token = localStorage.getItem('id_token');
if (id_token) {
    lock.getProfile(id_token, function(err, profile) {
        if (err) {
            return alert('There was an error getting the profile: ' + err.message);
        }
        document.getElementById('nick').textContent = profile.name;
        console.log(id_token);
    });
};

//Set CSS for logged in status (only css manipulation for single page demo)
function showLoggedIn() {
    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('btn-logOut').style.display = 'inline';
    document.getElementById('profilePic').style.display = 'inline';
    document.getElementById('welcome').style.display = 'inline';
    var profile = JSON.parse(localStorage.getItem('profile'));
    document.getElementById('nick').textContent = profile.name;
    document.getElementById("profilePic").src = profile.picture;
};

//Reset CSS Login Page after logging out (only css manipulation for single page demo)
function logOut() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {}
    };
    xhttp.open("GET", LOGOUT_URL, true);
    xhttp.send();
    document.getElementById('btn-login').style.display = 'inline';
    document.getElementById('btn-logOut').style.display = 'none';
    document.getElementById('profilePic').style.display = 'none';
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('nick').textContent = "";
    document.getElementById("profilePic").src = "";
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
};

//Check if user has an id and profile to display correct page settings
function checkUserStatus() {
    if (id_token) {
        console.log("user already logged in")
        console.log(id_token);
        showLoggedIn();
    } else {
        console.log("user not logged in")
    }
};

//Trigger Webtask.io to IFTTT and send SMS with name, email, date and time of user logging in
function notify() {
    var profile = JSON.parse(localStorage.getItem('profile'));
    var value1 = profile.name;
    var value2 = profile.email;

    $.ajax({
        type: 'POST',
        url: WEBTASK_URL,
        data: {
            "value1": value1,
            "value2": value2
        },
        dataType: 'json'
    }).done(function(data) {
        if (data.statusCode == 200) {
            console.log(data.message);
        } else {
            console.log(data.message);
        }
        console.log(data);
    });
};
