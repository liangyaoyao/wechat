// var ws = require("nodejs-websocket")
// var port=8080;
// var user=0;

// // Scream server example: "hi" -> "HI!!!"
// var server = ws.createServer(function (conn) {
// 	console.log("New connection");
// 	user++;
// 	conn.nickname="user"+user;
// 	broadcast(conn.nickname+" comes in");
// 	conn.on("text", function (str) {
// 		console.log("Received "+str)
// 		//conn.sendText(str.toUpperCase()+"!!!")
// 		broadcast(str);
// 	})
// 	conn.on("close", function (code, reason) {
// 		console.log("Connection closed");
// 		broadcast(conn.nickname+" left ");
// 	})
// 	conn.on("error", function (err) {
// 		console.log("handdle error");
// 		console.log(err);
// 	})
// }).listen(port);
// console.log("websocket server listening on port "+port);
// function broadcast(str){
// 	server.connections.forEach(function(connection){
// 		connection.sendText(str);
// 	})
// }
var ws = require("nodejs-websocket")
var port=8080;
var user=0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection");
	user++;
	conn.nickname="user"+user;
	var mes = {}
	mes.nickname ="user" + user
	mes.data = conn.nickname+" comes in"
	broadcast(mes,conn)
	conn.on("text", function (str) {
		console.log("Received "+str)
		mes.nickname = conn.nickname
		mes.data = str
		//conn.sendText(str.toUpperCase()+"!!!")
		broadcast(mes,conn);
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed");
		mes.nickname =conn.nickname
		mes.data = conn.nickname+" left"
		broadcast(mes,conn)
	})
	conn.on("error", function (err) {
		console.log("handdle error");
		console.log(err);
	})
}).listen(port);
console.log("websocket server listening on port "+port);
function broadcast(str,conn){
	server.connections.forEach(function(connection){
		if(connection == conn){
			str.type = 1
		}else{
			str.type = 0
		}
		connection.sendText(JSON.stringify(str));
	})
}