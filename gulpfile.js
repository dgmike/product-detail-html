const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const data = {
  stylus: {
    src: './src/styl/main.styl',
    dest: './public/css/',
    watch: './src/styl/*',
    options: {
      compress: true,
      'include css': true
    }
  },
  javascript: {
    src: ['./src/js/main.js'],
    dest: {
      path: './public/js/',
      file: 'main.js'
    },
    watch: './src/js/*'
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

gulp.task('javascript', () => {
  return gulp.src(data.javascript.src)
    .pipe(sourcemaps.init())
    .pipe(concat(data.javascript.dest.file))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(data.javascript.dest.path));
});

gulp.task('javascript:watch', ['javascript'], () => {
  return gulp.watch(data.javascript.watch, ['javascript']);
});

gulp.task('compile', ['stylus', 'javascript']);

gulp.task('default', ['stylus:watch', 'javascript:watch']);
