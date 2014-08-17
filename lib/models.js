var orm = require("orm");
var async = require("async");
var config = require("../config");
var db = orm.connect(config.mysql);

var User = exports.User = db.define("users", {
    name: String,
    email: String,
    password: String,
    created_at: { type: "date", time: true},
    profile: Object,
});

var Note = exports.Note = db.define("notes", {
    title: String,
    content: {type: "binary", big: true},
    created_at: { type: "date", time: true},
    modified_at: { type: "date", time: true}
});
