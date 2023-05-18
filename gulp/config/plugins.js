import replace from 'gulp-replace'; // search and replace
import plumber from 'gulp-plumber'; // errors handler
import notify from 'gulp-notify'; // screen notifications
import browsersync from 'browser-sync'; // local server
import newer from 'gulp-newer';
import ifPlugin from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps'; // shows original scss/js files source in a browser devtools

// common plagins
export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browsersync,
   newer: newer,
   if: ifPlugin,
   sourcemaps: sourcemaps
}
