var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('browser-sync', function() {
    browserSync.init({
        port: 3002,
        proxy: 'color.ericpitcock.dev',
        notify: false
    });
});

gulp.task('jshint', function() {
    gulp.src('assets/js/color.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    gulp.src('assets/css/color.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
    gulp.src([
            'assets/bower/jquery/dist/jquery.js',
            'assets/bower/jquery-ui/jquery-ui.js',
            'assets/bower/jqueryui-touch-punch/jquery.ui.touch-punch.js',
            'assets/bower/bootstrap/js/tab.js',
            'assets/bower/randomcolor/randomColor.js',
            'assets/bower/fastclick/lib/fastclick.js',
            'assets/bower/clipboard/dist/clipboard.js',
            'assets/js/color.js'
            ])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename('color.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/color.js', ['jshint', 'js']);
    gulp.watch('assets/css/color.scss', ['sass']);
    gulp.watch(['index.html', 'assets/css/color.scss', 'assets/js/color.js']).on('change', browserSync.reload);
});

gulp.task('default', ['jshint', 'sass', 'js', 'watch']);
