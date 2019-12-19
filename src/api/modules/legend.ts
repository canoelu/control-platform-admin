import service from "../axios";
const prefix = process.env.VUE_APP_API_VERSION;
const saveLegend = (data: any) => {
  return service.post(`${prefix}/config/Legend/add`, data);
};
const editLegend = (data: any) => {
  return service.post(`${prefix}/config/Legend/update`, data);
};
const getLegend = (id: string | number) => {
  return service.get(`${prefix}/config/Legend/${id}`);
};
const deleteLegend = (id: string | number) => {
  return service.post(`${prefix}/config/Legend/${id}`);
};
export { saveLegend, editLegend, getLegend, deleteLegend };
