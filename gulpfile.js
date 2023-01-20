'use strict';
const gulp = require('gulp');
const glob = require("glob");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const literalify = require("literalify");
const typedoc = require("gulp-typedoc");
const eslint = require('gulp-eslint');
const uglifyify = require('@browserify/uglifyify');
const envify = require('@browserify/envify');

const config = {
    src: './src/**/*.ts',
    dst: './build',
    out: 'main.bundle.js',
    doc: './docs',
};

function bundle(debug = false) {
    const entries = glob.sync(config.src, { debug: false, });
    return build(entries, config.out, debug);
}

function build(entries, name, debug = false) {
    const bundle = browserify(entries, { debug: debug })
        .plugin(tsify)
        .transform(literalify.configure({ 'playcanvas': 'window.pc' }, null))
    !debug && bundle.transform(envify).transform(uglifyify, { sourceMap: false });
    return bundle.bundle()
        .pipe(source(name))
        .pipe(gulp.dest(config.dst));
}

function eslintFormat() {
    return gulp.src(config.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function runDocs() {
    const entries = glob.sync(config.src);
    return gulp.src(entries)
        .pipe(typedoc({
            out: config.doc,
            name: 'PlayCanvas Build',
            theme: 'default',
            cleanOutputDir: true,
            readme: 'none',
            hideGenerator: true,
            includeVersion: true,
            mergeModulesMergeMode: 'project'
        }));
}

gulp.task("build:debug", ()=> bundle(true));
gulp.task("build:release", () => bundle(false));
gulp.task('bundle:debug', gulp.series(eslintFormat, () => bundle(true)));
gulp.task("docs", runDocs);
gulp.task("eslint", eslintFormat);
