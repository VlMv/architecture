import { deleteAsync } from 'del'
import zipPlugin from 'gulp-zip'

export const zip = () => {
   deleteAsync(`./${app.path.rootFldr}.zip`)

   return app.gulp.src(`${app.path.buildFldr}/**/*.*`, {})
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: 'ZIP',
            message: 'Error: <%= error.message %>'
         })
      ))
      .pipe(zipPlugin(`${app.path.rootFldr}.zip`))
      .pipe(app.gulp.dest('./'))
}