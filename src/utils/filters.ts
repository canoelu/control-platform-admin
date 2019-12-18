import Vue from "vue";
const FILTERS: any = {};
Object.keys(FILTERS).forEach(name => {
  Vue.filter(name, FILTERS[name]);
});
