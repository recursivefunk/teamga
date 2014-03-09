// var static = require('node-static');
// var http = require('http');

// var file = new(static.Server)();

// http.createServer(function (req, res) {
//   file.serve(req, res);
// }).listen(8080);

'use strict';

var express = require('express');
var fs = require('fs');
var app = express();
var path = require( 'path' );

// New call to compress content
app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});

app.use(express.static(__dirname + '/'));

app.listen(process.env.PORT || 3000);

app.get('/cart', function(req, res){
  fs.createReadStream( path.resolve( './cart.json' ) ).pipe( res );
});

app.post('/cart', function(req, res){
  console.log( req.body )
  var newCart = req.body;
  fs.writeFile( path.resolve('./cart.json'), JSON.stringify( newCart, null, 2 ), function(err){
    res.send( 'OK' );
  });
});

app.get('/user', function(req, res){
  fs.createReadStream( path.resolve( './user.json' ) ).pipe( res );
});

app.post('/cart', function(req, res){
  console.log( req.body )
  var newCart = req.body;
  fs.writeFile( path.resolve('./user.json'), JSON.stringify( newCart, null, 2 ), function(err){
    res.send( 'OK' );
  });
});