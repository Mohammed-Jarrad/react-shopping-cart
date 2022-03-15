let gulp = require('gulp')
let gulpSass = require('gulp-sass')
let sass = gulpSass(require('sass'))

gulp.task('sass', async () => {
    gulp.src('src/components/**/*.scss').pipe(sass()).pipe(gulp.dest('src/css'))
})
// ==> '**.css'



