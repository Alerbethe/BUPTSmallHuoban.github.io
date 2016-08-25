var gulp = require('gulp');
var rev = require('gulp-rev');      //为每个文件添加版本号
var revReplace = require('gulp-rev-replace');       //更新文件的引用
var useref = require('gulp-useref');        //在index.html中写注释，告知如何生成合并的压缩文件
var filter = require('gulp-filter');        //过滤器，筛选文件，处理后并恢复
var uglify = require('gulp-uglify');        //压缩js代码
var csso = require('gulp-csso');            //压缩css代码


gulp.task('default',function () {
    var jsFilter = filter('**/*.js',{restore:true});
    var cssFilter = filter('**/*.css',{restore:true});
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});
