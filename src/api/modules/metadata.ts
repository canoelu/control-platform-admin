import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;
const getMetaDataList = () => {
  return service.get(`${prefix}/config/category/`);
};
const saveMetadata = (data: any) => {
  return service.post(`${prefix}/config/category/add`, data);
};
const editMetadata = (data: any) => {
  return service.post(`${prefix}/config/category/update`, data);
};
const getMetadata = (id: string | number) => {
  return service.get(`${prefix}/config/category/${id}`);
};
const deleteMetadata = (id: string | number) => {
  return service.post(`${prefix}/config/category/${id}`);
};
export { getMetaDataList, saveMetadata, editMetadata, getMetadata, deleteMetadata };
