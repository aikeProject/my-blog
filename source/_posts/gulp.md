---
title: gulp
categories:
  - 前端
tags:
  - gulp
comments: false
abbrlink: 18978
date: 2019-03-05 20:27:01
---

### gulp
***
####    1、gulp的安装
*   全局方式安装gulp    
    `npm install -g gulp`
*   如果想在安装的时候把gulp写进项目package.json文件的依赖中    
    `npm install --save-dev gulp`
***
####    2、开始使用gulp
*   2.1 建立gulpfile.js文件
*   2.2 运行gulp任务        
    `gulp`
***
####    3、我们将要使用Gulp插件来完成我们以下任务：
*   sass的编译（gulp-ruby-sass）
*    自动添加css前缀（gulp-autoprefixer）
*    压缩css（gulp-minify-css）
*    js代码校验（gulp-jshint）
*   合并js文件（gulp-concat）
*   压缩js代码（gulp-uglify）
*   压缩图片（gulp-imagemin）
*   自动刷新页面（gulp-livereload）
*   图片缓存，只有图片替换了才压缩（gulp-cache）
*   更改提醒（gulp-notify）
*   清除文件（del）     
*   浏览器同步('browser-sync')  

`安装这些插件需要运行如下命令：`
````
npm install gulp-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
````
***
#####   加载插件
```javascript
gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),需要ruby环境，需要生成临时目录和文件
    sass = require('gulp-sass'),// 调用node-sass 有node.js就可以，编译过程不需要生成临时目录和文件
    autoprefixer = require('gulp-autoprefixer'),// 自动添加css前缀
    cssnano = require('gulp-cssnano'),// 
    jshint = require('gulp-jshint'),// 代码检测工具
    uglify = require('gulp-uglify'),// 压缩js代码
    imagemin = require('gulp-imagemin'),// 压缩图片
    rename = require('gulp-rename'),// 重命名
    concat = require('gulp-concat'),// 合并js文件
    notify = require('gulp-notify'),//  更改提醒
    cache = require('gulp-cache'),// 缓存通知  
    livereload = require('gulp-livereload'),
    del = require('del'),// 清除文件
    browserSync = require('browser-sync'); // 浏览器同步
```
***
####    建立任务
>   *   编译sass、自动添加css前缀和压缩
```javascript
//  编译sass、自动添加css前缀和压缩
gulp.task('styles', function () {
  //sass()方法用于转换sass到css
  return gulp.src('src/styles/main.scss')
      .pipe(sass())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4')) // 自动添加css前缀
      .pipe(gulp.dest('dist/assets/css'))   // 处理后文件存放地址
      .pipe(gulp.dest('src/css'))
      .pipe(rename({suffix: '.min'}))   //  重命名
      .pipe(cssnano())  
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(notify({message: 'sass task complete'}));// 更改提醒
});
```
*   `gulp.task()` 
    *   这个API用来创建任务，在命令行下可以输入$ gulp styles来执行上面的任务
*   `gulp.src()`
    *   这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss
*   `.pipe()`
    *   将需要处理的文件导向sass插件
*   `gulp.dest()`
    *   设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本
    
>   *   js代码校验、合并和压缩
```javascript
//  js代码校验、合并和压缩
gulp.task('scripts', function () {
  return gulp.src('src/scripts/**/*.js')
      .pipe(jshint('config.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/assets/js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/js'))
      .pipe(notify({message: 'Scripts task complete'}));
});
```
***
>   *   压缩图片
```
//  压缩图片
gulp.task('images', function () {
  return gulp.src('src/images/**/*')
      .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
      .pipe(gulp.dest('dist/assets/img'))
      .pipe(notify({message: 'Images task complete'}));
});
```
***
>   *   清除文件
```
//  清除文件
gulp.task('clean', function (cb) {
  del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});
```
***
>   *   处理html
```
//  处理html
gulp.task('html', function () {
  return gulp.src('src/index.html')
      .pipe(gulp.dest('dist/assets/'))
      .pipe(notify({message: 'index-html task complete'}));
});
```
***
>   *   设置默认任务（default）
```
// 设置默认任务（default）
gulp.task('default', function () {
    
   //   
  gulp.start('browser-sync', 'styles', 'scripts', 'images', 'html');

  // Watch .scss files
  gulp.watch('src/styles/!**!/!*.scss', ['styles']);
  // Watch .js files
  gulp.watch('src/scripts/!**!/!*.js', ['scripts']);
  // Watch image files
  gulp.watch('src/images/!**!/!*', ['images']);
  //  watch  html files
  gulp.watch('src/index.html', ['html']);

});
```
***


