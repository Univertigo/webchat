

// Here we import the node module 'http'
var http = require('http');
// URL module
var url = require('url');
var path = require('path');

// Using the filesystem module
var fs = require('fs');

//const port = process.env.PORT || 3000

//http.createServer get passed func handleRequest and starts listining on a port
var server = http.createServer(handleRequest);
//server.listen(port);

console.log('Server started on port 8080');


//this function will handle the requests - this is done by receiving a request argument 
//and acts on a response argument
//this function is passed as a callback function for the func createServer() 
/*This handleRequest() method will serve a p5 sketch including an index.html, sketch.js, and style.css.*/
function handleRequest(req, res) {
 
  // What did we request?
  var pathname = req.url;
  
  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  }
  
  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };

  // What is it?  Default to plain text
  var contentType = typeExt[ext] || 'text/plain';

  // We're really living in JavaScript land now. The readFile() function takes two arguments. 
  //The first argument is the path of the file we want to read and the second is a function 
  //that will be triggered once the file has been read.
  fs.readFile(__dirname + pathname,
    // Callback function for reading
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200,{ 'Content-Type': contentType });

      //We'll send back 'data' for every HTTP request made to the server.
      res.end(data);
    }
  );
}


// WebSockets work with the HTTP server
//we listen for socket connections on this server 
var io = require('socket.io').listen(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',

  // We are given a websocket object in our function
  //This socket argument is a reference for the current client connected. 
  //That client can also be passed callback functions. Here a callback function when client uses mouse
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
      function(data) {
      
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
/*
    socket.on('camera',
      function(data) {
        // Data comes in as whatever was sent, including objects
        //console.log("Received: 'mouse' " + data.x + " " + data.y);
      
        // Send it to all other clients
        socket.broadcast.emit('camera', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
    */
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);


