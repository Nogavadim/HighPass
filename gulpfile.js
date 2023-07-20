const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
///////////
const gulpIf = require('gulp-if')
const yargs = require('yargs');
const Development = yargs.argv.development;
// const ghPages = require('gulp-gh-pages');

const browserSync = require('browser-sync').create()
//////////
// let isBuild = false;

const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
        .pipe(dest('dist'))
}


const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(gulpIf(!Development, sourcemaps.init()))
        .pipe(gulpIf(!Development, concat('main.css')))
        .pipe(autoprefixer({
            cascade: false

        }))
        .pipe(gulpIf(!Development, cleanCSS({
            level: 2
        })))
        .pipe(gulpIf(!Development, sourcemaps.write()))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())

}

const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(gulpIf(!Development, htmlMin({
            collapseWhitespace: true
        })))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(dest('dist/images'))
}

const scripts = () => {
    return src([
        'src/js/componets/**/*.js',
        'src/js/main.js',
    ])
        .pipe(gulpIf(!Development, sourcemaps.init()))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulpIf(!Development, concat('app.js')))
        .pipe(uglify().on('error', notify.onError()))
        // .pipe(uglify({
        //     toplevel: true
        // }).on('error', notify.onError()))
        .pipe(gulpIf(!Development, sourcemaps.write()))
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}


const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

const images = () => {
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.png',
        'src/images/*.svg',
        'src/images/**/*.jpeg',
    ])
        .pipe(image())
        .pipe(dest('dist/images'))
}



watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)



exports.styles = styles
exports.htmlMinify = htmlMinify
exports.scripts = scripts

exports.build = series(clean, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles) //Продакшен

//Команда "gulp build --development" - обирает Дев версию
