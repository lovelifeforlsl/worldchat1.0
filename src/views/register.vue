<template>
  <div class="box">
    <div class="bg"></div>
    <div class="registerbox">
      <div class="leftcontent">
        <p>人生 在于前行道路上的光芒</p>
        <span>或光芒璀璨，或倔强的星星点点的闪烁</span>
      </div>
      <div class="rightcontent">
        <h3>Sign up</h3>
        <div id="user">
          <span class="usericon iconfont icon-user-s"></span>
          <input v-model="username" placeholder="用户名" class="input" type="text" />
        </div>
        <div id="passwd">
          <span class="usericon iconfont icon-suo"></span>
          <input v-model="password" placeholder="密  码" class="input" type="password" />
        </div>
        <div id="passwd">
          <span class="usericon iconfont icon-suo"></span>
          <input placeholder="确认密 码" class="input" type="password" />
        </div>
        <div id="user">
          <span class="usericon iconfont icon-youjian"></span>
          <input v-model="email" placeholder="邮箱" class="input" type="text" />
        </div>
        <div class="login" @click="register">注 册</div>
        <!-- <div class="warn">
            <span class="warnicon iconfont icon-point"></span>忘记密码？
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import WebIM from "../webim/webim.js";
export default {
          data(){
          return{
        username:'',
        password:'',
        email:'',
        nickname:''
          }
      },
  methods: {
    register() {
        var self=this
      var options = {
        username: self.username,
        password: self.password,
        nickname: self.username,
        appKey: WebIM.config.appkey,
        success: function() {  
            alert('注册成功')       
        },
        error: function() {},
        apiUrl: WebIM.config.apiURL
      };
      WebIM.conn.registerUser(options);
    }
  }
};
</script>


<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.box {
  width: 100%;
  height: 100vh;
  position: relative;

  .rightcontent {
    flex: 3;
    background-color: white;
    padding: 40px 20px;

    h3 {
      font-size: 28px;
      font-weight: normal;
      color: rgb(139, 127, 127);
    }

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
      font-size: 22px;
      position: absolute;
      top: 7px;
      right: 10px;
      color: rgb(117, 109, 109);
    }

    .input {
      width: 100%;
      border: none;
      height: 46px;
      padding: 0 44px 0 12px;
      margin-bottom: 30px;
      border: 1px solid rgb(230, 226, 226);
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

  .bg {
    width: 100%;
    height: 100vh;
    background: url(http://sqimg.qq.com/qq_product_operations/im/2015/bg3_1600.jpg)
      center center;
    background-size: cover;
    filter: blur(3px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .registerbox {
    width: 900px;
    height: 540px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;

    .leftcontent {
      flex: 4;
      background-color: rgba(255, 255, 255, 0.219);
      padding: 30px;

      p {
        font-size: 44px;
        max-width: 400px;
        color: rgb(231, 226, 226);
      }

      span {
        display: inline-block;
        font-size: 20px;
        color: rgb(231, 226, 226);
        margin-top: 20px;
      }
    }
  }
}
</style>