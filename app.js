var express = require('express'),
app = express(); 

// app.set('view engine','ejs');

// app.get('/', function(req, res) {
//     res.render('index');
// });

app.use('/', express.static(__dirname + '/public'));

app.listen(8080);
console.log("listening on port: 8080");