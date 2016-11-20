const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');

const data = {
  stylus: {
    src: './src/styl/main.styl',
    dest: './public/css/',
    options: {
      compress: true,
      'include css': true
    }
  }
};

gulp.task('stylus', () => {
  return gulp.src(data.stylus.src)
    .pipe(sourcemaps.init())
    .pipe(stylus(data.stylus.options))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(data.stylus.dest));
});

gulp.task('default', ['stylus']);
