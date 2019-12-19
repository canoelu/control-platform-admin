import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;
const saveMethod = (data: any) => {
  return service.post(`${prefix}/config/Method/add`, data);
};
const editMethod = (data: any) => {
  return service.post(`${prefix}/config/Method/update`, data);
};
const getMethod = (id: string | number) => {
  return service.get(`${prefix}/config/Method/${id}`);
};
const deleteMethod = (id: string | number) => {
  return service.post(`${prefix}/config/Method/${id}`);
};
export { saveMethod, editMethod, getMethod, deleteMethod };
