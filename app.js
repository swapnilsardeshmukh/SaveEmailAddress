var express = require('express');
var {faker} = require('@faker-js/faker');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var ejs = require("ejs");
app.set('view engine', 'ejs');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'join_us',
    insecureAuth : true
  });
  
con.connect((err) => {
    if(err){      
      console.log('Error connecting to Db' + err);
      return;
    }
    console.log('Connection established');
  });

app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM users';
    con.query(q, function (error, results) {
    if (error) throw error;
    var count = results[0].count;
    res.render("home",{data: count});
    });
   });
 

app.post('/register', function(req,res){
    var person = {email: req.body.email};
    console.log(req.body.email);
    con.query('INSERT INTO users SET ?', person, function(err, result) {
    console.log(err);
    console.log(result);
    res.redirect("/");
    });
   });

var server = app.listen(3002, function () {
    console.log('App listening on port 3002!');
   });

// setTimeout(function() {
//     console.log('App Closing on port 3002!');
//     server.close();
//   }, 20000);
// con.end((error) => {
//     if (error) throw error;
//   });   