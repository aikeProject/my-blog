(function() {
    'use strict';
    var gulp = require('gulp'),
        less = require('gulp-less'),
        rename = require('gulp-rename'),
        minifycss = require('gulp-minify-css'),
        autoprefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        htmlclean = require('gulp-htmlclean'),
        htmlmin = require('gulp-htmlmin'),
        rev = require('gulp-rev-append'),
        paths = {
            root: './',
            source: './themes/hexo-theme-snippet/source/' //主题下原文件
        };

    /*====================================================
         开发主题
    ====================================================*/

    // CSS预处理
    gulp.task('less-task', function() {
        return gulp.src(paths.source + 'css/less/_style.less')
        .pipe(less())
        .pipe(rename({basename: "style"}))
        .pipe(gulp.dest(paths.source + 'css'))
    });

    // 监听任务-主题开发模式
    gulp.task('dev', function() {
        gulp.watch(paths.source + 'css/less/*.less', gulp.series('less-task'));
    });


    /*====================================================
        部署前代码处理
    ====================================================*/

    // 压缩处理 css
    gulp.task('minify-css', function() {
        return gulp.src('./public/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'Firefox >= 20', 'Opera >= 36', 'ie >= 9', 'Android >= 4.0', ],
            cascade: true, //是否美化格式
            remove: false //是否删除不必要的前缀
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./public'))
    });

    // 压缩处理 js
    gulp.task('minify-js', function() {
        return gulp.src('./public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
    });

    // 压缩处理 html
    gulp.task('minify-html', function() {
        return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
             removeComments: true, //清除HTML注释
             collapseWhitespace: true, //压缩HTML
             minifyJS: true, //压缩页面JS
             minifyCSS: true, //压缩页面CSS
             minifyURLs: true
        }))
        .pipe(gulp.dest('./public'));
    });

    // 添加版本号
    gulp.task('rev', function() {
        return gulp.src('./public/**/*.html')
        .pipe(rev())
        .pipe(gulp.dest('./public'));
    });

    // 部署前代码处理
    gulp.task('default',gulp.series(gulp.parallel('minify-css', 'minify-js'), 'rev', 'minify-html'), function(e){
       console.log("[complete] please execute： hexo d");
    })
})();