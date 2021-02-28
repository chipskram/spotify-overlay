const {watch, series, dest} = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

function build() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(dest("dist"));
}

function watcher() {
  watch("src/**/*.ts", {
    ignored: [
      "src/**/*.test.ts",
      "src/**/*.spec.ts"
    ]
  }, series(build))
}

exports.build = build;
exports.watch = watcher;