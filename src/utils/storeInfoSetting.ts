import { userRoleConfig } from "@/const/user.config";
import router from "@/router";
import VueCookies from "vue-cookies";

/**
 * @description 用于处理不同角色存入不同的值
 */
function filterUser(role: number | string): any {
  let _userItem: any = {};
  for (let key in userRoleConfig) {
    if (userRoleConfig[key].role === role) {
      _userItem = userRoleConfig[key];
      break;
    }
  }
  return _userItem;
}
class StoreInfoSetting {
  public static getRole() {
    let _userInfo = this.getUserInfo() || {};
    return _userInfo.role;
  }
  public static setUserInfo(userInfo: any, role: string | number) {
    let userKey: string = filterUser(role).key;
    localStorage.setItem(userKey, JSON.stringify(userInfo));
    localStorage.setItem(`${userKey}_token`, JSON.stringify(userInfo.token));
  }
  public static getUserInfo(role?: number | string) {
    let query = (<any>router.currentRoute).query || {};
    let sysPlat: string = query.sysPlat || "";
    let _role = role || sysPlat === "admin" ? 1 : 2;
    let userKey: string = filterUser(_role).key;
    return JSON.parse(localStorage.getItem(userKey) || "") || {};
  }

  public static getUserToken(role?: number | string) {
    let _role = this.getRole();
    let userKey: string = filterUser(_role).key;
    return JSON.parse(localStorage.getItem(`${userKey}_token`) || "") || "";
  }
  public static cleanUserToken(role?: number | string) {
    let _role = this.getRole();
    let userKey: string = filterUser(_role).key;
    localStorage.removeItem(userKey);
    localStorage.removeItem(`${userKey}_token`);
    VueCookies.remove("hasLogin");
  }
}
export { StoreInfoSetting };
