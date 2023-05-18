import fileinclude from 'gulp-file-include'; // html parts
import webpHtml from 'gulp-webp-retina-html'; // wrap <img> into <picture>
import versionNum from 'gulp-version-number'; // css, js files version (no browser cache)

export const html = () => {
   return app.gulp.src(app.path.src.html)

      .pipe(fileinclude())
      .pipe(app.plugins.replace(/@img\//g, 'img/'))

      .pipe(webpHtml({
         extensions: ['jpg', 'jpeg', 'png'],
         retina: {
            1: '',
            2: '@2x',
         }
      }))

      .pipe(
         app.plugins.if(
            app.buildSet,
            versionNum({
               'value': '%DT%',  // add current date and time
               'append': {
                  'key': '_v',
                  'cover': 0,
                  'to': [
                     'css',
                     'js',
                  ],
               },
               'output': {
                  'file': 'gulp/version.json'
               },
            })
         )
      )

      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream());
}
