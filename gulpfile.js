var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha');

gulp.task('default', () => nodemon({
    script: 'app.js',
    ext: '.js',
    env: {
        PORT: 8000
    },
    ignore: ['./node_modules/**']
}).on('restart', () => {
    console.log('Restarting the node server!')
}));

gulp.task('test', () => {
    gulp.src('test/*.js', {
        read: false
    }).pipe(gulpMocha({
        reporter: 'nyan'
    }))
});