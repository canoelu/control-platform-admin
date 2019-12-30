<template>
  <div class="pro-content-page">
    <breadcrumb-group :breadGroup="breadGroup" />
    <div class="pro-mange-content">
      <div class="left pro-menu">
        <el-menu active-text-color="#409EFF" default-active="1-0">
          <router-link
            v-for="(menu, idx) in proMenuList"
            :key="menu.component"
            @click="changeProMenu(menu)"
            :to="{
              path: menu.path,
              query: {
                orgId: orgId
              }
            }"
          >
            <el-menu-item :index="`1-${idx}`">{{ menu.name }} </el-menu-item>
          </router-link>
        </el-menu>
      </div>
      <div class="right pro-content">
        <router-view class="manage-component"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";
import { proMenuList } from "@/const/menu.config";
import systemManage from "./content/system/index.vue";
import deviceManage from "./content/device/index.vue";
import pointManage from "./content/point/index.vue";
import deviceTypeManage from "./content/deviceType/index.vue";
import areaManage from "./content/region/index.vue";
import projectMixin from "./mixin/projectMixin";
@Component({
  name: "proContent",
  components: { systemManage, deviceManage, pointManage, deviceTypeManage, areaManage }
})
export default class extends Mixins(projectMixin) {
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
    this.curMenu = menu;
  }

  created() {
    this.curMenu = this.proMenuList[0];
  }
}
</script>

<style scoped lang="scss">
.pro-content-page {
  width: 100%;
  height: 100%;
}
.pro-mange-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
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
