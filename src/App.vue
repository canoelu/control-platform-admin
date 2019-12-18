<template>
  <div id="app">
    <con-layout v-if="$route.meta.withMenu"></con-layout>
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import conLayout from "@/components/layout/index.vue";

@Component({
  components: { conLayout }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
