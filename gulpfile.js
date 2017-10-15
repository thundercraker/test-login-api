var gulp = require('gulp');
var jslint = require('gulp-jslint');

gulp.task('lint', function () {
    return gulp.src(['./src/*.js'])
            .pipe(jslint({}))
            .pipe(jslint.reporter( 'default' ));
});

gulp.task('default', ['lint'])