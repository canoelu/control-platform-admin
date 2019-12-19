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
export { saveProject, editProject, getProject, deleteProject };
