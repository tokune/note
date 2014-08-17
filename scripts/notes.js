var models = require('../lib/models');
var async = require('async');
models.Note.sync(function(err) {
    if (err) return console.log(err);
    console.log('done');
    process.exit(0);
});
