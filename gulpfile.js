const autoprefixer = require('autoprefixer');
const { dest, series, src, watch } = require('gulp');
const gulpEjs = require('gulp-ejs');
const gulpPostcss = require('gulp-postcss');
const gulpProcesshtml = require('gulp-processhtml');
const gulpSass = require('gulp-sass');

const dirs = {
  source: './source',
  dest  : './dist',
  temp  : './.tmp'
};

function css() {
  return src(`${dirs.source}/assets/scss/**/*.scss`)
    .pipe(gulpSass())
    .pipe(gulpPostcss([
      autoprefixer()
    ]))
    .pipe(dest(`${dirs.temp}/assets/css`));
}

function html() {
  return src(`${dirs.source}/templates/pages/**/*.ejs`)
    .pipe(gulpEjs({}, {}, {
      ext: '.html'
    }))
    .pipe(gulpProcesshtml({
      includeBase: `${dirs.temp}`
    }))
    .pipe(dest(`${dirs.dest}`));
}

function watchFiles() {
  watch(`${dirs.source}/assets/css/**/*.css`, series(
    'css',
    'html',
  ));
  watch(`${dirs.source}/assets/js/**/*.js`, series(
    'css',
    'html',
  ));
  watch(`${dirs.source}/template/**/*.ejs`, series(
    'css',
    'html',
  ));
}

exports.build = series(
  css,
  html,
);

exports.default = series(
  css,
  html,
  watchFiles,
);
