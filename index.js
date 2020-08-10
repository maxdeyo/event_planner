require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({useNewUrlParser: true, extended: true}));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const mongoose = require('mongoose');
let uristring = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/event_planner';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log('Succeeded connected to: ' + uristring);
    }
});


const Event = require('./models/event.model.js');
const events = require('./controllers/event.controller.js');

app.get("/", (req, res) => {
    res.json({status: "success", message: "Welcome To Testing API"});
});

app.get('/api/test', (req, res) => {

    // Generate some passwords
    const test = {test: 'test'};

    // Return them as json
    res.json(test);

    console.log(`Sent test`);
});

let icsObj = {
    version: 2.0,
    event: 'VEVENT',
    class: 'PUBLIC',
    description: 'Study',
    dtstart: '20200813T200000Z',
    dtend: '20200813T230000Z',
    location: 'Hamilton Library',
    summary: ';LANGUAGE=en-us:Study for Exam',
}

const icsText = (data) => {
    let str = 'BEGIN:VCALENDAR' + '\n' +
        'VERSION:2.0' + '\n' +
        'BEGIN:VEVENT' + '\n' +
        'CLASS:PUBLIC' + '\n' +
        'DESCRIPTION:' + data.name.toString() + '\n';

    //Temp comment out tzid as it doesn't work
    /*str+='DTSTART;TZID=' + data.tzid.toString() + ':' + data.dtstart.toString() + '\n' +
    'DTEND;TZID=' + data.tzid.toString() + ':' + data.dtend.toString() + '\n';*/

    str += 'DTSTART:' + data.dtstart.toString() + '\n' +
        'DTEND:' + data.dtend.toString() + '\n';
    if (data.recurrence) {
        str += 'RRULE:FREQ=' + data.recurrence.toString() + '\n';
    }
    if (data.location) {
        str += 'LOCATION:' + data.location.toString() + '\n'
    }
    str +=
        'SUMMARY;LANGUAGE=en-us:' + data.description.toString() + '\n';
    if (data.resources) {
        str += 'RESOURCES:' + data.resources.toString() + '\n';
    }
    if (data.priority) {
        str += 'PRIORITY:' + data.priority.toString() + '\n';
    }
    str +=
        'END:VEVENT' + '\n' +
        'END:VCALENDAR';
    return str;
}

var text = {"myfile.ics": "This is a file!"};
app.get('/files/:name', function (req, res) {
    res.set({"Content-Disposition": "attachment; filename=\"myfile.ics\""});
    res.send(text["myfile.ics"]);
});


app.post('/api/events/save', function (req, res) {
    console.log('Post a User: ' + JSON.stringify(req.body));

    let event = new Event({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        dtstart: req.body.dtstart,
        dtend: req.body.dtend,
        summary: req.body.summary,
        recurrence: req.body.recurrence,
        tzid: req.body.tzid,
        resources: req.body.resources,
        priority: req.body.priority,
        username: req.body.username
    });

    // Saving it to the database.
    event.save(function (err) {
        if (err) {
            console.log('Error on save!');
        } else {
            console.log('Event Saved!');
        }
    });
});
app.get('/api/events/all', events.findAll);

app.get('/api/events/find/:id', function (req, res) {
    console.log('ID: ' + req.params.id);
})

app.get('/api/events/download/:id', function (req, res) {
    console.log('ID: ' + req.params.id.toString());
    res.set({"Content-Disposition": "attachment; filename=\"" + req.params.id.toString() + ".ics\""});
    Event.findById(req.params.id, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(docs));
            let filePath = req.params.id.toString() + ".ics";
            res.send(icsText(docs));
        }
    });
    res.download(icsText(docs));
})

app.delete('/api/events/delete/:eventid', function (req, res) {
    Event.findByIdAndRemove({_id: req.params.eventid}, function (err, event) {
        if (err) {
            console.log('Error! ' + err.toString())
        } else {
            console.log('Event deleted')
        }
    })
})

app.get('/files/download', function (req, res) {
    res.contentType('text/plain');
    res.send('This is the content', {'Content-Disposition': 'attachment; filename=name.txt'});
});


const passport = require('passport');
const LocalStrategy = require('passport-local');

app.use(require('express-session')({
    name: 'session-id',
    secret: '123-456-789',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

let User = require('./models/user.model.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/api/signup', (req, res, next) => {
    console.log('trying to post!');
    User.register(new User({
            username: req.body.username
        }), req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    err: err
                });
                console.log('err');
                console.log(JSON.stringify(err));
            } else {
                console.log('else');
                passport.authenticate('local', req, res, () => {
                    User.findOne({
                        username: req.body.username
                    }, (err, person) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        if(err){
                            res.json(err);
                        }
                        res.json({
                            success: true,
                            status: 'Registration Successful!',
                        });
                    });
                })
            }
        })
});
app.post('/api/login', passport.authenticate('local'), (req, res) => {
    User.findOne({
        username: req.body.username
    }, (err, person) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
            success: true,
            status: 'You are successfully logged in!'
        });
    })
});
app.get('/api/logout', (req, res, next) => {
    if (req.session) {
        req.logout();
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.clearCookie('session-id');
                res.json({
                    message: 'You are successfully logged out!'
                });
            }
        });
    } else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});
app.get('/api/currentuser', function(req, res) {
    res.json({ username: req.user.username });
});

app.get('/api/events/all/:username', events.findAllByUser);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);

module.exports = app;