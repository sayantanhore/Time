const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const browserify = require('browserify');
// const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync').create();
const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');
const KarmaServer = require('karma').Server;

function errLog(thrownBy, err) {
  gutil.log(gutil.colors.red(`Error :: ${thrownBy} : `), err.message);
}

function infoLog(info) {
  gutil.log(gutil.colors.blue('Info :: '), info);
}

gulp.task('lint', () =>
  gulp.src(['**/*.js', '!karma.conf.js', '!node_modules/**', '!dist/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('sass', () =>
  gulp.src('src/**/*.scss')
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/stylesheets/'))
    .pipe(browserSync.stream())
);

gulp.task('bundle', () =>
  browserify('./src/main.js')
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .on('error', err => {
      errLog('Browserify', err);
    })
    .pipe(source('graph.js'))
    /*
    .pipe(buffer())
    .pipe(uglify()) // Does not support ES6
    .on('error', err => {
      gutil.log(gutil.colors.red('Error :: Uglify : '), err.message)
    })
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./maps'))
    .on('error', err => {
      errLog('Sourcemaps', err)
    })
    */
    .pipe(gulp.dest('./dist/'))
);

gulp.task('serve', ['start-server'], () => {
  browserSync.init({
    proxy: 'http://localhost:3200/'
  });

  gulp.watch('./src/**/*.js', ['js-sync']);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/**/*.scss', ['style-sync']);
});

gulp.task('js-sync', ['bundle'], () => {
  browserSync.reload();
});

gulp.task('style-sync', ['sass'], () => {
  browserSync.reload({
    stream: true
  });
});

gulp.task('start-server', () =>
  nodemon({
    script: 'server.js',
    ignore: ['./dist/**/*'],
    watch: 'server.js'
  })
  .on('restart', () => {
    console.log('Restarted');
    setTimeout(() => {
      browserSync.reload({
        stream: false
      });
    }, 1000);
  })
);

gulp.task('build', ['lint', 'sass', 'bundle'], () => {
  infoLog('Build done');
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch(['**/*.js', '!karma.conf.js', '!node_modules/**', '!dist/**'], ['lint']);
});

gulp.task('test', done => {
  new KarmaServer({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: false
  }, done).start();
});
