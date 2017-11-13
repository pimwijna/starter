const connect = require('connect');
const serveStatic = require('serve-static');
const path = require('path');
const livereload = require('livereload');
const watchify = require('watchify');
const browserify = require('browserify');
const fs = require('fs');

var server = connect();

server.use(serveStatic(path.join(__dirname,'example')));
server.use(serveStatic(path.join(__dirname, 'dist')));
server.listen(3000);
// https://github.com/napcs/node-livereload/issues/68
const lrserver = livereload.createServer({
  delay: 200
});
lrserver.watch([path.join(__dirname,'example')]);
lrserver.watch([path.join(__dirname,'dist')]);
console.log('http://localhost:3000');


var b = browserify({
  entries: ['./src/bundle.js'],
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
});

b.bundle().pipe(fs.createWriteStream('dist/bundle.js'));

b.on('update', function (ids) {
  console.log('updated');
});
