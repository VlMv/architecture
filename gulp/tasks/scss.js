import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // css compressing


import autoprefixer from 'gulp-autoprefixer';
import groupMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss)

      .pipe(
         app.plugins.if(
            app.devSet,
            app.plugins.sourcemaps.init())
      )

      .pipe(sass({
         outputStyle: 'expanded'
      }))

      .pipe(app.plugins.replace(/@img\//g, '../img/'))

      .pipe(
         app.plugins.if(
            app.devSet,
            app.plugins.sourcemaps.write())
      )
   
      .pipe(
         app.plugins.if(
            app.buildSet,
            groupMediaQueries())
      )

      .pipe(
         app.plugins.if(
            app.buildSet,
            autoprefixer({
               grid: true,
               overrideBrowserslist: ["last 3 versions"],
               cascade: true
            }))
      )

      .pipe(
         app.plugins.if(
            app.buildSet,
            app.gulp.src(`${app.path.srcFldr}/scss/vendor/normalize.css`)
         )
      )
      .pipe(
         app.plugins.if(
            app.buildSet,
            cleanCss())
      )

      .pipe(rename({
         extname: ".min.css"
      }))

      .pipe(app.gulp.dest(app.path.build.scss))
      .pipe(app.plugins.browsersync.stream());
}
