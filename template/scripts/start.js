
const fs = require('fs')

//
// SERVER
//

const bs = require('browser-sync')

bs({
  server: 'public',
  ui: false,
  files: ['public/**', '!**/**DS_Store'],
  open: false,
  notify: false
})


//
// JS
//

const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')

const vendors = ['react', 'react-dom', 'reflux']

if (vendors && vendors.length) {
  browserify()
  .require(vendors)
  .bundle(function (err, data) {
    if (err) return console.error(err.message)
    fs.writeFileSync('public/vendors.js', data)
  })
}

var w = watchify(browserify('src/index.js'))
if (vendors && vendors.length) w.external(vendors)
w.transform(babelify, {
  presets: ['es2015', 'react'],
  // plugins: ['transform-runtime'] // uncomment if you want babel-runtime
})
w.on('update', bundle)
bundle()

function bundle() {
  w.bundle(function (err, data) {
    if (err) return console.error(err.message)
    fs.writeFileSync('public/bundle.js', data)
  })
}

//
// CSS
//

const chokidar = require('chokidar')
const postcss = require('postcss')

chokidar
.watch('src/index.css')
.on('add', css)
.on('change', css)

function css(file) {
  postcss([
    require('autoprefixer')
  ])
  .process(fs.readFileSync(file, 'utf8'))
  .then(function(result) {
    fs.writeFileSync('public/bundle.css', result.css)
  })
}
