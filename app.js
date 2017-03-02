var MongoClient = require('mongodb').MongoClient;
var uriLocal = "mongodb://localhost:27017/desafio";
var uri = "mongodb://soldroptables:pass@ds145329.mlab.com:45329/influencer";

var express = require('express'),

    app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    var items = [];

    res.render('index', { items: items });
});

app.use('/', express.static(__dirname + '/views'));

app.get('/search', function (req, res) {

    if (req.query['nome']) {
        searchByName(res, req.query['nome'], req.query['social']);
    } else if (req.query['categoria']) {
        searchByCat(res, req.query['categoria'], req.query['social']);
    };
    res.end;
});

app.listen(8080);
console.log("listening on port: 8080");

var searchByName = function (res, nome, social) {
    // Connect to the db
    MongoClient.connect(uri, function (err, db) {
        if (err) { return console.dir(err); }

        var collection = db.collection('influenciadores');

        var filter = {};

        if (social == "Todas") {
            filter = { name: nome };
        } else {
            filter = { name: nome , socialnet: social };
        }

        if (nome == "") {
            filter = {};
        }

        var options = {
            "sort": ["followers", "asc"],
            "limit": 20
        }

        console.log(filter);

        collection.find(filter, options).toArray(function (err, items) {
            if (err) {
                console.dir(err);
                res.render('index', { items: [] });
                return "";
            }
            if (items.length == 0) {
                console.log("Sem resultados");
                res.render('index', { items: [] });
                return "";
            }
            console.log(items);
            res.render('index', { items: items });
            return "";
        });

    })
}

var searchByCat = function (res, cat, social) {
    // Connect to the db
    MongoClient.connect(uri, function (err, db) {
        if (err) { return console.dir(err); }

        var collection = db.collection('influenciadores');
        var array = collection.find({ socialnet: cat }).toArray(function (err, items) { });

        console.log("Categoria: " + cat);

    })
}

function getAll(callback) {
    influencers = [];
    MongoClient.connect(uri, function (err, db) {
        if (err) { return console.dir(err); }

        var collection = db.collection('influenciadores');

        var filter = {};

        var options = {
            "sort": ["followers", "asc"],
            "limit": 20
        };

        var t = collection.find(filter, options).toArray(function (err, items) {
            if (err) { return []; }
            if (items.length == 0) { console.log("Sem resultados"); return []; }
            console.log(items);
            influencers = items;
            return callback(influencers);
        });

    })
}