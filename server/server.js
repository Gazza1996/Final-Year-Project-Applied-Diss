// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost/tagging');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var Tagging = mongoose.model('Tagging', {
    TagNumber: String,
    DOB: String,
    name: String,
    Gender: String,
    description: String
});

var Aiing = mongoose.model('Aiing', {
    aiTagNumber: String,
    name: String,
    weeksGone: String,
});

var Reporting = mongoose.model('Reporting', {
    reportInfo: String,
    Date: Date
});

// Routes

 // Get tags
    app.get('/api/tags', function(req, res) {
        
        console.log("fetching tags");

        // use mongoose to get all tags in the database
        Tagging.find(function(err, tags) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(tags); // return all tags in JSON format
        });
    });

    // Get ais
    app.get('/api/ais', function(req, res) {

        console.log("fetching ais");

        // use mongoose to get all tags in the database
        Aiing.find(function(err, ais) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(ais); // return all tags in JSON format
        });
    });

    app.get('/api/reports', function(req, res) {

        console.log("fetching reports");

        // use mongoose to get all tags in the database
        Reporting.find(function(err, reports) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(reports); // return all tags in JSON format
        });
    });

        // create review and send back all reviews after creation
        app.post('/api/tags', function(req, res) {
        
            console.log("creating tag");

            // create a tags, information comes from request from Ionic
            Tagging.create({
                DOB : req.body.DOB,
                TagNumber: req.body.TagNumber,
                name : req.body.name,
                Gender : req.body.Gender,
                description : req.body.description,
                done : false
            }, function(err, tag) {
                if (err)
                    res.send(err);

                // get and return all the tags after you create another
                Tagging.find(function(err, tags) {
                    if (err)
                        res.send(err)
                    res.json(tags);
                });
            });

        });

        // create review and send back all reviews after creation
        app.post('/api/ais', function(req, res) {

            console.log("creating ai");
    
            // create a ais, information comes from request from Ionic
            Aiing.create({
                name : req.body.name,
                weeksGone : req.body.weeksGone,
                aiTagNumber: req.body.aiTagNumber,
                done : false
            }, function(err, ai) {
                if (err)
                    res.send(err);
    
                // get and return all the ais after you create another
                Aiing.find(function(err, ais) {
                    if (err)
                        res.send(err)
                    res.json(ais);
                });
            });
    
        });

        app.post('/api/reports', function(req, res) {

            console.log("creating report");
    
            // create a ais, information comes from request from Ionic
            Reporting.create({
                reportInfo: req.body.reportInfo,
                Date: req.body.Date,
                done : false
            }, function(err, report) {
                if (err)
                    res.send(err);
    
                // get and return all the ais after you create another
                Reporting.find(function(err, reports) {
                    if (err)
                        res.send(err)
                    res.json(reports);
                });
            });
    
        });

    
        // delete a tag
        app.delete('/api/tags/:tag_id', function(req, res) {
            Tagging.remove({
                _id : req.params.tag_id
            }, function(err, tag) {
    
            });
        });

         // delete a ai
        app.delete('/api/ais/:ai_id', function(req, res) {
            Aiing.remove({
                _id : req.params.ai_id
            }, function(err, ai) {

            });
        });

        app.delete('/api/reports/:report_id', function(req, res) {
            Reporting.remove({
                _id : req.params.report_id
            }, function(err, report) {

            });
        });
// listen (start app with node server.js) 
app.listen(8080);
console.log("App listening on port 8080");