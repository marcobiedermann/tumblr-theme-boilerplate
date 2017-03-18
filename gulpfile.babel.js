import autoprefixer    from 'autoprefixer';
import gulp            from 'gulp';
import gulpEjs         from 'gulp-ejs';
import gulpPostcss     from 'gulp-postcss';
import gulpProcesshtml from 'gulp-processhtml';
import gulpSass        from 'gulp-sass';

const dirs = {
  source: './source',
  dest  : './dist',
  temp  : './.tmp'
};

gulp.task('css', () => {
  return gulp.src(`${dirs.source}/assets/scss/**/*.scss`)
    .pipe(gulpSass())
    .pipe(gulpPostcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest(`${dirs.temp}/assets/css`));
});

gulp.task('html', ['css'], () => {
  return gulp.src(`${dirs.source}/templates/pages/**/*.ejs`)
    .pipe(gulpEjs({}, {}, {
      ext: '.html'
    }))
    .pipe(gulpProcesshtml({
      includeBase: `${dirs.temp}`
    }))
    .pipe(gulp.dest(`${dirs.dest}`));
});

gulp.task('watch', () => {
  gulp.watch(`${dirs.source}/assets/css/**/*.css`, ['html']);
  gulp.watch(`${dirs.source}/assets/js/**/*.js`, ['html']);
  gulp.watch(`${dirs.source}/template/**/*.ejs`, ['html']);
});

gulp.task('default', () => {
  'html',
  'watch'
});

gulp.task('build', [
  'html'
]);
