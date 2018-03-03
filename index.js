var express = require('express');
var bodyParser = require('body-parser');
var https = require('https');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
    response.header("Content-Type",'application/json');
    response.send('{"Error": "POST requests only!"}');
});


app.post('/', function(request, response) {
    response.header("Content-Type",'application/json');
    var e = request.body.email;
    var p = request.body.password;

    var postData = '{"email":"' + e + '",password:"' + p + '","returnSecureToken":true}';
    var options = {
        hostname: 'www.googleapis.com',
        port: 443,
        path: '/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAOFwsIxlQSaONcrlNFKRKDp5W-Ug_QSuY',
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
           }
    };

    var req = https.request(options, (res) => {    
        var str = '';
        res.on('data', (d) => {
            str += d;
        });
        res.on('end', function () {
            response.send(str);
        });
    });
    
    req.on('error', (e) => {
        console.error(e);
    });
    
    req.write(postData);
    req.end();
});

app.listen(8080);