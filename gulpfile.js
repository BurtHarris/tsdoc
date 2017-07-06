
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const merge = require('merge2');
const fs = require('fs')
const path = require('path')
const ts = require("gulp-typescript")

const projects = fs.readdirSync(path.join(__dirname, 'plugins'))
  .map(filename => path.join(__dirname, 'plugins', filename))
  .filter(filepath => fs.statSync(filepath).isDirectory() && fs.existsSync(path.join(filepath, 'tsconfig.json')))
  .concat(['.'])

const tsProjects = projects.map(filepath => ts.createProject(path.join(filepath, 'tsconfig.json')))
    
gulp.task('compile', () => {
  return merge(projects.map((filepath, i) => 
    gulp.src(path.join(filepath, 'src/**/*.ts'), { cwd: filepath })
      .pipe(sourcemaps.init())
        .pipe(tsProjects[i]())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.join(filepath, 'lib')))))
})

gulp.task('watch', ['compile'], () => {
  gulp.watch(['src/**/*.ts', 'plugins/*/**/*.ts'], ['compile'])
})

gulp.task('default', ['compile'])

