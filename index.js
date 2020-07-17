require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser= require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ useNewUrlParser: true, extended: true }))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const mongoose = require('mongoose');
let uristring = process.env.MONGODB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/event_planner';

mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});


const Event = require('./models/event.model.js');
const events = require('./controllers/event.controller.js');

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome To Testing API" });
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
  dtend:'20200813T230000Z',
  location: 'Hamilton Library',
  summary: ';LANGUAGE=en-us:Study for Exam',
}

let icsText = 'BEGIN:VCALENDAR' + '\n'
+'VERSION:2.0' + '\n' + 
'BEGIN:VEVENT' + '\n' +
'CLASS:PUBLIC' + '\n' +
'DESCRIPTION:Study' + '\n' +
'DTSTART:20200813T200000Z' + '\n' +
'DTEND:20200813T230000Z' + '\n' +
'LOCATION:Hamilton Library' + '\n' +
'SUMMARY;LANGUAGE=en-us:Study for Exam' + '\n' +
'END:VEVENT' + '\n' +
'END:VCALENDAR';

var text={"myfile.ics":icsText};
app.get('/files/:name',function(req,res){
    res.set({"Content-Disposition":"attachment; filename=\"myfile.ics\""});
    res.send(text[req.params.name]);
 });

 app.post('/api/events/save', function(req, res){
  console.log('Post a User: ' + JSON.stringify(req.body));
  
    let event = new Event ({
      name:"Untitled Note",
      description: "Untitled Note",
      location:"Untitled Note",
      dtstart:"Untitled Note",
      dtend: "Untitled Note",
      summary:"Untitled Note"
  });

  // Saving it to the database.
  event.save(function (err) {
    if (err) {console.log ('Error on save!');}
    else {console.log('John Doe Saved!');}
  });
 });
 app.get('/api/events/all', events.findAll);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);

module.exports = app;