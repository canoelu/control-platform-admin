import { Component, Vue, Prop } from "vue-property-decorator";
import { getRegionList, getProjectDevTypeList } from "@/api/";
@Component({
  inheritAttrs: false,
  components: {}
})
export default class projectMixin extends Vue {
  regionArr: any[] = [];
  deviceTypeList: any[] = [];
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
