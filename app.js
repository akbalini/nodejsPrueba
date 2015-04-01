var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
var db;

var config = {
"USER" : "";
"PASS" : "",
"HOST" : "ec2-52-0-40-42.compute-1.amazonaws.com",
"PORT" : "27017",
"DATABASE" : "My example",
};

var dbPath = "mongodb://"+config.USER + ":"+
     config.PASS + "@"+
     config.HOST + ":"+
    config.PORT + "/"+
     config.DATABASE;
var standardGreeting = 'Hello World!';


var greetingSchema = mongoose.Shema({
sentence: String
});
var Greeting = mongoose.model('Greeting',greentingSchema);
db = mongoose.connect(dbPath);

mongoose.connection.once('open',function() {
 var greeting; 
Greeting.find( function(err, greetings){
    if( !greetings ){
      greeting = new Greeting({ sentence: standardGreeting });
  greeting.save();
 }
});
});


app.get('/', function(req, res){
  Greeting.findOne(function (err, greeting) {
  res.send(greeting.sentence);
  });
});

app.use(function(err, req, res, next){
if (req.xhr) {
res.send(500, 'Something went wrong!');
}
else {
next(err);
}
});

console.log('starting Express (NodeJS) Web server');
app.listen(8080);
console.log("Webserverlistening on port 8080');

