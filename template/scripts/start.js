
const bs = require('browser-sync')
const browserify = require('browserify')
const watchify = require('watchify')
const fs = require('fs')
const myth = require('myth')
const chokidar = require('chokidar')
const strip = require('strip-comment')

//
// SERVER
//

bs({
  server: 'public',
  ui: false,
  files: 'public/**',
  open: false,
  notify: false
})

//
// JS
//

var args = watchify.args
// args.fullPaths = false
// console.log(args)
var w = watchify(browserify('src/index.js', args))
w.on('update', bundle)
bundle()

function bundle() {
  w.bundle(function (err, src) {
    if (err) return console.error(err.message)
    fs.writeFileSync('public/bundle.js', src)
  })
}

//
// CSS
//

chokidar.watch('src/index.css').on('all', function(event, path) {
  var css = fs.readFileSync('src/index.css', 'utf8')
  css = strip.js(css)
  css = myth(css, {source:'.', compress: false})
  fs.writeFileSync('public/bundle.css', css)
})
