const fs = require("fs-extra");
const path = require("path");
const routeRoot = path.resolve(__dirname, "./src/router");
const pageRoot = path.resolve(__dirname, "./src/views");
// 无需menu的路由列表
const withoutMenuList = ["login", "home-index"];
// 不需要加入动态路由的列表
const ignoredFileList = [];
const baseModule = require("./src/router/base.ts");
baseModule.forEach(e => {
  ignoredFileList.push(e.name);
});

// 存储路由生成
let modules = [];
let children = [];

const stopWalkReg = /(component|style|scss|const|mixin|images)/gi; // 不需要进行递归的文件、文件夹
// mac系统文件和ts文件不解析
const reg = /\.DS_Store|.ts/i;

const walk = function(callback, path = pageRoot, isChild = false) {
  const files = fs.readdirSync(path); // 返回目录名和文件名的字符串数组
  stopWalkReg.lastIndex = 0;
  if (stopWalkReg.test(path)) return;
  files.forEach(function(file) {
    stopWalkReg.lastIndex = 0;
    if (fs.statSync(path + "/" + file).isFile()) {
      if (!reg.test(file)) {
        callback(path, file.replace(/\.vue$/i, ""));
      }
    } else {
      const wFolder = path + "/" + file;
      if (!reg.test(wFolder)) {
        walk(callback, wFolder); // 判断文件夹，继续递归
      }
    }
  });
};
function getUnit(actualPath, fileName) {
  if (ignoredFileList.indexOf(fileName) > -1) return;

  let routePath = actualPath.replace(pageRoot, "");
  let tName = fileName;

  if (fileName.includes(".")) {
    fileName.split(".").forEach((param, i) => {
      if (param.includes("$")) {
        // 增加非必选参数 param$，比如新增和编辑在同一个页面
        let tj = param.split("$");
        if (i === 0) {
          tName = tj[0];
        } else {
          tName += `/:${tj[0]}?`;
        }
      } else {
        if (i === 0) {
          tName = param;
        } else {
          tName += "/:" + param;
        }
      }
    });
  }
  let pathRes = routePath + "/" + tName;
  // 路由的配置单元模板
  const name = `${(routePath + "-" + fileName)
    .split(".")[0]
    .replace(/\//g, "-")
    .replace(/^-/, "")}`;
  /**
   * @description routeUnit规则
   * @meta withMenu -> withoutMenuList 取反,首屏刷新显示
   * @meta ignoreCollapseMenu 带参数的路由(详情页)不需要关闭菜单
   */
  const routeUnit = `{path: "${pathRes}",
    name: "${name}",
    component: () => import("@/views${routePath}/${fileName}.vue"),
    meta: {
      withMenu: ${withoutMenuList.indexOf(name) < 0},
      ignoreCollapseMenu: ${fileName.indexOf(".") > 0},
    }
  }`;
  return {
    routeUnit: routeUnit,
    name: name,
    pathRes: pathRes,
    routePath: routePath,
    fileName: fileName
  };
}
/**
 * @description 自动集成 @/views 文件夹下的模块
 * @param actualPath 绝对路径
 * @param fileName 文件名，已经去掉.vue后缀
 */
walk((actualPath, fileName) => {
  let { routeUnit, name, pathRes, routePath } = getUnit(actualPath, fileName) || {};
  fs.exists(`${actualPath + "/children"}`, isExist => {
    if (isExist) {
      walk(
        (childActPath, childFileName) => {
          let childUnit = getUnit(childActPath, childFileName).routeUnit || {};
          children.push(childUnit);
        },
        `${actualPath + "/children"}`,
        true
      );
      const unit = `{path: "${pathRes}",name: "${name}",
    component: () => import("@/views${routePath}/${fileName}.vue"),
    meta: {
      withMenu: ${withoutMenuList.indexOf(name) < 0},
      ignoreCollapseMenu: ${fileName.indexOf(".") > 0},
    },
    children:[${children}]
  }`;
      modules.push(unit);
    } else if (ignoredFileList.indexOf(name) < 0) {
      modules.push(routeUnit);
      const insertRes = `export default [
       ${modules}
]`;
      fs.writeFileSync(`${routeRoot}/route-append.ts`, insertRes, {
        encoding: "utf8",
        mode: 438 /* =0666*/,
        flag: "w"
      });
    }
  });
});
