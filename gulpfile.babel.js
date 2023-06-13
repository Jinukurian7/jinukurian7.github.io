import gulp from "gulp";
import concat from "gulp-concat";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import uglify from "gulp-uglify";
import sourcemaps from "gulp-sourcemaps";
const sass = gulpSass(dartSass);
import babel from "gulp-babel";
import pug from "gulp-pug";
import imagemin from "gulp-imagemin";
import del from "del";
import browserSync from "browser-sync";

const reload = browserSync.reload;

// Build Directories
// ----
const dirs = {
  src: "src",
  dest: "dist/",
};

const paths = {
  styles: {
    src: `${dirs.src}/styles/*.scss`,
    dest: `${dirs.src}/css/`,
  },
  scripts: {
    src: `${dirs.src}/lib/**/*.js`,
    dest: `${dirs.src}/js/`,
  },
  views: {
    src: `${dirs.src}/views/**/*.pug`,
    dest: `${dirs.src}/`,
  },
  images: {
    src: `${dirs.src}/images/*`,
    dest: `${dirs.dest}/images`,
  },
};

// Styles
gulp.task("buildStyles", () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(reload({ stream: true }));
});

// Scripts
gulp.task("buildScripts", () => {
  return gulp
    .src([paths.scripts.src, "!src/lib/vendors/**"])
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(babel())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(reload({ stream: true }));
});

// Vendor Scripts
gulp.task("buildVendorScripts", () => {
  return gulp
    .src(["src/lib/vendors/**"])
    .pipe(babel())
    .pipe(concat("vendors.min.js"))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(reload({ stream: true }));
});

// Views
gulp.task("buildViews", () => {
  return gulp
    .src(paths.views.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.views.dest))
    .pipe(reload({ stream: true }));
});

// Images
gulp.task("buildImages", () => {
  return gulp.src(paths.images.src).pipe(imagemin()).pipe(gulp.dest(paths.images.dest));
});

gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: "./src/",
    },
  });
});

gulp.task("watch", () => {
  gulp.watch(paths.styles.src, gulp.series("buildStyles"));
  gulp.watch(paths.scripts.src, gulp.series("buildScripts"));
  gulp.watch(paths.scripts.src, gulp.series("buildVendorScripts"));
  gulp.watch(paths.views.src, gulp.series("buildViews"));
});

gulp.task("default", gulp.parallel("buildStyles", "buildScripts", "buildVendorScripts", "buildViews", "browser-sync", "watch"));

gulp.task("build", (done) => {
  console.log("CLEARING BUILD FOLDER");
  return del([dirs.dest]).then(() => {
    gulp
      .src(paths.scripts.dest + "*.js")
      .pipe(uglify())
      .pipe(gulp.dest(dirs.dest + "js/"))
      .on("end", () => {
        console.log("SCRIPT COPIED TO BUILD FOLDER");
      });
    gulp
      .src(paths.styles.dest + "*.css")
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(gulp.dest(dirs.dest + "css/"))
      .on("end", () => {
        console.log("STYLES COPIED TO BUILD FOLDER");
      });
    gulp
      .src(paths.images.src)
      .pipe(gulp.dest(dirs.dest + "images/"))
      .on("end", () => {
        console.log("IMAGES COPIED TO BUILD FOLDER");
      });
    gulp
      .src("src/fonts/**")
      .pipe(gulp.dest(dirs.dest + "fonts/"))
      .on("end", () => {
        console.log("FONTS COPIED TO BUILD FOLDER");
      });
    gulp
      .src("src/*.html")
      .pipe(gulp.dest(dirs.dest + "./"))
      .on("end", () => {
        console.log("TEMPLATES COPIED TO BUILD");
      });
    gulp
      .src("src/*.php")
      .pipe(gulp.dest(dirs.dest + "./"))
      .on("end", () => {
        console.log("PHP FILES COPIED TO BUILD");
      });
    gulp
      .src("src/files/*")
      .pipe(gulp.dest(dirs.dest + "files/"))
      .on("end", () => {
        console.log("FILES COPIED TO BUILD");
      });
  });
});
