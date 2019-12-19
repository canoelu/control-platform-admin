<!--图例管理-->
<template>
  <div>
    <search-table ref="tblRef" :searchConfig="constant.POINT_SEARCH_CONFIG" :tableColumns="constant.POINT_COLUMN" />
    <add-dialog v-if="dialog.show" @getTblList="getTblList" :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
@Component({
  name: "index",
  components: {
    addDialog
  }
})
export default class extends Vue {
  @Ref() private tblRef: any;
  dialog: any = {
    show: false,
    title: "添加图例"
  };
  get constant() {
    return new Const(this).const;
  }
  addPoint() {
    this.dialog.show = true;
  }
  getTblList() {
    this.tblRef.getList();
  }
  handleClose() {
    this.dialog.show = false;
  }
  edit() {}
  delete() {}
  importPoint() {}
  created() {}
}
</script>

<style scoped lang="scss"></style>
