const gulp = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const data = {
  html: {
    src: './src/*.html',
    dest: './public',
    options: {
      removeComments: true,
      collapseWhitespace: true
    },
    watch: './src/html/*.html'
  },
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
    src: ['./src/vendor/tiny.js/dist/tiny.js', './src/vendor/chico/dist/ui/chico.js', './src/js/main.js'],
    dest: {
      path: './public/js/',
      file: 'main.js'
    },
    watch: './src/js/*'
  }
};

gulp.task('html', () => {
  return gulp.src(data.html.src)
    .pipe(htmlmin(data.html.options))
    .pipe(gulp.dest(data.html.dest));
});

gulp.task('html:watch', ['html'], () => {
  return gulp.watch(data.html.watch, ['html']);
});

gulp.task('stylus', () => {
  return gulp.src(data.stylus.src)
    .pipe(sourcemaps.init())
    .pipe(stylus(data.stylus.options))
    .pipe(autoprefixer())
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

gulp.task('compile', ['html', 'stylus', 'javascript']);

gulp.task('default', ['html:watch', 'stylus:watch', 'javascript:watch']);
