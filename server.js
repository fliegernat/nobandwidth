var express = require('express');
var app = express();
var showdown = require('showdown');
var converter = new showdown.Converter();
var fs = require('fs');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    var files = fs.readdirSync('content');
    var fileInfo = files.map(function (file) {
        return {
            name: file,
            time: fs.statSync('content/' + file).mtime.getTime()
        }
    });
    var orderedFiles = fileInfo.sort(function (a, b) {
        return b.time - a.time;
    });
    orderedFiles = orderedFiles.slice(0, 5);
    var renderedFiles = orderedFiles.map(function (file) {
        var markdown = fs.readFileSync('content/' + file.name, 'utf-8');
        return converter.makeHtml(markdown);
    });
    res.render('templates/base.pug', { 'content': renderedFiles });
});

app.listen(3000);