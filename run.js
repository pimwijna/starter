const path = require('path');
const livereload = require('livereload');
const watchify = require('watchify');
const browserify = require('browserify');
const fs = require('fs');
const bs = require("browser-sync").create();
const notifier = require('node-notifier');

bs.init({
    server: ["example","dist"]
});


var b = browserify({
  entries: ['./src/bundle.js'],
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
});

b.on('update', bundle);
b.on('log', function (log) {
  console.log(log);
  bs.reload("*.html");
});
bundle();

function bundle() {
  b.bundle(function(err,buf) {
    if(err) {
      console.log(err);
      notifier.notify('Error!');
    }
    fs.writeFileSync('dist/bundle.js',buf);
  });
}
