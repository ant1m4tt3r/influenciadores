var express = require('express'),
app = express(); 

var events = require('events');
var eventEmitter = new events.EventEmitter();

app.use('/', express.static(__dirname + '/'));
app.listen(8080);

console.log("listening on port: 8080")

eventEmitter.on('search', function() {
    document.alert(1);
    console.log("oi")
});