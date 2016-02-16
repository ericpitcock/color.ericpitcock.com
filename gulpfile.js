var gulp = require('gulp'); 

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

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
            'assets/js/color.js'
            ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename('color.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
    gulp.watch('assets/js/color.js', ['jshint', 'js']);
    gulp.watch('assets/css/color.scss', ['sass']);
});

gulp.task('default', ['jshint', 'sass', 'js', 'watch']);