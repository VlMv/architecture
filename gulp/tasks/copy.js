export const copy = () => {
   // app.gulp. - gulp-key from global gulpfile.js
   // app.path. - path-key from global gulpfile.js
   // src. - src-object from path-object path.js
   // files - files-key from src-object path.js
  return app.gulp.src(app.path.src.files)
    .pipe(app.gulp.dest(app.path.build.files))
}