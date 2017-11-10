const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const livereload = require('livereload');


var server = connect();

server.use(serveStatic(path.join(__dirname,'example')));
server.use(serveStatic(path.join(__dirname, 'dist')));
server.listen(3000);
const lrserver = livereload.createServer();
lrserver.watch([path.join(__dirname,'example')]);
console.log('http://localhost:3000');
