var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('jshint', function() {
    gulp.src('assets/js/color-picker.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    gulp.src('assets/css/color-picker.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
    gulp.src([
            'assets/bower/jquery/dist/jquery.js',
            'assets/bower/jquery-ui/jquery-ui.js',
            'assets/bower/bootstrap/js/tab.js',
            'assets/bower/randomcolor/randomColor.js',
            'assets/js/color-picker.js'
            ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename('color-picker.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/color-picker.js', ['jshint', 'js']);
    gulp.watch('assets/css/color-picker.scss', ['sass']);
});

gulp.task('default', ['jshint', 'sass', 'js', 'watch']);