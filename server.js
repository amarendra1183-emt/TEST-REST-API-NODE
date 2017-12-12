var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser');
global.es_client = require('./elasticsearch_client');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var memberRoutes = require('./api/routes/memberRoutes'); //importing route
memberRoutes(app); //register the route

var companyRoutes = require('./api/routes/companyRoutes'); //importing route
companyRoutes(app); //register the route

var contractRoutes = require('./api/routes/contractRoutes'); //importing route
contractRoutes(app); //register the route


app.listen(port);


console.log('EMT RESTful API server started on: ' + port);
