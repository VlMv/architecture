import webpack from 'webpack-stream';

export const js = () => {
   return app.gulp.src(app.path.src.js)

      .pipe(
         app.plugins.if(
            app.devSet,
            app.plugins.sourcemaps.init())
      )

      .pipe(webpack({
         mode: app.buildSet ? 'production' : 'development',
         output: {
            filename: 'app.min.js',
         }
      }))

      .pipe(
         app.plugins.if(
            app.devSet,
            app.plugins.sourcemaps.write())
      )

      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browsersync.stream());
}
