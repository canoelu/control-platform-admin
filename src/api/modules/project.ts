import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;
const saveProject = (data: any) => {
  return service.post(`${prefix}/config/Project/add`, data);
};
const editProject = (data: any) => {
  return service.post(`${prefix}/config/Project/update`, data);
};
const getProject = (id: string | number) => {
  return service.get(`${prefix}/config/Project/${id}`);
};
const deleteProject = (id: string | number) => {
  return service.post(`${prefix}/config/Project/${id}`);
};
/**
 * 系统管理
 */
/**
 * 新增根节点
 * @param data
 */
const saveProjectSystem = (data: any) => {
  return service.post(`${prefix}/config/project/system/add`, data);
};
const editProjectSystem = (data: any) => {
  return service.post(`${prefix}/config/project/system/update`, data);
};
const getProjectSystem = (id: string | number) => {
  return service.get(`${prefix}/config/project/system/${id}`);
};
const deleteProjectSystem = (id: string | number) => {
  return service.post(`${prefix}/config/project/system/${id}`);
};
/**
 * 区域管理
 */

const saveProjectRegion = (data: any) => {
  return service.post(`${prefix}/config/project/region/add`, data);
};
const editProjectRegion = (data: any) => {
  return service.post(`${prefix}/config/project/region/update`, data);
};
const getProjectRegion = (id: string | number) => {
  return service.get(`${prefix}/config/project/region/${id}`);
};
const deleteProjectRegion = (id: string | number) => {
  return service.post(`${prefix}/config/project/region/${id}`);
};
/**
 * 设备类别
 */
const saveProjectDeviceType = (data: any) => {
  return service.post(`${prefix}/config/project/deviceType/add`, data);
};
const editProjectDeviceType = (data: any) => {
  return service.post(`${prefix}/config/project/deviceType/update`, data);
};
const getProjectDeviceType = (id: string | number) => {
  return service.get(`${prefix}/config/project/deviceType/${id}`);
};
const deleteProjectDeviceType = (id: string | number) => {
  return service.post(`${prefix}/config/project/deviceType/${id}`);
};
/**
 * 点位管理
 */
const saveProjectPoint = (data: any) => {
  return service.post(`${prefix}/config/project/point/add`, data);
};
const editProjectPoint = (data: any) => {
  return service.post(`${prefix}/config/project/point/update`, data);
};
const getProjectPoint = (id: string | number) => {
  return service.get(`${prefix}/config/project/point/${id}`);
};
const deleteProjectPoint = (id: string | number) => {
  return service.post(`${prefix}/config/project/point/${id}`);
};
export {
  saveProject,
  editProject,
  getProject,
  deleteProject,
  saveProjectSystem,
  editProjectSystem,
  getProjectSystem,
  deleteProjectSystem,
  saveProjectRegion,
  deleteProjectRegion,
  getProjectRegion,
  editProjectRegion,
  saveProjectDeviceType,
  editProjectDeviceType,
  getProjectDeviceType,
  deleteProjectDeviceType,
  saveProjectPoint,
  editProjectPoint,
  getProjectPoint,
  deleteProjectPoint,
};
