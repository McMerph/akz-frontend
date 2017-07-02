//TODO При многократном выполнении gulp сбрасываются иконки на странице
//TODO Создать и внедрить в проект удаление фавиконов с distribution и слежение за ними?
//TODO Генерировать поддающиеся дебагу css sourcemaps?
//TODO Уменьшить размер js? Сейчас в нём сохраняются комментарии и он не инлайн. Но если применить gulpMinify, то sourceMaps ломаются
//TODO Внедрить js и css в html?
//TODO организовать liveReload?
import fs from "fs";
import del from "del";
import gulp from "gulp";
import gulpWatch from "gulp-watch";
import gulpNodemon from "gulp-nodemon";
import gulpImagemin from "gulp-imagemin";
import gulpRigger from "gulp-rigger";
import gulpCleanCSS from "gulp-clean-css";
import gulpSourcemaps from "gulp-sourcemaps";
import gulpMinify from "gulp-minify";
import gulpRename from "gulp-rename";
import gulpConnect from "gulp-connect";
import gulpLess from "gulp-less";
import gulpUtil from "gulp-util";
import imageminPngquant from "imagemin-pngquant";
import browserify from "browserify";
import watchify from "watchify";
import tsify from "tsify";
import vinylSourceStream from "vinyl-source-stream";
import vinylBuffer from "vinyl-buffer";

const SOURCES_PATH_PREFIX = "src/";
const SOURCE_PATHS = {
    html: SOURCES_PATH_PREFIX + "html/",
    favicons: SOURCES_PATH_PREFIX + "favicons/",
    css: SOURCES_PATH_PREFIX + "styles/css/",
    ts: SOURCES_PATH_PREFIX + "ts/",
    js: SOURCES_PATH_PREFIX + "js/",
    fonts: SOURCES_PATH_PREFIX + "fonts/"
};

const DISTRIBUTION_PATH_PREFIX = "dist/";
const DISTRIBUTION_PATHS = {
    root: DISTRIBUTION_PATH_PREFIX,
    css: DISTRIBUTION_PATH_PREFIX + "css/",
    js: DISTRIBUTION_PATH_PREFIX + "js/",
    fonts: DISTRIBUTION_PATH_PREFIX + "fonts/"
};

function logDelete(paths) {
    paths.forEach(path => gulpUtil.log(`Deleted: ${path}`));
}

export function clean() {
    return del(DISTRIBUTION_PATHS.root).then(logDelete);
}

export function cleanHtml() {
    return del(`${DISTRIBUTION_PATHS.root}*.html`).then(logDelete);
}
export function updateHtml() {
    return cleanHtml().then(() => new Promise(function(resolve, reject) {
        gulp.src(`${SOURCE_PATHS.html}*.html`)
            .pipe(gulp.dest(DISTRIBUTION_PATHS.root))
            .on("end", () => {
                gulpUtil.log(`HTML updated`);
                resolve();
            });
    }));
}

export function updateFavicons() {
    return new Promise(function(resolve, reject) {
        gulp.src(`${SOURCE_PATHS.favicons}**`)
            .pipe(gulp.dest(DISTRIBUTION_PATHS.root))
            .on("end", () => {
                gulpUtil.log(`Favicons updated`);
                resolve();
            });
    });
}

export function cleanFonts() {
    return del(`${DISTRIBUTION_PATHS.fonts}*.*`).then(logDelete);
}
export function updateFonts() {
    return cleanFonts().then(() => new Promise(function(resolve, reject) {
        gulp.src(`${SOURCE_PATHS.fonts}*.*`)
            .pipe(gulp.dest(DISTRIBUTION_PATHS.fonts))
            .on("end", () => {
                gulpUtil.log(`FONTS updated`);
                resolve();
            });
    }));
}

export function cleanCss() {
    return del(`${DISTRIBUTION_PATHS.css}**`).then(logDelete);
}
export function updateCss() {
    return cleanCss().then(() => new Promise(function(resolve, reject) {
        gulp.src(`${SOURCE_PATHS.css}/main.css`)
            .pipe(gulpRigger())
            .pipe(gulpCleanCSS({
                debug: true
            }, (details) => {
                gulpUtil.log(`CleanCSS - original size of "${details.name}" file is ${details.stats.originalSize} bytes`);
                gulpUtil.log(`CleanCSS - minified size of "${details.name}" file is ${details.stats.minifiedSize} bytes`);
            }))
            .pipe(gulpRename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(DISTRIBUTION_PATHS.css))
            .on("end", () => {
                gulpUtil.log(`CSS updated`);
                resolve();
            });
    }));
}

export function cleanJs() {
    return del(`${DISTRIBUTION_PATHS.js}**`).then(logDelete);
}
export function updateJs() {
    return cleanJs().then(() => new Promise(function(resolve, reject) {
        return browserify({
                basedir: ".",
                debug: true,
                entries: ["src/ts/main.ts"],
                cache: {},
                packageCache: {}
            })
            .plugin(tsify)
            .transform("babelify", {
                presets: ["es2015"],
                extensions: [".ts"]
            })
            .bundle()
            .pipe(vinylSourceStream("main.js"))
            .pipe(vinylBuffer())
            .pipe(gulpSourcemaps.init({
                loadMaps: true
            }))
            .pipe(gulpSourcemaps.write("./"))
            .pipe(gulp.dest(DISTRIBUTION_PATHS.js))
            .on("end", () => {
                gulpUtil.log(`JS updated`);
                resolve();
            });
    }));
};

export function build() {
    return Promise.all([
        updateHtml(),
        updateFavicons(),
        updateCss(),
        updateFonts(),
        updateJs()
    ]);
}

export function server() {
    gulpConnect.server({
        root: DISTRIBUTION_PATHS.root,
        port: 8888,
        // livereload: true,
        debug: true
    });
}

export function watch() {
    return build().then(() => {
        server();

        gulpWatch([`${SOURCE_PATHS.html}*.html`], () => updateHtml());
        gulpWatch([`${SOURCE_PATHS.favicons}**`], () => updateFavicons());
        gulpWatch([`${SOURCE_PATHS.css}**`], () => updateCss());
        gulpWatch([`${SOURCE_PATHS.fonts}*.*`], () => updateFonts());
        gulpWatch([`${SOURCE_PATHS.ts}**`], () => updateJs());
    });
}

gulp.task("default", () => watch());
gulp.task("clean", () => clean());
gulp.task("build", () => build());
gulp.task("watch", () => watch());