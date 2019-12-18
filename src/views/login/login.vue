<template>
  <login-container>
    <el-form @submit.native.prevent :rules="rules" :model="formLogin" ref="ruleForm" class="form">
      <span class="title">四川能投</span>
      <el-form-item prop="username">
        <el-input placeholder="请输入账号" v-model.trim="formLogin.username" maxlength="20">
          <img src="/imgs/login/user.png" slot="prefix" class="icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="请输入密码"
          v-model.trim="formLogin.password"
          v-formatNotTxt="formLogin.password"
          @keypress.native.enter="login"
          :type="pwdVisible ? 'text' : 'password'"
          maxlength="20"
        >
          <img src="/imgs/login/lock.png" slot="prefix" class="icon-lock" />
          <img src="/imgs/login/eye_close.png" slot="suffix" class="icon-eye" @click="showPwd" v-if="!pwdVisible" />
          <img src="/imgs/login/eye_open.png" slot="suffix" class="icon-eye" v-else @click="showPwd" />
        </el-input>
      </el-form-item>
      <el-form-item prop="codeValue">
        <el-input
          placeholder="请输入验证码"
          v-model.trim="formLogin.codeValue"
          v-formatNotTxt="formLogin.codeValue"
          @keypress.native.enter="login"
          maxlength="4"
        >
          <img src="/imgs/login/code.png" slot="prefix" class="icon-code" />
          <img
            :src="codeImg"
            v-if="codeImg"
            slot="suffix"
            title="点击更换验证码"
            class="icon-code-suffix"
            @click="getLoginCode"
          />
        </el-input>
      </el-form-item>
      <el-button type="primary" @click="login" :loading="submitLoading">登录</el-button>
    </el-form>
  </login-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import LoginContainer from "@/components/login-container/index.vue";

interface UserRoleConfigVal {
  key: string;
  value: string;
  routerName: string;
}
interface LoginInfo {
  username: string | (string | null)[];
  password: string;
  codeValue: string;
  codeId?: string;
}
interface Rules {
  username: any;
  password: any;
  codeValue: any;
}
interface LoginSucUserInfo {
  tenantId: number;
  token: string;
  userId: number;
}

@Component({
  components: {
    LoginContainer
  }
})
export default class App extends Vue {
  private pwdVisible: boolean = false;
  private codeImg: string = "";
  // TODO: 还没接口校验
  private hasAccount: boolean = true;
  private submitLoading: boolean = false;
  private loadingCode: boolean = false;
  private role: number | string = 1;
  private rules: Rules = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    codeValue: [{ required: true, message: "请输入验证码", trigger: "blur" }]
  };
  private formLogin: LoginInfo = {
    username: "",
    password: "",
    codeValue: ""
  };

  @Ref() readonly ruleForm: any;

  /**
   * @description 显示密码
   */
  private showPwd() {
    this.pwdVisible = !this.pwdVisible;
  }
  /**
   * @description 获取验证码
   * @description 第一次请求是为了生成图形验证码，第二次请求是获取验证码地址
   */
  private async getLoginCode() {
    this.loadingCode = true;
  }

  /**
   * @description 登录
   */
  // 点击登录按钮
  private login() {
    this.ruleForm.validate((valid: boolean) => {
      if (valid) {
        if (!this.hasAccount) {
          return;
        }
        if (!this.formLogin.codeId) {
          return;
        }
        this._submitLoginApi();
      }
    });
  }
  // 请求登录api
  private async _submitLoginApi() {
    this.submitLoading = true;
    const {
      formLogin: { username, password, codeId, codeValue },
      role
    } = this;
  }
  // 登录成功
  _loginSuccess(data: any) {}

  /**
   * @description 根据不同路径判断不同的值
   */
  created() {
    this.formLogin.username = this.$route.query.username || "";
    this.getLoginCode();
  }
}
</script>
<style lang="scss" scoped>
.login {
  .form {
    padding-left: 8%;
    margin-top: -10px;
  }
}

.title {
  color: rgba(4, 104, 179, 1);
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 25px;
  display: inline-block;
}
.copy {
  font-size: 12px;
  color: #ccc;
}
.icon {
  width: 17px;
  vertical-align: sub;
}
.icon-code-suffix {
  cursor: pointer;
  width: 150px;
  position: relative;
  top: -10px;
  vertical-align: sub;
  font-size: 10px;
}
.icon-code {
  width: 15px;
  vertical-align: sub;
}
.refresh {
  font-size: 10px;
  color: #358bd4;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
}
.icon-lock {
  width: 13px;
  vertical-align: sub;
  height: 18px;
}
.icon-eye {
  width: 14px;
  height: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
.icon-eye:nth-of-type(1) {
  margin-right: 5px;
}
.el-button {
  width: 110px;
  height: 40px;
  margin: 10px 0;
  background: rgba(53, 139, 212, 1);
  box-shadow: 0px 9px 35px 0px rgba(65, 169, 222, 0.36);
  border-radius: 20px;
}
.forget {
  margin-top: 2px;
  span {
    cursor: pointer;
    font-size: 11px;
    color: rgba(53, 139, 212, 1);
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
