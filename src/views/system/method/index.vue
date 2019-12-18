<!--图例管理-->
<template>
  <div>
    <search-table
      :searchConfig="constant.METHOD_SEARCH_CONFIG"
      :tableColumns="constant.METHOD_SEARCH_CONFIG"
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
    title: "添加方法"
  };
  get constant() {
    return new Const(this).const;
  }
  addMethod() {
    this.dialog.show = true;
  }
  edit() {}
  delete() {}
  created() {}
}
</script>

<style scoped lang="scss"></style>
