const shell = require("shelljs");
const watch = require("watch");
const path = require("path");
const fs = require("fs-extra");
const routeRoot = path.resolve(__dirname, "./src/router");
const pageRoot = path.resolve(__dirname, "./src/views");
const apiRoot = path.resolve(__dirname, "./src/api");

// eslint-disable-next-line
watch.watchTree(pageRoot, function(file, curr, prev) {
  if (prev === null || (curr && curr.size === 0)) {
    if (
      Object.values(file)
        .join("")
        .indexOf(".vue") > 0
    ) {
      console.log("ss");
      shell.exec("node ./route-generator.js");
    }
  }
});

// eslint-disable-next-line
fs.watchFile(routeRoot + "/base.ts", function(err, file) {
  shell.exec("node ./route-generator.js");
});
