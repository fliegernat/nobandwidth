var express = require('express');
var app = express();
var showdown = require('showdown');
var converter = new showdown.Converter();
var fs = require('fs');

var config = {
    contentDirectory: 'content',
    maxPostsOnPage: 5
}

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    var files = fs.readdirSync(config.contentDirectory);
    var fileInfo = files.map(function (file) {
        return {
            name: file,
            time: fs.statSync(config.contentDirectory + '/' + file).mtime.getTime()
        }
    });
    var orderedFiles = fileInfo.sort(function (a, b) {
        return b.time - a.time;
    });
    orderedFiles = orderedFiles.slice(0, config.maxPostsOnPage);
    var renderedFiles = orderedFiles.map(function (file) {
        var markdown = fs.readFileSync(config.contentDirectory + '/' + file.name, 'utf-8');
        return converter.makeHtml(markdown);
    });
    res.render('templates/base.pug', { 'content': renderedFiles });
});

app.listen(3000);