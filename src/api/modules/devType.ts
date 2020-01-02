import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;

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
 * 子设备类别
 */
const saveGroupDevType = (data: any) => {
  return service.post(`${prefix}/config/project/devGroup/add`, data);
};
const editGroupDevType = (data: any) => {
  return service.post(`${prefix}/config/project/devGroup/update`, data);
};
const deleteGroupDevType = (id: string | number) => {
  return service.post(`${prefix}/config/project/devGroup/${id}`);
};
const getPicList = () => {
  return service.get(`${prefix}/config/project/devGroup/group/pic`);
};
const getGroupDevType = (id: string | number) => {
  return service.get(`${prefix}/config/project/devGroup/${id}`);
};
/**
 * 获取设备类别已经绑定的方法列表
 * @param params
 */
const getDevTypeBindFuncList = (params: any) => {
  return service.get(`${prefix}/config/project/devTypeFunc/list`, { params });
};
const addDevTypeFunc = (data: any) => {
  return service.post(`${prefix}/config/project/devTypeFunc/bind`, data);
};
const editDevTypeFunc = (data: any) => {
  return service.post(`${prefix}/config/project/devTypeFunc/update`, data);
};
const getDevTypeFunc = (id: number | string) => {
  return service.get(`${prefix}/config/project/devTypeFunc/${id}`);
};
const deleteDevTypeFunc = (id: any | string) => {
  return service.post(`${prefix}/config/project/devTypeFunc/${id}`);
};
/**
 * 展示配置
 */
const getPointGroupList = (params: any) => {
  return service.get(`${prefix}/config/project/pointGroup/list`, { params });
};
const addPointGroup = (data: any) => {
  return service.post(`${prefix}/config/project/pointGroup/add`, data);
};
const editPointGroup = (data: any) => {
  return service.post(`${prefix}/config/project/pointGroup/update`, data);
};
const getPointGroupById = (id: number | string) => {
  return service.get(`${prefix}/config/project/pointGroup/${id}`);
};
const deletePointGroup = (id: any | string) => {
  return service.post(`${prefix}/config/project/pointGroup/${id}`);
};
/**
 * 获取样式分组
 */
const getPointGroupStyles = () => {
  return service.get(`${prefix}/config/project/pointGroup/styles`);
};
/**
 * 解绑分组与点位字典关系
 * @param id
 */
const unBindPointAndMetadata = (id: number | string) => {
  return service.post(`${prefix}/config/project/pointGroup/unbind/${id}`);
};
/**
 * 给点位分组添加点位类型
 * @param data
 */
const addGroupPointType = (data: any) => {
  return service.post(`${prefix}/config/project/pointGroup/addPointType`, data);
};

export {
  getProjectDevTypeList,
  saveProjectDevType,
  editProjectDevType,
  getProjectDevType,
  deleteProjectDevType,
  saveGroupDevType,
  editGroupDevType,
  deleteGroupDevType,
  getPicList,
  getGroupDevType,
  getDevTypeBindFuncList,
  addDevTypeFunc,
  editDevTypeFunc,
  getDevTypeFunc,
  deleteDevTypeFunc,
  getPointGroupList,
  getPointGroupById,
  addPointGroup,
  editPointGroup,
  deletePointGroup,
  getPointGroupStyles,
  unBindPointAndMetadata,
  addGroupPointType
};
