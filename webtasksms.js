var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = function(context, cb) {
    var value1 = context.data.value1;
    var value2 = context.data.value2;
    var myData = ({
        "value1": value1,
        "value2": value2
    });
    console.log("Triggering IFTTT", myData);
    if (value1) {
        var url = 'https://maker.ifttt.com/trigger/logged_in/with/key/c4LvSApJkinm0LHQ1jd6ES';
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                console.log('Triggered SMS');

            } else if (xhttp.status == 404) {
                document.getElementById("demo").innerHTML = "404 Page Not Found!";
                console.log(xhttp.status, "THIS IS AN ERROR");
            }
        };
        xhttp.send(JSON.stringify(myData));
        console.log('Sending values to IFTTT', myData);
    }
    context.storage.get(function(err, value1) {
        if (err) {
            console.log(err, "Error");
        }
        cb(value1, "Triggered");
    });
};
