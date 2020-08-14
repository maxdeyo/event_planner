const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require('mongoose');

const {expect} = chai;
chai.use(chaiHttp);

const Event = require('../models/event.model.js');


describe("Server!", () => {
    it("welcomes user to the api", done => {
        chai
            .request(app)
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome To Testing API");
                done();
            });
    });
});

describe("User Test", () => {
    let testData = {
        username: "newusername",
        password: "Newpassword10"
    };
    it("Validates User Signup", done => {
        chai
            .request(app)
            .post("/api/signup")
            .set('Content-Type', 'application/json')
            .send(testData)
            .end(function (error, res, body) {
                if (error) {
                    done(error);
                } else {
                    done();
                }
            });
    });
    it("Tests User login", done => {
        chai
            .request(app)
            .post("/api/login")
            .set('Content-Type', 'application/json')
            .send(testData)
            .end(function (error, res, body) {
                if (error) {
                    done(error);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    })
});

describe("Event test", () => {
    let testUsername = "johnfoo";
    let event = {
        name: "Title",
        description: "Description",
        location: "Location",
        dtstart: "2020-08-14T19:00:00.000Z",
        dtend: "2020-08-28T19:30:00.000Z",
        username: testUsername
    }
    it("Tests Saving new event", done => {
        chai
            .request(app)
            .post("/api/events/save")
            .set('Content-Type', 'application/json')
            .send(event)
            .end(function (error, response, body) {
                if (error) {
                    done(error);
                } else {
                    done();
                }
            });
    });
    it("Tests finding event by username", done => {
        chai
            .request(app)
            .get('/api/events/all/' + testUsername)
            .end(function (error, res) {
                if (error) {
                    done(error);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    });
})

describe("Wrong event test", () => {
    let event = {
        wrongName: "WrongName"
    }
    it("Tests saving bad event data, should fail!", done => {
        chai
            .request(app)
            .post("/api/events/save")
            .set('Content-Type', 'application/json')
            .send(event)
            .end(function (error, res, body) {
                if (error) {
                    done(error);
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    })
})
/*
describe('Database Tests', function() {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
  describe('Test Database', function() {
    //Save object with 'name' value of 'Mike"
    it('New event saved to test database', function(done) {
      var testEvent = Event({
        name: 'Name',
        description: 'Description',
        location: 'Location',
        dtstart: 'Start',
        dtend: 'End',
        summary: 'Summary'
      });

      testEvent.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = Event({
        notName: 'Not an event'
      });
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
    it('Dont save incorrect date to database', function(done) {
      //Attempt to save with wrong info. An error should trigger
      var wrongSave = {
        name: 'Name',
        description: 'Description',
        location: 'Location',
        dtstart: 'Start',
        dtend: 'End',
        summary: 'Summary'
      };
      var date = new Date(wrongSave.dtstart);
      //if(date instanceof Date && !isNaN(date.valueOf()))
      wrongSave.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
});
 */