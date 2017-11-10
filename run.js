const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const livereload = require('livereload');
const nodemon = require('nodemon');

var server = connect();

server.use(serveStatic(path.join(__dirname,'example')));
server.use(serveStatic(path.join(__dirname, 'dist')));
server.listen(3000);
const lrserver = livereload.createServer({
  delay: 200
});
lrserver.watch([path.join(__dirname,'example')]);
lrserver.watch([path.join(__dirname,'dist')]);
console.log('http://localhost:3000');


nodemon('-x "npm run build"');
