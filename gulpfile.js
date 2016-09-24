var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

var pluginConfig = {
    autoprefixer: {
        browsers: ['last 2 versions']
    },
    browserSync: {
        port: 3002,
        proxy: 'color.ericpitcock.dev',
        notify: false
    },
    notify: {
        title: 'Compile Error',
        message: '<%= error.message %>',
        sound: 'Funk'
    },
    rename: {
        suffix: '.min'
    },
    sass: {
        outputStyle: 'compressed'
    }
}

/// HANDLE ERRORS /////////////////////////////////////////////////////////

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError(pluginConfig.notify).apply(this, args);
    this.emit('end');
}

/// BROWSER SYNC /////////////////////////////////////////////////////////

gulp.task('browser-sync', function() {
    browserSync.init(pluginConfig.browserSync);
});

/// SASS /////////////////////////////////////////////////////////

gulp.task('sass', function() {
    gulp.src('assets/css/color.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(pluginConfig.sass))
        .pipe(autoprefixer())
        .pipe(rename(pluginConfig.rename))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

/// JS /////////////////////////////////////////////////////////

gulp.task('jshint', function() {
    return gulp.src('assets/js/color.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js', ['jshint'], function() {
    gulp.src(['assets/js/color.js'])
        .pipe(sourcemaps.init())
        .pipe(plumber(pluginConfig.plumber))
        .pipe(concat('color.js'))
        .pipe(rename(pluginConfig.rename))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('js:vendor', function() {
    gulp.src([
            'assets/bower/jquery/dist/jquery.min.js',
            'assets/js/jquery-ui.js',
            'assets/bower/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
            'assets/bower/bootstrap/js/tab.js',
            'assets/bower/randomcolor/randomColor.js',
            'assets/bower/fastclick/lib/fastclick.js'
            //'assets/bower/clipboard/dist/clipboard.js',
            ])
        //.pipe(sourcemaps.init())
        //.pipe(plumber(pluginConfig.plumber))
        .pipe(concat('vendor.js'))
        .pipe(rename(pluginConfig.rename))
        .pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js'));
});

/// WATCH /////////////////////////////////////////////////////////

gulp.task('watch', function() {
    gulp.watch('assets/js/color.js', ['jshint', 'js']);
    gulp.watch('assets/css/color.scss', ['sass']);
    gulp.watch(['index.html', 'assets/js/color.min.js']).on('change', browserSync.reload);
});

/// HELPERS /////////////////////////////////////////////////////////

gulp.task('build', ['sass', 'jshint', 'js']);

/// DEFAULT /////////////////////////////////////////////////////////

gulp.task('default', ['browser-sync', 'watch']);
