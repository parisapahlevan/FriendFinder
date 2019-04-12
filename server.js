var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static('./app/public'))

require("./app/routing/apiRoutes")(app)
require("./app/routing/htmlRoutes")(app)

app.listen(PORT, function(req, res){
    console.log("app listening on port" + PORT)
});
