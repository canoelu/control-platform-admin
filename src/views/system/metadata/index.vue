<!--子弹管理-->
<template>
  <el-card>
    <search-table :searchConfig="constant.METADATA_SEARCH_CONFIG" :tableColumns="constant.METADATA_COLUMN" />
    <add-dialog :dialogObj="dialog" @handleClose="handleClose"></add-dialog>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Const from "./const/";
import addDialog from "./components/addDialog.vue";
@Component({
  name: "index",
  components: {
    addDialog
  }
})
export default class extends Vue {
  dialog: any = {
    show: false,
    title: "添加系统"
  };
  get constant() {
    return new Const(this).const;
  }
  addSystem() {
    this.dialog.show = true;
    this.dialog.type = "system";
  }
  addDevice() {
    this.dialog.show = true;
    this.dialog.type = "device";
  }
  addPoint() {
    this.dialog.show = true;
    this.dialog.type = "point";
  }

  handleClose() {
    this.dialog.show = false;
  }
  created() {}
}
</script>

<style scoped lang="scss"></style>
