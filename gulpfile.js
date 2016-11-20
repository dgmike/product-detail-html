const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');

const data = {
  stylus: {
    src: './src/styl/main.styl',
    dest: './public/css/',
    watch: './src/styl/*',
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

gulp.task('stylus:watch', ['stylus'], () => {
  return gulp.watch(data.stylus.watch, ['stylus']);
});

gulp.task('default', ['stylus:watch']);
