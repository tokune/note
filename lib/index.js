var config = require('../config');
var async = require('async');  
var Note = require('./models').Note;  
var StringDecoder = require('string_decoder').StringDecoder;

exports.route = function(app) {
    app.get('/', function(req, res) {
        Note.find({}, ['modified_at', 'Z'], function(err, titles) {
            for (var i = 0; i < titles.length; i++) {
                titles[i].content = null;
            };
            res.render('index', {title: config.title, titles: titles});
        });
    });
    app.get('/note', function(req, res) {
        res.render('note');
    });
    app.get('/about', function(req, res) {
        res.render('about');
    });
    app.get('/note/:note_id', function(req, res) {
        var note_id = req.param('note_id');
        Note.get(note_id, function(err, note) {
            var decoder = new StringDecoder('utf8');
            note.content = decoder.write(note.content);
            if (err) return res.json({err: err});
            res.json(note);
        });
    });
    app.post('/note/', function(req, res) {
        var title = req.param('title');
        var content = req.param('content');
        Note.create({
            title: title,
            content: content,
            created_at: new Date(),
            modified_at: new Date(),
        }, function(err) {
            if (err) return res.json({err:err});
            res.json({result:'done'});
        })
    });
    app.post('/note/:note_id', function(req, res) {
        var note_id = req.param('note_id');
        var title = req.param('title');
        var content = req.param('content');
        async.waterfall([
            function(next) {
                Note.get(note_id, function(err, note) {
                    if (err) return next(err);
                    next(null, note);
                });
            },
            function(note, next) {
                note.title = title;
                note.content = content;
                console.log(content);
                note.modified_at = new Date(),
                note.save(next);
            },
        ], function(err) {
            if (err) return res.json({err:err});
            res.json({result:'done'});
        })
    });
}
