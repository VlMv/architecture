import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import sharpResponsive from 'gulp-sharp-responsive';
import svg2png from 'gulp-svg2png';
import ico from 'gulp-to-ico';

export const imgRetina = () => {
   return app.gulp.src(app.path.src.imgNoBg)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%= error.message %>"
         })
      ))

      .pipe(app.plugins.newer(app.path.build.img)) // check existing images
      .pipe(webp()) // create webp
      .pipe(app.gulp.src(app.path.src.img))
      .pipe(app.plugins.newer(app.path.build.img))
      .pipe(
         app.plugins.if(
            app.buildSet,
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewBox: false }],
               interlaced: true,
               optimizationLevel: 3 // 0 - 7
            }))
      )
      .pipe(rename({ // add retina suffix
         suffix: "@2x"
      }))
      .pipe(app.gulp.dest(app.path.build.img))

      .pipe(app.plugins.browsersync.stream());
}

export const img = () => {
   return app.gulp.src(app.path.src.imgNoBg)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "IMAGES",
            message: "Error: <%= error.message %>"
         })
      ))

      .pipe(app.plugins.newer(app.path.build.img))
      .pipe(webp())
      .pipe(app.gulp.src(app.path.src.img))
      .pipe(app.plugins.newer(app.path.build.img))

      // create x1 image out of x2-retina image
      .pipe(sharpResponsive({
         formats: [
            { width: (metadata) => (Math.round(metadata.width * 0.5)) } // divides the original image width by 2
         ]
      }))
      .pipe(
         app.plugins.if(
            app.buildSet,
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewBox: false }],
               interlaced: true,
               optimizationLevel: 3 // 0 - 7
            }))
      )
      .pipe(app.gulp.dest(app.path.build.img))

      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.img))

      .pipe(app.plugins.browsersync.stream());
}


export const favicon = () => {
   return app.gulp.src(app.path.src.favicon)

      //manifest copy
      .pipe(
         app.plugins.if(
            app.buildSet,
            app.gulp.src(app.path.src.webmanifest))
      )
      .pipe(app.gulp.dest(`${app.path.buildFldr}/img/favicon/`))
      .pipe(app.plugins.newer(`${app.path.buildFldr}/img/favicon/`))

      // favicon png 512
      .pipe(
         app.plugins.if(
            app.buildSet,
            app.gulp.src(app.path.src.favicon))
      )
      .pipe(svg2png({
         width: 512,
         height: 512
      }))
      .pipe(
         app.plugins.if(
            app.buildSet,
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewBox: false }],
               interlaced: true,
               optimizationLevel: 3 // 0 - 7
            }))
      )
      .pipe(rename({
         suffix: "-512"
      }))
      .pipe(app.gulp.dest(`${app.path.buildFldr}/img/favicon/`))
      .pipe(app.plugins.newer(`${app.path.buildFldr}/img/favicon/`))

      // favicon png 180 for apple
      .pipe(
         app.plugins.if(
            app.buildSet,
            app.gulp.src(app.path.src.favicon))
      )
      .pipe(svg2png({
         width: 180,
         height: 180
      }))
      .pipe(
         app.plugins.if(
            app.buildSet,
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewBox: false }],
               interlaced: true,
               optimizationLevel: 3 // 0 - 7
            }))
      )
      .pipe(rename({
         suffix: "-apple-180"
      }))
      .pipe(app.gulp.dest(`${app.path.buildFldr}/img/favicon/`))
      .pipe(app.plugins.newer(`${app.path.buildFldr}/img/favicon/`))

      // favicon png 192
      .pipe(
         app.plugins.if(
            app.buildSet,
            app.gulp.src(app.path.src.favicon))
      )
      .pipe(svg2png({
         width: 192,
         height: 192
      }))
      .pipe(
         app.plugins.if(
            app.buildSet,
            imagemin({
               progressive: true,
               svgoPlugins: [{ removeViewBox: false }],
               interlaced: true,
               optimizationLevel: 3 // 0 - 7
            }))
      )
      .pipe(rename({
         suffix: "-192"
      }))
      .pipe(app.gulp.dest(`${app.path.buildFldr}/img/favicon/`))
      .pipe(app.plugins.newer(`${app.path.buildFldr}/img/favicon/`))

      // favicon ico 32
      .pipe(
         app.plugins.if(
            app.buildSet,
            app.gulp.src(app.path.src.favicon))
      )
      .pipe(svg2png({
         width: 32,
         height: 32
      }))
      .pipe(ico('favicon-32.ico'))
      .pipe(app.gulp.dest(`${app.path.buildFldr}/`))

      .pipe(app.plugins.browsersync.stream());
}
