import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;

/**
 * 点位管理
 */
const getProjectPointList = (data: any) => {
  return service.get(`${prefix}/config/project/points/`, data);
};
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

export { getProjectPointList, saveProjectPoints, editProjectPoints, getProjectPoints, deleteProjectPoints };
