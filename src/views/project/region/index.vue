<!--区域管理-->
<template>
  <div>
    <search-table
      :searchConfig="constant.REGION_SEARCH_CONFIG"
      :tableColumns="constant.REGION_COLUMN"
    />
    <add-dialog></add-dialog>
  </div>
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
    title: "添加图例"
  };
  get constant() {
    return new Const(this).const;
  }
  addPoint() {
    this.dialog.show = true;
  }
  add() {}
  edit() {}
  delete() {}
  addChildRegion() {}
  down() {}
  up() {}
  created() {}
}
</script>

<style scoped lang="scss"></style>
