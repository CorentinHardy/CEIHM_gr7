/**
 * Created by user on 15/12/2016.
 */
 
// We need to use the express framework: have a real web servler that knows how to send mime types etc.
var express=require('express');

// Init globals variables for each module required
var app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server);


var port = 8082;
var response;
var id;
var messages = [];

var hudsSocketIds = [];

// launch the http server on given port
server.listen(port);
console.log("Listening on port " + port);

// Indicate where static files are located. Without this, no external js file, no css...
app.use(express.static(__dirname + '/'));

///////////////
// http part //

// new message
app.get('/push/:id', function (request, res) {
  id = request.params.id;
  console.log("receive push ", id);
  // messages.push(id);

  // setTimeout(function() {
  //   res.send("ok");
  // }, 0);
  var data = {"message": id};
  hudsSocketIds.forEach(function(sId) {
    if (io.sockets.connected[sId] != null)
      io.sockets.connected[sId].emit("message", data);
    });
});

// app.get('/pop', function (request, res) {
//   if(messages.length > 0){
//     console.log("pop empty");
//     res.send({"response":-10});
//   }else {
//     response = messages.pop()
//     console.log("pop response ", response, " on ", messages);
//     res.send({"response":response});
//   }
// });

/**
 * messages server:
 * [0-6]
 * -2 on desccend (bottom)
 * -3 on monte (up)
 */


io.sockets.on('connection', function (socket) {
  console.log("Connection [" + socket.id + "]");

  /* REGISTER */
  socket.on('register', function (data) {
    // io.sockets.connected[socketId].emit()
    console.log("Registering new HUD [" + socket.id + "]");
    hudsSocketIds.push(socket.id);
  });

  /* DISCONNECT */
  socket.on('disconnect', function(){
    console.log("Disconnection [" + socket.id + "]");
    var index = hudsSocketIds.indexOf(socket.id);
    
    // If found
    if (index > -1) {
      console.log(" disconnect ", index + 1, "e huds");
      // Remove Hud socket from list
      hudsSocketIds.splice(index, 1);  
    } else {
      console.log("can't disconnect, unknown socket id");
    }
  });

});
