<template>
  <div>
    <breadcrumb-group :breadGroup="breadGroup" />
    <div class="pro-mange-content">
      <div class="left pro-menu">
        <el-menu>
          <el-menu-item v-for="menu in proMenuList" :key="menu.component" @click="changeProMenu(menu)"
            >{{ menu.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right pro-content">
        <Component class="manage-component" :is="selectMenu.component" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { proMenuList } from "@/const/menu.config";
import systemManage from "./system/index.vue";
import deviceManage from "./device/index.vue";
import pointManage from "./point/index.vue";
import deviceTypeManage from "./deviceType/index.vue";
import areaManage from "./region/index.vue";
@Component({
  name: "proContent",
  components: { systemManage, deviceManage, pointManage, deviceTypeManage, areaManage }
})
export default class extends Vue {
  proMenuList: any = proMenuList;
  curMenu: any = {};
  get breadGroup() {
    let _curProject = JSON.parse(localStorage.getItem("curProject") || "") || {};

    return [
      { label: "项目管理", to: `/project/index` },
      { label: _curProject.name, to: "" }
    ];
  }
  get selectMenu() {
    return this.curMenu;
  }
  changeProMenu(menu: any) {
    console.log(menu);
    this.curMenu = menu;
  }

  created() {
    this.curMenu = this.proMenuList[0];
  }
}
</script>

<style scoped lang="scss">
.pro-mange-content {
  display: flex;
  flex-direction: row;
  .pro-menu {
    margin-right: 20px;
  }
  .pro-content {
    display: flex;
    flex: 1;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    background: #fff;
    border: 1px solid #f5f5f5;
    .manage-component {
      width: 100%;
    }
  }
  .query-table-wrap {
    width: 100%;
  }
}
</style>
