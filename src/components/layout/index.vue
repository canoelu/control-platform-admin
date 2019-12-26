<template>
  <el-container>
    <el-aside width="220px">
      <sidebar-view></sidebar-view>
    </el-aside>
    <el-main class="main-container">
      <header-view />
      <section class="container">
        <router-view />
      </section>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import sidebarView from "./sidebarView.vue";
import headerView from "./headerView.vue";
@Component({
  name: "layout",
  components: { sidebarView, headerView }
})
export default class App extends Vue {}
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100vh;
  width: 100%;
  background: #eef1ff;
  .container {
    margin: 20px;
    flex: 1;
  }
}
</style>
