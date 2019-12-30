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
  getGroupDevType
};
