// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('assets/js/color-picker.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('assets/css/color-picker.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
            'assets/bower/jquery/dist/jquery.js',
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

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/color-picker.js', ['lint', 'scripts']);
    gulp.watch('assets/css/color-picker.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);