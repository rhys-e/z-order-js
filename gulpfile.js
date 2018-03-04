const gulp = require('gulp');
const gutil = require('gulp-util');
const clean = require('gulp-clean');
const webpack = require('webpack');
 
gulp.task('clean', () => gulp.src('dist').pipe(clean()));

gulp.task('build', ['clean'], (callback) => {
  webpack(require('./webpack.config.js'), (err, stats) => {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({ colors: true }));
    
    callback();
  });
});

gulp.task('default', ['clean', 'build']);
