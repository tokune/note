var express = require('express');
var config = require('./config');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();           

var static_root = __dirname + (config.dev_mode ? '/public' : '/www');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(static_root));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(session({
    secret            : config.sessionSecret,         
    resave            : true,
    saveUninitialized : true
}))

require('./lib/index').route(app);

console.log('listen on', config.port);
app.listen(config.port);

