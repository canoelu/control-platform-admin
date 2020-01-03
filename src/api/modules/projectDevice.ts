import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;

/**
 * 设备管理
 */
const saveProjectDevice = (data: any) => {
  return service.post(`${prefix}/config/project/device/add`, data);
};
const editProjectDevice = (data: any) => {
  return service.post(`${prefix}/config/project/device/update`, data);
};
const getProjectDevice = (id: string | number) => {
  return service.get(`${prefix}/config/project/device/${id}`);
};
const deleteProjectDevice = (id: string | number) => {
  return service.post(`${prefix}/config/project/device/${id}`);
};
const addSubDevice = (data: any) => {
  return service.post(`${prefix}/config/project/device/sub/add`, data);
};
/**
 * 绑定点位
 * @param data
 */
const bindDevicePoint = (data: any) => {
  return service.post(`${prefix}/config/project/device/sub/bind`, data);
};
const getSubDeviceTypeList = (params: any) => {
  return service.get(`${prefix}/config/project/device/sub/list`, { params });
};
export {
  saveProjectDevice,
  editProjectDevice,
  getProjectDevice,
  deleteProjectDevice,
  getSubDeviceTypeList,
  bindDevicePoint,
  addSubDevice
};
