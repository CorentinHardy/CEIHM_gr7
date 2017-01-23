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
var id;

var hudsSocketIds = [];

// launch the http server on given port
server.listen(port);
console.log("Listening on port " + port);

// Indicate where static files are located. Without this, no external js file, no css...
app.use(express.static(__dirname + '/'));

///////////////
// http part //
var receiveMessageNumber = function(id){
  console.log("receive push ", id, " send to ", hudsSocketIds.length, " huds");
  // messages.push(id);

  // setTimeout(function() {
  //   res.send("ok");
  // }, 0);
  var data = {"message": id};
  hudsSocketIds.forEach(function(sId) {
    if (io.sockets.connected[sId] != null) {
      console.log("    send to ", sId);
      io.sockets.connected[sId].emit("command", data);
    }
  });
};

// new message
app.get('/push/:id', function (request, res) {
  id = parseInt(request.params.id);
  receiveMessageNumber(id);
});

/**
 * messages server:
 * [0-6]
 * -2 on desccend (bottom)
 * -3 on monte (up)
 * -1 cancel
 */


io.sockets.on('connection', function (socket) {
  console.log("Connection [" + socket.id + "]");

  socket.on('sendMessage', function(data){
    /*TODO message content:
      message:string;
      imgUrl:string;
      by:Kind;
      description:string;
      isPropagated:boolean;

      // but for monday 16, we are happy with
      message: number
      */
    hudsSocketIds.forEach(function(sId) {
      if (io.sockets.connected[sId] != null)
        io.sockets.connected[sId].emit("externMessage", data);
    });
  });

  socket.on('push', function(data) {
    receiveMessageNumber(data.message);
  });

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


// manage error
app.get('*', function(req, res){
  console.log("receive unknown path: " + req.url);
});

