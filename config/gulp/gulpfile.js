var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({pattern: ['*']});
var webpack = require('webpack');
var merge = require('webpack-merge');

gulp.task('browser-sync', function() {
    return plugins.browserSync.init({
        server: {
            baseDir: '../../dist/'
        },
        port: 2333,
        startPath: 'index.html',
        open: false
    });
});
gulp.task('webpack', function(callback) {
    webpack(require('../webpack/webpack.config'), function(err, stat) {
        // console.log(err, stat);
        console.log(1);
        process.stdout.write(stat.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');
        callback();
    });
    // console.log(1);
});
gulp.task('default', function(callback) {
    plugins.runSequence('webpack', 'browser-sync', callback);
});
