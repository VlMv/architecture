import gulp from 'gulp';

// pathes import
import { path } from './gulp/config/path.js';

// common plugins import
import { plugins } from './gulp/config/plugins.js';

// global pathes
global.app = {
   buildSet: process.argv.includes('--build'),
   devSet: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins,
}

// tasks import
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { imgRetina, img, favicon } from './gulp/tasks/img.js';
import { fonts, fontScss } from './gulp/tasks/fonts.js';
import { spriteSvg } from './gulp/tasks/svg.js';
import { zip } from './gulp/tasks/zip.js';

// file changes watcher
function watcher() {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.img, imgRetina);
   gulp.watch(path.watch.img, img);
   gulp.watch(path.watch.img, favicon);
   gulp.watch(path.watch.spriteSvg, spriteSvg);
}

const font = gulp.series(fonts, fontScss);
const images = gulp.series(imgRetina, img, spriteSvg, favicon);
const mainTasks = gulp.series(font, gulp.parallel(copy, html, scss, js, images));

// dev assembly
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// build assembly
const build = gulp.series(reset, mainTasks);

// zip assembly
const createZip = gulp.series(reset, mainTasks, zip);

export { spriteSvg }; // run svg sprite
export { createZip }; // npm run zip
export { dev }; // npm run dev
export { build }; // npm run build

// default task
gulp.task('default', dev);

