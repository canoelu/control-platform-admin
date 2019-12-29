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
/**
 * 设备类别
 */
const getProjectDevTypeList = (params: any) => {
  return service.get(`${prefix}/config/project/devType/list`, { params });
};
const saveProjectDevType = (data: any) => {
  return service.post(`${prefix}/config/project/devType/add`, data);
};
const editProjectDevType = (data: any) => {
  return service.post(`${prefix}/config/project/devType/update`, data);
};
const getProjectDevType = (id: string | number) => {
  return service.get(`${prefix}/config/project/devType/${id}`);
};
const deleteProjectDevType = (id: string | number) => {
  return service.post(`${prefix}/config/project/devType/${id}`);
};
/**
 * 点位管理
 */
const saveProjectPoints = (data: any) => {
  return service.post(`${prefix}/config/project/points/add`, data);
};
const editProjectPoints = (data: any) => {
  return service.post(`${prefix}/config/project/points/update`, data);
};
const getProjectPoints = (id: string | number) => {
  return service.get(`${prefix}/config/project/points/${id}`);
};
const deleteProjectPoints = (id: string | number) => {
  return service.post(`${prefix}/config/project/points/${id}`);
};
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

export {
  saveProject,
  editProject,
  getProject,
  deleteProject,
  saveProjectSystem,
  editProjectSystem,
  getProjectSystem,
  deleteProjectSystem,
  getRegionList,
  saveProjectRegion,
  deleteProjectRegion,
  getProjectRegion,
  editProjectRegion,
  getProjectDevTypeList,
  saveProjectDevType,
  editProjectDevType,
  getProjectDevType,
  deleteProjectDevType,
  saveProjectPoints,
  editProjectPoints,
  getProjectPoints,
  deleteProjectPoints,
  saveProjectDevice,
  editProjectDevice,
  getProjectDevice,
  deleteProjectDevice
};
