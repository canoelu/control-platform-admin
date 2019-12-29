<!--方法配置-->
<template>
  <el-dialog
    class="region-add-dialog"
    :title="dialogObj.title"
    :visible.sync="dialogObj.show"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <search-table
      :data="[{}]"
      ref="groupTbl"
      :showPage="false"
      :searchConfig="constant.METHOD_SEARCH_CONFIG"
      :tableColumns="constant.METHOD_COLUMNS"
    ></search-table>
    <p class="mt-10 mb-10">分组点位方法配置</p>
    <search-table
      :data="[{}]"
      ref="groupTbl"
      :showPage="false"
      :tableColumns="constant.GROUP_POINT_METHOD_COLUMNS"
    ></search-table>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Mixins } from "vue-property-decorator";
import Const from "../const/";
import {} from "@/api/";
@Component({
  name: "index",
  components: {}
})
export default class extends Vue {
  @Prop({ default: () => {} }) private dialogObj: any;
  loading: boolean = false;
  get constant() {
    return new Const(this).const;
  }

  handleClose() {
    this.$emit("handleClose");
  }
  mounted() {}
}
</script>

<style scoped lang="scss"></style>
