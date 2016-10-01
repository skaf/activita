var gulp = require("gulp"),
    concat = require("gulp-concat"),
    del = require("del"),
    environments = require('gulp-environments'),
    less = require("gulp-less"),
    rename = require("gulp-rename"),
    ngConstant = require("gulp-ng-constant"),
    html2js = require('gulp-html2js'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    uglify = require("gulp-uglify"),
    development = environments.development,
    production = environments.production,
    fendev = environments.make("fendev");


var static_libraries = [ //Libraries that will not change over time
    "node_modules/angular/angular.min.js",
    "node_modules/angular-ui-router/release/angular-ui-router.min.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/papaparse/papaparse.min.js",
    "node_modules/angular-papaparse/dist/js/angular-PapaParse.js"
];

//==================================================//
//                                                  //
//                  Configration                    //
//                                                  //
//==================================================//

//==================================================//
//                      Wipe all                    //
//==================================================//
gulp.task("clean", function() {
    return del(["./dist/index.html", "./dist/**/*", "./tmp"]);
});


gulp.task("copy-fonts", function() {
    return gulp.src(["./node_modules/font-awesome/fonts/**.*"])
        .pipe(gulp.dest("./dist/assets/fonts"));
});

gulp.task("copy-public", function() {
    return gulp.src(["./public/**/*", "./public/**/*"])
        .pipe(gulp.dest("./dist/public"));
});

//==================================================//
//               Copy static files                  //
//==================================================//
gulp.task("copy", ["copy-fonts", "copy-public"], function() {
    return gulp.src(["./app/index.html"])
        .pipe(gulp.dest("./dist"));
});

//==================================================//
//                      LESS                        //
//==================================================//
gulp.task("clean-less", function() {
    return del(["./dist/style.css"]);
});
gulp.task("less", ["clean-less"], function() {
    return gulp.src("./app/styles/_index.less")
        .pipe(less({
            compress: true
        }))
        .pipe(rename("style.css"))
        .pipe(gulp.dest("./dist/assets/"));
});

//==================================================//
//                  JavaScript                      //
//==================================================//
gulp.task("clean-bundle", function() {
    return del(["./dist/script.js"]);
});

gulp.task("bundle-static", function() {
    return gulp.src(static_libraries)
        .pipe(concat("static.js"))
        .pipe(gulp.dest("./tmp/js"));
});

gulp.task("bundle-templates", function() {
    return gulp.src("./app/**/*template.hbs")
        .pipe(html2js("templates.js", {
            adapter: "angular",
            base: "./app",
            name: "APPTemplates"
        }))
        .pipe(gulp.dest("./tmp/js"));
});

gulp.task("bundle-javascript", function() {
    return gulp.src("./app/**/*.js")
        // .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["angular", "es2015"]
        }))
        .on('error', function(err) {
            console.log(err.message);
            console.log(err.codeFrame);
        })
        .pipe(concat("script.js"))
        .pipe(uglify())
        // .pipe(sourcemaps.write("./",{sourceRoot: "./app"}))
        .pipe(gulp.dest("./tmp/js"));
});

gulp.task("bundle-constants", function() {
    var constants = require("./constants.json");
    var env;
    if (production())
        env = constants.production;
    else if (fendev())
        env = constants.fendev;
    else
        env = constants.development;

    return ngConstant({
            constants: env,
            stream: true
        })
        .pipe(rename("constants.js"))
        .pipe(gulp.dest("./tmp/js"));
});

gulp.task('bundle-all', ["bundle-templates", "bundle-javascript"], function() {
    return gulp.src(["./tmp/js/static.js", "./tmp/js/script.js", "./tmp/js/constants.js", "./tmp/js/templates.js"])
        .pipe(concat("script.js"))
        .pipe(gulp.dest("./dist/assets/"));
});

//==================================================//
//                                                  //
//                  Runnable tasks                  //
//                                                  //
//==================================================//

//==================================================//
//                  Runs gulp once                  //
//==================================================//
gulp.task("start", ["bundle-constants", "bundle-static", "bundle-templates", "bundle-javascript"], function() {
    gulp.start("bundle-all", "copy", "less");
})
gulp.task("default", ["clean"], function() {
    gulp.start("start");
});


//==================================================//
//                Runs gulp with a watch            //
//==================================================//
gulp.task("w", ["default"], function() {
    gulp.watch(["./app/**/*.hbs", "./app/**/*.js"], ["bundle-all"]);
    gulp.watch("./app/styles/**/*.less", ["less"]);
});