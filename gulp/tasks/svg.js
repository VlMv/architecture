import svgSprite from 'gulp-svg-sprite';

export const spriteSvg = () => {
   return app.gulp.src(app.path.src.spriteSvg)

      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "SVG",
            message: "Error: <%= error.message %>"
         })
      ))

      .pipe(svgSprite({
         mode: {
            stack: {
               sprite: `../icons/icons.svg`,
               rootviewbox: false
               // example: true // create html page with icons example
            }
         },
      }))

      .pipe(app.gulp.dest(app.path.build.img))
      .pipe(app.plugins.browsersync.stream());
}
