let gulp = require('gulp')
let gulpSass = require('gulp-sass')
let sass = gulpSass(require('sass'))

gulp.task('watch', () => {
    gulp.watch(['src/components/**/*.scss', 'src/pages/**/*.scss'], async () => {
        gulp.src(['src/components/**/*.scss', 'src/pages/**/*.scss']).pipe(sass()).pipe(gulp.dest('src/css'))
    })
})


