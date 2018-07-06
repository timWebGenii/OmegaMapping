var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();


gulp.task('browserSync', function() {

    browserSync.init({
        server: {
            baseDir: './'
        },
    })
})

gulp.task('imagemin', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('img'))
        
});


gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({
		stream: true
    }))
});


gulp.task('watch',['browserSync', 'sass'], function(){
    gulp.watch('./sass/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('css/main.css').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    
});


gulp.task('build', function(){
    runSequence('sass', 'imagemin');
});