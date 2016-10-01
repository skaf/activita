require("./settings.js");
require("./config.js");


var http = require("http"),
    app = require("express")(),
    bodyParser = require('body-parser'),
    session = require("express-session"),
    cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.APP_SERVER_SECRET));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require(process.env.APP_ROUTER));
var server = http.createServer(app).listen(8080);