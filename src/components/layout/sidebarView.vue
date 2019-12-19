<!--侧边栏-->
<template>
  <div class="aside-container">
    <div class="aside-content" width="220">
      <div class="logo">
        <img src="../../assets/images/logo.png" />
      </div>
      <!--menu-->
      <el-menu :default-openeds="['0']" background-color="#22337b" text-color="#C6DDFF" :unique-opened="true">
        <el-submenu :index="`${idx}`" v-for="(item, idx) in menuList" :key="item.path">
          <template slot="title"><i :class="[item.icon, 'menu-icon']"></i>{{ item.name }}</template>
          <el-menu-item-group>
            <el-menu-item
              :index="`${idx}-${index}`"
              v-for="(sub, index) in item.children"
              :key="index"
              @click="changeMenu(sub)"
            >
              <router-link :to="sub.path" tag="div">
                <i :class="[sub.icon, 'menu-icon']"></i>
                {{ sub.name }}
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="opt"></div>
    <img class="sidebar-bg" src="../../assets/images/sidebar.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { menuList } from "@/const/menu.config";
import { Action } from "vuex-class";
@Component({
  name: "sidebar",
  components: {}
})
export default class Sidebar extends Vue {
  @Action("setPageLock", { namespace: "app" })
  setPageLock: any;
  @Action("setPageName", { namespace: "app" })
  setPageName: any;
  menuList: Array<any> = menuList;
  lockPage() {
    this.setPageLock(true);
  }
  changeMenu(sub: any) {
    this.setPageName(sub.name);
  }
}
</script>

<style scoped lang="scss">
.aside-container {
  position: relative;
  height: 100vh;
  background: rgba(8, 9, 32, 0.94);
  .aside-content {
    position: relative;
    height: 72vh;
    opacity: 0.95;
    z-index: 3;
    overflow-x: hidden;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: px2rem(15) 0 px2rem(30) 0;
      img {
        width: px2rem(99);
        height: px2rem(128);
      }
    }
    .el-submenu__title {
      color: #fff;
    }
    .el-menu {
      width: 100%;
      color: #fff;
      background: linear-gradient(
        225deg,
        rgba(108, 151, 255, 0.2) 0%,
        rgba(58, 116, 255, 0.1) 100%,
        rgba(0, 73, 250, 1) 100%
      );
    }
    .el-menu-item {
      padding-left: 50px !important;
    }
  }
  .opt {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(180deg, rgba(25, 31, 96, 1) 0%, rgba(8, 9, 32, 0.95) 100%);
    opacity: 0.9;
    height: 100%;
    z-index: 2;
  }
  .menu-icon {
    color: #c6ddff;
    margin-right: 15px;
  }
  .sidebar-bg {
    position: absolute;
    bottom: 0;
    opacity: 0.7;
    z-index: 1;
    width: 12vw;
    height: px2rem(624);
  }
}
</style>
