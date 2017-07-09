  const gulp = require('gulp')
  const childProcess = require('child_process')
  const sourcemaps = require('gulp-sourcemaps')
  const ts = require('gulp-typescript')
  const tsProject = ts.createProject('tsconfig.json')
  const jsdoc = require('gulp-jsdoc3') // NOTE: this is gulp-jsdoc3 NOT the deprecated gulp-jsdoc
  const rimraf = require('rimraf')
  const opn = require('opn')

  const typescriptTasks = ['tslint', 'compile', 'testdoc']
  const testDocs = ['test/README.md', 'test/**/*.js', 'test/**/*.ts']

  gulp.task('standard-gulpfile', () => {
    return childProcess.exec('standard gulpfile.js --fix')
  })

  gulp.task('tslint', ['compile'], () => {
    return childProcess.exec('tslint -p . --type-check', {stdio: 'inherit'})
  })

  gulp.task('tslint-fix', ['compile'], () => {
    return childProcess.exec('tslint -p . --type-check --fix', {stdio: 'inherit'})
  })

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

  gulp.task('rimraf-out', cb => rimraf('./out', cb))

  gulp.task('testdoc', ['rimraf-out'], cb => {
    const config = require('./test/jsdoc.json')

    gulp.src(testDocs, {read: false})
        .pipe(jsdoc(config, cb))
  })

  gulp.task('opn-out', ['testdoc'], () => {
    return opn('./out/index.html')
  })

  gulp.task('watch', ['compile', 'opn-out'], () => {
    gulp.watch(['src/**/*.ts'], typescriptTasks)
    gulp.watch(testDocs, ['testdoc'])
  })

  gulp.task('default', typescriptTasks)
