import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;
const saveMethod = (data: any) => {
  return service.post(`${prefix}/config/func/add`, data);
};
const editMethod = (data: any) => {
  return service.post(`${prefix}/config/func/update`, data);
};
const getMethod = (id: string | number) => {
  return service.get(`${prefix}/config/func/${id}`);
};
const deleteMethod = (id: string | number) => {
  return service.post(`${prefix}/config/func/${id}`);
};
export { saveMethod, editMethod, getMethod, deleteMethod };
