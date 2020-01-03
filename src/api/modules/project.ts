import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;
const saveProject = (data: any) => {
  return service.post(`${prefix}/config/project/add`, data);
};
const editProject = (data: any) => {
  return service.post(`${prefix}/config/project/update`, data);
};
const getProject = (id: string | number) => {
  return service.get(`${prefix}/config/project/${id}`);
};
const deleteProject = (id: string | number) => {
  return service.post(`${prefix}/config/project/${id}`);
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
 * 系统中添加设备
 * @param data
 */
const addProSystemDevice = (data: any) => {
  return service.post(`${prefix}config/project/system/device/add`, data);
};
/**
 * 区域管理
 */
const getRegionList = (params: any) => {
  return service.get(`${prefix}/config/project/region/list`, { params });
};
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

export {
  saveProject,
  editProject,
  getProject,
  deleteProject,
  saveProjectSystem,
  editProjectSystem,
  getProjectSystem,
  deleteProjectSystem,
  addProSystemDevice,
  getRegionList,
  saveProjectRegion,
  deleteProjectRegion,
  getProjectRegion,
  editProjectRegion
};
