/**
 * @file Outputs HTML master templates for SFMC, optimized for email.
 * @author Bradley Baysinger
 */
const gulp = require("gulp");
const beautify = require("gulp-beautify");
const strip = require("gulp-strip-comments");
const htmlmin = require("gulp-htmlmin");

function defaultTask(cb) {
  // TODO: Determine what should be the default task, if anything.
  cb();
}

/**
 * Output minified version... Possibly for produciton if we determing that's a good idea.
 * TODO: Code on a single line may break some email clients. Need sort that out.
 */
gulp.task("prod", function () {
  // Minify options.
  const mOpts = {};
  mOpts.collapseWhitespace = true;
  mOpts.minifyCSS = true;
  mOpts.processConditionalComments = true;
  return (
    gulp
      // Find the HTML.
      .src("./*.html")
      // Remove all comments without removing conditionals for Outlook and whatnot.
      .pipe(strip({ safe: true }))
      // Remove all newlines and redunant whitespace.
      .pipe(htmlmin(mOpts))
      // Output to `dist` directory.
      .pipe(gulp.dest("./dist/"))
  );
});

/**
 * Output readable version for the sandbox.
 */
gulp.task("sandbox", function () {
  // Beautify options.
  let bOpts = {};
  bOpts.newline_between_rules = false;
  bOpts.selector_separator_newline = false;
  bOpts.indent_size = 2;
  // Minify options.
  const mOpts = {};
  mOpts.collapseWhitespace = true;
  mOpts.minifyCSS = true;
  mOpts.processConditionalComments = true;
  return (
    gulp
      // Find the HTML.
      .src("./*.html")
      // Remove all comments except Outlook conditionals and other special comments.
      .pipe(strip({ safe: true }))
      // Minify to only remove all newlines and redunant whitespace, which beautify wont do.
      .pipe(htmlmin(mOpts))
      // Make it pretty again.
      .pipe(beautify.html(bOpts))
      // Output to `dist` directory.
      .pipe(gulp.dest("./dist/"))
  );
});

exports.default = defaultTask;
