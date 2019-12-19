<template>
  <div class="login">
    <div ref="particleGeneratorRef" class="particleGenerator"></div>

    <div class="login-wrapper">
      <div class="login-content">
        <div class="content-left">
          <div class="flexCenter">
            <img src="../../assets/images/logo.png" alt="" class="logo" />
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
@Component({
  name: "loginWrap"
})
export default class LoginWrap extends Vue {
  @Ref() private particleGeneratorRef: any;
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  particlesInit() {
    let getRandomInt = this.getRandomInt;
    let generator = this.particleGeneratorRef;
    let particleCount = 300;
    for (let i = 0; i < particleCount; i++) {
      let size = getRandomInt(2, 6);
      let n =
        '<div class="particle" style="top:' +
        getRandomInt(15, 95) +
        "%; left:" +
        getRandomInt(5, 95) +
        "%; width:" +
        size +
        "px; height:" +
        size +
        "px; animation-delay:" +
        getRandomInt(0, 30) / 10 +
        "s; background-color:rgba(" +
        getRandomInt(80, 160) +
        "," +
        getRandomInt(185, 255) +
        "," +
        getRandomInt(160, 255) +
        "," +
        getRandomInt(2, 8) / 10 +
        ');"></div>';
      var node = document.createElement("div");
      node.innerHTML = n;
      generator.appendChild(node);
    }
  }
  mounted() {
    this.particlesInit();
  }
}
</script>

<style lang="scss">
.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/bg.png");
  background-size: 100% 100%;
  .particleGenerator {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .login-wrapper {
    position: relative;
    width: 30%;
    min-width: 300px;
    max-width: 1024px;
    background: rgba(3, 13, 37, 0.2);
    border-radius: 20px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.5);
    .login-content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 40px 20px;
      width: 100%;
      height: 90%;
    }
    .content-left {
      width: 100%;
      text-align: left;
    }
  }
}
.particle {
  opacity: 0;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-animation: particleAnim 3s ease-in-out infinite;
  animation: particleAnim 3s ease-in-out infinite;
  border-radius: 100%;
}

@keyframes particleAnim {
  0% {
    opacity: 0;
    transform: translateY(-0%);
  }
  25% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-1500%);
  }
}
</style>
