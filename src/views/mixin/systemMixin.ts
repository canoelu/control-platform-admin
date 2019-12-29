import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { getMetaDataList } from "@/api/";
@Component({
  inheritAttrs: false,
  components: {}
})
export default class systemMixin extends Vue {
  metaDataArr: any[] = [];
  loadingMetaData: boolean = false;

  /**
   * 获取字典点位
   */
  get pointArr() {
    return this.metaDataArr.map((item: any) => {
      item.children = item.children.filter((child: any) => child.children.length > 0) || [];
      return item;
    });
  }

  /**
   * 获取字典系统
   */
  get systemCategory() {
    console.log(this.metaDataArr,this.metaDataArr.filter((item: any) => item.categoryTypeId === 1))
    return this.metaDataArr.filter((item: any) => item.categoryTypeId === 1);
  }

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
}
