const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('tsconfig.json')

gulp.task('compile', () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject(ts.reporter.defaultReporter()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
})

gulp.task('watch', ['compile'], () => {
  gulp.watch(['src/**/*.ts'], ['compile'])
})

gulp.task('default', ['compile'])
