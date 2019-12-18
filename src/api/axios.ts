import axios from "axios";
import router from "@/router";
import { Message } from "element-ui";
import { StoreInfoSetting } from "@/utils/storeInfoSetting";
import store from "@/store";
let msgObj: any = null;

const baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
// 线上使用固定ip
const service: any = axios.create({
  baseURL,
  timeout: 45000 // 请求超时时间
});
// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    if (config.url.indexOf("login") === -1) {
      // let token: string = StoreInfoSetting.getUserToken();
      // config.headers["token"] = token;
    }
    return config;
  },
  (error: any) => {
    // 发送失败
    console.error(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const { code, msg } = response.data;
    if (code === undefined) {
      return response.data;
    } else {
      switch (code) {
        case "000000":
          return response.data;
        case "010028":
          return response.data;
        case 401:
          router.push("/");
          break;
        default:
          msgObj && msgObj.close();
          msgObj = Message.error({
            message: msg
          });
          return Promise.reject(response.data || response.payload);
      }
    }
  },
  (error: any) => {
    console.log(error);
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = error.response.data.msg;
          break;
        case 401:
          error.message = "访问权限不足，请联系管理员";
          break;
        case 403:
          error.message = "您的账号登录已过期，或已在其他设备登录";
          !error.response.config.url.includes("auth/forceLogout") && store.dispatch("user/setLogout", false);
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    if (error.code) {
      msgObj && msgObj.close();
      msgObj = Message.error("网络加载失败，请刷新页面");
    } else {
      msgObj && msgObj.close();
      msgObj = Message.warning(error.message);
    }
    return Promise.reject(error.data || error.payload);
  }
);

export default service;
