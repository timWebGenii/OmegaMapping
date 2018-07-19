var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var injectPartials = require('gulp-inject-partials');
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
        .pipe(autoprefixer({
            browsers: ['last 7 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('watch',['sass','browserSync' ], function(){
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    
});

gulp.task('default', ['watch']);

gulp.task('build', function(){
    runSequence('sass', 'imagemin');
});


// partial inject right into html need to add remove tag
gulp.task('index', function(){
    return gulp.src('./contact.html')
        .pipe(injectPartials())
        .pipe(gulp.dest('./'));
})