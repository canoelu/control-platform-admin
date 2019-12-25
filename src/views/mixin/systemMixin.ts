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
  get pointArr() {
    return this.metaDataArr.map((item: any) => {
      item.children = item.children.filter((child: any) => child.children.length > 0) || [];
      return item;
    });
  }
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
