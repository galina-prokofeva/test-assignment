'use strict';

var gulp = require('gulp'),                    // сам gulp
    rename = require("gulp-rename"),
    connect = require('gulp-connect'),
    livereload = require('livereload'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    wiredep = require('wiredep').stream,
    cssbeautify = require('gulp-cssbeautify');

// server start
gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    });
});

// sass compile
gulp.task('sass', function () {
    return gulp.src('assets/styles/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '>1%', 'ie 10'],
            cascade: false
        }))
        .pipe(cssbeautify())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('assets/styles/'))
        .pipe(connect.reload());
});

// html compile
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

// bower auto update resourses
gulp.task('bower', function () {
    gulp.src('*.html')
        .pipe(wiredep({
            directory: 'assets/vendor',
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('.'));
});

// default task
gulp.task('default', function () {
    return gulp.src('assets/styles/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '>1%', 'ie 10'],
            cascade: false
        }))
        .pipe(cssbeautify())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('assets/styles/'));
    //.pipe(notify('Done!'));
});

gulp.task('watch', function () {
    gulp.watch('assets/styles/scss/**/*.scss', ['sass']);
    gulp.watch('*.html', ['html']);
});

gulp.task('auto', ['connect', 'sass', 'html', 'bower', 'watch']);