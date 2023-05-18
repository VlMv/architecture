import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import fs from 'fs-extra';


export const fonts = () => {
   return app.gulp.src(app.path.src.fonts)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         })
      ))

      .pipe(ttf2woff())

      .pipe(app.gulp.src(app.path.src.fonts))
      .pipe(ttf2woff2())
      .pipe(app.gulp.dest(app.path.build.fonts))

      .pipe(app.plugins.browsersync.stream());
}

export const fontScss = () => {
   let fontsFile = `${app.path.srcFldr}/scss/_fonts.scss`
   // check font files exist
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      if (fontsFiles) {
         // check fonts.scss exists
         if (!fs.existsSync(fontsFile)) {
            // create if doesn't exist
            fs.writeFile(fontsFile, '', cb)
            let newFileOnly
            for (var i = 0; i < fontsFiles.length; i++) {
               // Записываем подключения шрифтов в файл стилей
               let fontFileName = fontsFiles[i].split('.')[0]
               if (newFileOnly !== fontFileName) {
                  let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
                  let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName

                  if (fontWeight.toLowerCase() === 'thin') {
                     fontWeight = 100
                  } else if (fontWeight.toLowerCase() === 'extralight') {
                     fontWeight = 200
                  } else if (fontWeight.toLowerCase() === 'light') {
                     fontWeight = 300
                  } else if (fontWeight.toLowerCase() === 'medium') {
                     fontWeight = 500
                  } else if (fontWeight.toLowerCase() === 'semibold') {
                     fontWeight = 600
                  } else if (fontWeight.toLowerCase() === 'bold') {
                     fontWeight = 700
                  } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                     fontWeight = 800
                  } else if (fontWeight.toLowerCase() === 'black') {
                     fontWeight = 900
                  } else {
                     fontWeight = 400
                  }

                  fs.appendFile(fontsFile,
                     `@font-face {font-weight: ${fontWeight};font-family: ${fontName};font-display: swap;src: url("../fonts/${fontFileName}.woff2")format("woff2"),url("../fonts/${fontFileName}.woff")format("woff");font-style: normal;}\r\n`, cb)
                  newFileOnly = fontFileName
               }
            }
         } else {
            console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!');
         }
      }
   })

   return app.gulp.src(`${app.path.srcFldr}`)
   function cb() { }
}
