import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { getMetaDataList, getListByTypeId } from "@/api/";
@Component({
  inheritAttrs: false,
  components: {}
})
export default class systemMixin extends Vue {
  metaDataArr: any[] = [];
  systemCategory: any[] = []; // 字典系统
  pointCategory: any[] = []; // 字典点位
  deviceCategory: any[] = []; // 字典设备
  loadingMetaData: boolean = false;

  /**
   * 获取字典
   */
  async getMetaDataList() {
    this.loadingMetaData = true;
    try {
      let res = await getMetaDataList();
      this.metaDataArr = res.data.list;
      this.loadingMetaData = false;
    } catch (e) {
      this.loadingMetaData = false;
    }
  }

  /**
   * 获取字典系统
   */
  async getMetaDataSystem() {
    let res = await getListByTypeId(1);
    this.systemCategory = res.data;
  }

  /**
   * 获取字典设备
   */
  async getMetaDataDevice() {
    let res = await getListByTypeId(2);
    this.deviceCategory = res.data;
  }
  /**
   * 获取字典点位
   */
  async getMetaDataPoint() {
    let res = await getListByTypeId(3);
    this.pointCategory = res.data;
  }
}
