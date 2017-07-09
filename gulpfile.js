  const gulp = require('gulp')
  const childProcess = require('child_process')
  const sourcemaps = require('gulp-sourcemaps')
  const ts = require('gulp-typescript')
  const tsProject = ts.createProject('tsconfig.json')
  const typescriptTasks = ['tslint', 'compile']

  gulp.task('standard-gulpfile', () => {
    return childProcess.exec('standard gulpfile.js --fix')
  })

  gulp.task('tslint', ['compile'], () => {
    return childProcess.exec('tslint -p . --type-check gulpfile.js', {stdio: 'inherit'})
  })

  gulp.task('tslint-fix', ['compile'], () => {
    return childProcess.exec('tslint -p . --type-check --fix', {stdio: 'inherit'})
  })

  gulp.task('compile', ['standard-gulpfile'], () => {
    return tsProject.src()
      .pipe(sourcemaps.init())
      .pipe(tsProject(ts.reporter.defaultReporter()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
  })

  gulp.task('watch', typescriptTasks, () => {
    gulp.watch(['src/**/*.ts'], typescriptTasks)
  })

  gulp.task('default', typescriptTasks)
