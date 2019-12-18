<template>
  <div>
    <div class="box"></div>
    <div class="main">
      <div class="content">
        <div class="tip">
          <span class="logo">
            <img class="auto-img" :src="require('../images/logo.png')" alt />
          </span>
          <span>在世界的每个角落，倾听你跟世界的声音</span>
        </div>
        <div class="description">
          <h2>遇 见 最 美 好 的 自 己</h2>
          <h4>to meet the most beautiful yourself</h4>
          <span>Record</span>
        </div>
        <div class="loginbox">
          <h3>欢迎登录</h3>
          <div id="user">
            <span class="usericon iconfont icon-user-s"></span>
            <input v-model="username" placeholder="用户名" class="id" type="text" />
          </div>
          <div id="passwd">
            <span class="usericon iconfont icon-suo"></span>
            <input v-model="password" placeholder="密  码" class="passwd" type="password" />
          </div>
          <div id="test">
            <input placeholder="验证码" class="test" type="text" />
            <span class="code">5186</span>
          </div>
          <div class="warn">
            <span class="warnicon iconfont icon-point"></span>忘记密码？
          </div>
          <div class="login" @click="login">登 录</div>
          <div class="register" @click="gotoregister">还没有账号？立即注册 >></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebIM from "../webim/webim.js";
// import { mapActions } from "vuex";
import * as types from "../store/mutation-types"
import store from "../store";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    gotoregister() {
      this.$router.push({ path: "/register" });
    },
    login() {
      var self = this;
      var options = {
        apiUrl: WebIM.config.apiURL,
        user: self.username,
        pwd: self.password,
        appKey: WebIM.config.appkey,
        success: function() {
          self.$router.push("/chatview");
          store.commit(types.UPLOAD_USERNAME, self.username);
        }
      };
      WebIM.conn.open(options);
    }
    // ...mapActions(["uploadusername"])
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;
  // color: white;
}

.auto-img {
  width: 100%;
  display: block;
}
.box {
  width: 100%;
  height: 100vh;
  background: url(http://sqimg.qq.com/qq_product_operations/im/2015/bg1_1600.jpg)
    center center;
  background-size: cover;
  filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.main {
  width: calc(100% - 300px);
  height: 100vh;
  color: rgb(224, 216, 216);
  padding: 45px 150px 0;

  .content {
    width: 100%;

    .tip {
      line-height: 60px;
      font-size: 24px;
    }
    .logo {
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      vertical-align: top;
      margin-right: 40px;
    }

    .description {
      margin-top: 300px;
      padding: 20px;
      border-left: 4px solid white;

      h2 {
        font-size: 28px;
        margin-bottom: 8px;
        color: white;
      }

      h4 {
        font-size: 22px;
        margin-bottom: 18px;
        color: white;
      }
    }

    .loginbox {
      width: 350px;
      height: 510px;
      background-color: rgba(255, 255, 255, 0.801);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      padding: 50px 25px 0px;
      color: rgba(0, 0, 0, 0.664);

      .login {
        width: 100%;
        height: 48px;
        border-radius: 4px;
        background-color: rgb(28, 160, 138);
        color: white;
        font-size: 24px;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
        margin-bottom: 20px;
      }

      .register {
        cursor: pointer;
      }

      .warn {
        margin-bottom: 20px;
        cursor: pointer;
      }

      h3 {
        text-align: center;
        font-size: 28px;
        margin-bottom: 30px;
      }

      #user {
        position: relative;
      }

      #passwd {
        position: relative;
      }

      .usericon {
        font-size: 27px;
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .warnicon {
        display: inline-block;
        font-size: 20px;
        background-color: white;
        margin-right: 15px;
      }

      .id {
        width: 100%;
        border: none;
        height: 48px;
        padding: 0 44px 0 12px;
        margin-bottom: 30px;
      }

      .passwd {
        width: 100%;
        border: none;
        height: 48px;
        padding: 0 44px 0 12px;
        margin-bottom: 30px;
      }

      .test {
        width: 100%;
        border: none;
        height: 48px;
        padding: 0 44px 0 12px;
        margin-bottom: 10px;
      }

      #test {
        position: relative;
      }

      .code {
        position: absolute;
        display: inline-block;
        width: 80px;
        text-align: center;
        background-color: rgb(171, 177, 182);
        height: 48px;
        line-height: 52px;
        top: 0;
        right: 0;
        cursor: pointer;
      }
    }
  }
}
</style>