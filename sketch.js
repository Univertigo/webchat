//

/*
// Keep track of our socket connection
var socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // Start a socket connection to the server
  // Some day we would run this server somewhere else
  socket = io.connect('http://localhost:8080');
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on('mouse',
    // When we receive data
    function(data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0,0,255);
      noStroke();
      ellipse(data.x,data.y,80,80);
    }
  );
}

function draw() {
  // Nothing
}

function mouseDragged() {
  // Draw some white circles
  fill(255);
  noStroke();
  ellipse(mouseX,mouseY,80,80);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}

*/
var socket;

function setup() {
  createCanvas(1000, 1000);
  background(51);
  //socket = io.connect('http://localhost:8080');
  socket = io.connect('https://dating-chat.herokuapp.com/');
  socket.on('mouse', newDrawing);
}



function newDrawing(data) {
  fill(255,0,100);
  ellipse(data.x, data.y, 20, 20);
}

function mouseDragged() {

  console.log("Sending Data: " + mouseX + ',' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }
  socket.emit('mouse', data);

  fill(255,100,0);
  ellipse(mouseX, mouseY, 20, 20);
}

function draw() {

  // put drawing code here
}