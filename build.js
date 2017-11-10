const fs = require('fs');
const path = require('path');
const Concat = require('concat-with-sourcemaps');
const UglifyJS = require("uglify-js");

const files = [
  path.join(require.resolve('jquery'))
];

var concat = new Concat(true, 'all.js', '\n');

for(let i = 0; i < files.length; i += 1) {
    concat.add(path.basename(files[i]),fs.readFileSync(files[i]).toString());
}

fs.writeFileSync('dist/bundle.js', concat.content);

const minified =  UglifyJS.minify(concat.content.toString());

if(!minified.error) {
  fs.writeFileSync('dist/bundle.min.js',minified.code);
}
else {
  console.log(minified.error);
}
