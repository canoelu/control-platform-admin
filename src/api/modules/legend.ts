import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;
/**
 * 获取状态
 */
const getStatusArr = () => {
  return service.get(`${prefix}/config/devpic/status`);
};
const saveLegend = (data: any) => {
  return service.post(`${prefix}/config/devpic/add`, data);
};
const editLegend = (data: any) => {
  return service.post(`${prefix}/config/devpic/update`, data);
};
const getLegend = (id: string | number) => {
  return service.get(`${prefix}/config/devpic/${id}`);
};
const deleteLegend = (id: string | number) => {
  return service.post(`${prefix}/config/devpic/delete/${id}`);
};
/**
 * 上传图片
 * @param data
 */
const uploadPic = (data: any) => {
  return service.post(`${prefix}/config/devpic/upload`, data);
};
/**
 * 获取替换代码
 */
const getPlaceCode = () => {
  return service.get(`${prefix}/config/devpic/palceCode`);
};
const getLegendCode = (id: string | number) => {
  return service.get(`${prefix}/config/devpic/category/code/${id}`);
};
export { getStatusArr, saveLegend, editLegend, getLegend, deleteLegend, uploadPic, getPlaceCode, getLegendCode };
