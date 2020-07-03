const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/test', (req, res) => {

  // Generate some passwords
  const test = {test: 'test'};

  // Return them as json
  res.json(test);

  console.log(`Sent test`);
});


//let icsText = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//hacksw/handcal//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:uid1@example.com\nDTSTAMP:20200703T191855Z\nDTSTART:20200813T100000Z\nDTEND:20200813T130000Z\nSUMMARY:Study for exam\nLOCATION:Hamilton Library\nEND:VEVENT\nEND:VCALENDAR";

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);