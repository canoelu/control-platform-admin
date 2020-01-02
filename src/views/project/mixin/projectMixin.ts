import { Component, Vue, Prop } from "vue-property-decorator";
import { getRegionList, getProjectDevTypeList, getMethodList } from "@/api/";
@Component({
  inheritAttrs: false,
  components: {}
})
export default class projectMixin extends Vue {
  regionArr: any[] = [];
  deviceTypeList: any[] = [];
  methodList: any[] = [];
  get orgId(): string {
    return <any>this.$route.query.orgId;
  }
  get searchParams() {
    return {
      orgId: this.orgId
    };
  }
  get regionList() {
    return this.regionArr;
  }
  async getMethodList(params: any) {
    let res = await getMethodList(params);
    this.methodList = res.data.list;
    return this;
  }
  async loadRegion(params: any) {
    let res = await getRegionList({
      orgId: this.orgId,
      ...params
    });
    this.regionArr = res.data.list;
    return res;
  }
  async loadDeviceType(params: any) {
    let res = await getProjectDevTypeList(params);
    this.deviceTypeList = res.data.list;
    return res;
  }
}
