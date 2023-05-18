import * as nodePath from 'path'; // get project folder name
const rootFldr = nodePath.basename(nodePath.resolve());


const buildFldr = `./dist`;
const srcFldr = `./src`;

export const path = {
   build: {
      html: `${buildFldr}/`,
      scss: `${buildFldr}/css`,
      js: `${buildFldr}/js`,
      files: `${buildFldr}/files/`,
      img: `${buildFldr}/img/`,
      fonts: `${buildFldr}/fonts/`,
   },
   src: {
      html: `${srcFldr}/*.html`,
      scss: `${srcFldr}/scss/style.scss`,
      js: `${srcFldr}/js/app.js`,
      files: `${srcFldr}/files/**/*.*`,
      img: `${srcFldr}/img/**/*.{jpeg,jpg,png,gif,webp}`,
      // doesn't convert background images to WEBP
      imgNoBg: [`${srcFldr}/img/**/*.{jpeg,jpg,png,gif,webp}`,
      `!${srcFldr}/img/background/*.{jpeg,jpg,png,gif,webp}`],
      // doesn't copy svg images that for sprite
      svg: [`${srcFldr}/img/**/*.svg`, `!${srcFldr}/img/svg-icons/*.svg`],
      favicon: `${srcFldr}/img/favicon/*.svg`,
      webmanifest: `${srcFldr}/img/favicon/*.webmanifest`,
      fonts: `${srcFldr}/fonts/*.ttf`,
      spriteSvg: `${srcFldr}/img/svg-icons/*.svg`,
   },
   watch: {
      html: `${srcFldr}/**/*.html`,
      scss: `${srcFldr}/scss/**/*.scss`,
      js: `${srcFldr}/js/**/*.js`,
      files: `${srcFldr}/files/**/*.*`,
      img: `${srcFldr}/img/**/*.{jpeg,jpg,png,gif,webp,ico,svg}`,
      spriteSvg: `${srcFldr}/img/svg-icons/*.svg`,
   },
   clean: buildFldr,
   buildFldr: buildFldr,
   srcFldr: srcFldr,
   rootFldr: rootFldr,
}
