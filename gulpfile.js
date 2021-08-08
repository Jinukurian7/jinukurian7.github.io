const gulp = require('gulp');
var deploy = require('gh-pages');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const streamqueue = require("streamqueue");
const uglify = require("gulp-uglify");
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const realFavicon = require('gulp-real-favicon');
const del = require('del');
const browserSync = require("browser-sync").create();

const paths = {
    src: '/',
    dest: '/',
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'src/css/',
    },
    scripts: {
        src: 'src/lib/**/*.js',
        dest: 'src/js/',
    },
    html: {
        src: 'src/templates/**/*.pug',
        dest: 'src/',
    },
    image: {
        src: 'src/images/',
        dest: 'src/images/icons/',
    },
};

const sassOpts = {
    outputStyle: 'expanded',
    errLogToConsole: true
};

// SCSS styles task
gulp.task('styles', (done) => {
    return gulp.src(paths.styles.src)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts))
        .pipe(postcss([autoprefixer()]))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
});

// JS scripts concat and minify task
gulp.task('scripts', (done) => {
    gulp.src(['src/lib/**/*.js', '!src/lib/vendors/**'])
    .pipe(plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(concat('main.min.js'))
    .pipe(babel({
        presets: [
          ['@babel/env', {
            modules: false
          }]
        ]
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));

  // Copy vendor files
    return streamqueue({ objectMode: true },
        gulp.src('src/lib/vendors/jquery.min.js'),
        gulp.src('src/lib/vendors/modernizr.js'),
        gulp.src('src/lib/vendors/gsap.min.js'),
        gulp.src('src/lib/vendors/ScrollTrigger.min.js')
        )
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('vendors.min.js'))
        .pipe(babel({
            presets: [
              ['@babel/env', {
                modules: false
              }]
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest));
});

// pug
gulp.task('pug', () => {
    return gulp.src(paths.html.src)
    .pipe(pug({
        pretty: true
    }))
    .on('error', notify.onError(function(error){
        return "Message to the notifier: " + error.message;
    }))
    .pipe(gulp.dest(paths.html.dest));
});

// Reload task 
gulp.task('bs-reload', () => {
    browserSync.reload();
});

// Browser sync task 
gulp.task('browser-sync', (done) => {
    const files = [
    paths.styles.dest,
    paths.scripts.dest,
    paths.html.dest
    ];
    browserSync.init(files, {
        server: {
            baseDir: './src/',
            injectChanges: true
        }
    });
    done();
});

// Watch task
gulp.task('watch', () => {
    gulp.watch(paths.styles.src, gulp.series('styles')),
    gulp.watch(paths.scripts.src, gulp.series('scripts')),
    gulp.watch(paths.html.src, gulp.series('pug'));
});

// Default task
gulp.task("default",gulp.series('styles','scripts','pug', gulp.parallel('watch', 'browser-sync')));

// Build task
gulp.task('build', (done) => {
    var prefix = 'dist/' ;
    console.log("CLEARING BUILD FOLDER");
    return del([ prefix ])
    .then(() => {
        gulp.src(paths.scripts.dest+"*.js")
        .pipe(gulp.dest(prefix+("js/")))
        .on('end', () => {
            console.log("SCRIPT COPIED TO BUILD FOLDER");
        });       
        gulp.src(paths.styles.dest+"*.css")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(prefix+("css/")))
        .on('end', () => {
            console.log("STYLES COPIED TO BUILD FOLDER");
        });
        gulp.src("src/images/**")
        .pipe(gulp.dest(prefix+("images/")))
        .on('end', () => {
            console.log("IMAGES COPIED TO BUILD FOLDER");
        });
        gulp.src("src/fonts/**")
        .pipe(gulp.dest(prefix+("fonts/")))
        .on('end', () => {
            console.log("FONTS COPIED TO BUILD FOLDER");
        });
        gulp.src("src/*.html")
        .pipe(gulp.dest(prefix+("./")))
        .on('end', () => {
            console.log("TEMPLATES COPIED TO BUILD");
        });
        gulp.src("src/*.php")
        .pipe(gulp.dest(prefix+("./")))
        .on('end', () => {
            console.log("PHP FILES COPIED TO BUILD");
        });
        gulp.src("src/files/*")
        .pipe(gulp.dest(prefix+("files/")))
        .on('end', () => {
            console.log("FILES COPIED TO BUILD");
        });
    })    
})


// favicon

var FAVICON_DATA_FILE = 'favicon.json';

const project_folder = "dist";  //require("path").basename(__dirname)

gulp.task('favicon', (done) => { // setting create favicons
  realFavicon.generateFavicon({
    masterPicture: paths.image.src + '/favicon.png',
    dest: paths.image.dest,
    iconsPath: 'images/icons/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '14%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {
        design: 'raw'
      },
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#2f675c',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
});
