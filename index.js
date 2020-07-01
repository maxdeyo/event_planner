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

let icsText = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//hacksw/handcal//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:uid1@example.com\nDTSTAMP:19970714T170000Z\nORGANIZER:CN=John Doe:MAILTO:john.doe@example.com\nDTSTART:19970714T170000Z\nDTEND:19970715T035959Z\nSUMMARY:Bastille Day Party\nGEO:48.85299:2.46885\nEND:VEVENT\nEND:VCALENDAR";

var text={"myfile.ics":icsText,"bye.txt":"Goodbye Cruel World!"};
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