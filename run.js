const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const livereload = require('livereload');


var server = connect();

server.use(serveStatic(path.join(__dirname)));
server.listen(3000);
const lrserver = livereload.createServer();
lrserver.watch([path.join(__dirname)]);
console.log('http://localhost:3000');
