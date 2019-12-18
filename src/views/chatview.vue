<template>
  <div class="main">
    <div class="bg">
      <div class="layor"></div>
    </div>
    <!-- 好友申请提示 -->
    <div>
      <a-button type="primary"></a-button>
      <a-modal
        title="好友申请"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
        okText="确定"
        cancelText="拒绝"
      >
        <p v-for="(ele,index) in addyouolist" :key="index">{{ele.username}}请求加你为好友</p>
      </a-modal>
    </div>

    <div class="box">
      <div class="lefcontent">
        <div class="menubox">
          <div class="nav">
            <a-avatar
              shape="square"
              :size="56"
              src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2717062052,3164034025&fm=26&gp=0.jpg"
            />
            <span class="navname">{{username}}</span>
            <div class="menuicon iconfont icon-menu"></div>
          </div>

          <div class="searchbox">
            <span class="searchicon iconfont icon-search"></span>
            <input class="search" placeholder="搜索" type="text" />
          </div>
        </div>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab" @click="changetitle()">
              <a-icon type="message" />
            </span>
            <Message />
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <span class="iconfont icon-shifouyunxuweiwanchengpandianrenwukaidan"></span>
            </span>
            Tab 2
          </a-tab-pane>
          <a-tab-pane key="3">
            <span slot="tab"  @click="changetitle('详细信息')">
              <a-icon type="team" />
            </span>
            <Friendlist />
          </a-tab-pane>
        </a-tabs>
        <div class="bottommenu">
          <div class="searchfriendbox">
            <transition name="seachnewfiend">
              <div class="searchfriend" v-show="searchnewfriends">
                <input class="searchfriendinput" v-model="newfriendname" type="text" />
                <span class="friendsearchicon iconfont icon-search" @click="addfriend"></span>
              </div>
            </transition>
          </div>
          <div>
            <span class="bticon iconfont icon-shezhi"></span>
            <span class="bticon iconfont icon-youjian"></span>
            <span class="bticon iconfont icon-jia" @click="searchingfriend"></span>
            <a-popover title="好友申请">
              <template slot="content">
                <p
                  v-for="(ele,index) in addyouolist"
                  :key="index"
                  @click="showModal(ele.username)"
                >好友申请</p>
              </template>
              <a-button type="primary">
                <span v-show="showmessage" class="bticon iconfont icon-iconmess-copy"></span>
              </a-button>
            </a-popover>
          </div>
        </div>
      </div>
      <div class="rightcontent">
        <div class="right-nav">{{title}}</div>

        <div class="haschat" v-if="!startchat&&!wantchat.name">
          <span class="chaticon iconfont icon-weixin"></span>
          <div>未选择聊天{{wantchat.name}}</div>
        </div>

        <div class="startchatbox" v-if="wantchat.name">
          <div>{{wantchat.name}}</div>
          <div class="startchat-btn" @click="startchathandel(wantchat.name)">发消息</div>
        </div>

        <div class="right-contetn" v-if="startchat">
          <div class="messagewindow"></div>
          <div class="sendmessage">
            <div>
              <span class="sendicon iconfont icon-biaoqing"></span>
              <span class="sendicon iconfont icon-jianqie"></span>
              <span class="sendicon iconfont icon-wenjianjia"></span>
            </div>
            <textarea class="textarea"></textarea>
            <div class="clean">
              <div class="send fr">发送</div>
              <span class="tip fr">按下Ctrl+Enter换行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "../components/Message";
import Friendlist from "../components/Friendlist";
import WebIM from "../webim/webim.js";
import * as types from "../store/mutation-types";
import store from "../store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchnewfriends: false,
      newfriendname: "",
      // friendmessage: 0,
      showmessage: false,
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      timer: "",

      //当前加你的人的currenindex
      sendname: ""
    };
  },
  components: {
    Message,
    Friendlist
  },
  computed: mapState(["addyouolist", "username", "title", "wantchat",'startchat']),
  methods: {
    searchingfriend() {
      this.searchnewfriends = !this.searchnewfriends;
    },
    addfriend() {
      console.log(111)
      var self = this;
      WebIM.conn.subscribe({
        to: self.newfriendname,
        message: "加个好友呗!"
      });
    },
    messagewarn() {
      this.showmessage = !this.showmessage;
    },

    // 好友申请提示
    showModal(name) {
      this.visible = true;
      this.sendname = name;
    },
    handleOk() {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      store.commit(types.ADDYOU_LIST_DEL, this.sendname);
      var self = this;
      //确定添加好友监听
      WebIM.conn.subscribed({
        to: self.sendname,
        message: "[resp:true]"
      });

      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      // console.log("Clicked cancel button");
      store.commit(types.ADDYOU_LIST_DEL, this.sendname);
      var self = this;
      WebIM.conn.unsubscribed({
        to: self.sendname,
        message: "rejectAddFriend"
      });
      this.visible = false;
    },
    // ...mapActions(['deletenumber'])

    //改变title
    changetitle(name) {
      console.log("name=>", name);
      store.commit(types.CHANGE_TITLE, name);
    },
    startchathandel(name){
            store.commit(types.START_CHAT, name);
    }
  },
  watch: {
    addyouolist(val) {
      clearInterval(this.timer);
      // console.log('val==>',val.length)
      if (val.length > 0) {
        // console.log(timer);
        var self = this;
        this.timer = setInterval(() => {
          self.messagewarn();
        }, 800);
      } else {
        this.showmessage = false;
      }
    }
  }
};
</script>

<style lang="scss">
.ant-btn-primary:hover,
.ant-btn-primary:focus {
  background-color: transparent;
}

.ant-btn {
  border: none;
  padding: 0;
}

.ant-btn-primary {
  background-color: transparent;
}

.ant-tabs-tab {
  color: white;
  font-size: 24px;
}

.icon-shifouyunxuweiwanchengpandianrenwukaidan {
  font-size: 26px;
}

.ant-tabs-ink-bar {
  background-color: rgb(72, 185, 72);
}

.ant-tabs-nav .ant-tabs-tab-active {
  color: rgb(72, 185, 72);
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clean {
  overflow: hidden;
}

.main {
  padding-top: 50px;
  height: 100vh;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(//sqimg.qq.com/qq_product_operations/im/2015/update/avds.jpg)
    center center;
  background-size: cover;
  filter: blur(8px);

  .layor {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.267);
  }
}

.box {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto 0;
  width: 1200px;
  height: 800px;
  display: flex;
  color: white;

  .rightcontent {
    flex: 7;
    background-color: rgb(249, 250, 247);
    padding: 10px 25px 0px;
    position: relative;

    .haschat {
      position: absolute;
      top: 200px;
      left: 0;
      right: 0;
      margin: 0 auto;
      color: #dbd7d7;
      font-size: 18px;

      div {
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }

    .startchatbox {
      position: absolute;
      top: 250px;
      left: 0;
      right: 0;
      margin: 0 auto;
      color: #dbd7d7;
      font-size: 34px;
      color: black;

      .startchat-btn {
        font-size: 18px;
        width: 230px;
        padding: 10px 0;
        border-radius: 6px;
        margin: 0 auto;
        color: white;
        background-color: rgb(72, 185, 72);
        margin-top: 20px;
        cursor: pointer;
      }
    }

    .chaticon {
      font-size: 130px;
    }

    .right-nav {
      font-size: 20px;
      height: 50px;
      padding: 8px 0;
      color: black;
      border-bottom: 1px solid rgba(7, 17, 27, 0.15);
    }

    .messagewindow {
      width: 100%;
      height: 480px;
    }

    .sendmessage {
      width: 100%;
      border-top: 1px solid rgba(7, 17, 27, 0.15);
      text-align: left;
      padding-top: 10px;
      color: rgb(44, 42, 42);

      .sendicon {
        font-size: 25px;
        color: rgb(102, 96, 96);
        display: inline-block;
        margin-right: 15px;
      }

      .textarea {
        width: 100%;
        height: 140px;
        resize: none;
        border: none;
        outline: none;
        background-color: transparent;
        font-size: 18px;
      }

      .send {
        width: 110px;
        text-align: center;
        padding: 6px 0;
        background-color: white;
        cursor: pointer;
        border: 1px solid rgba(7, 17, 27, 0.2);
        border-radius: 6px;
        font-size: 18px;
      }

      .tip {
        display: inline-block;
        line-height: 41px;
        margin-right: 20px;
      }
    }
  }

  .lefcontent {
    flex: 3;
    height: 100%;
    background-color: rgb(86, 91, 97);
    position: relative;
    padding-bottom: 60px;

    .bottommenu {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 13.5px 25px;
      width: 100%;
      text-align: left;

      .searchfriendbox {
        width: 100%;
        height: 38px;
        position: relative;
        overflow: hidden;
      }

      .bticon {
        display: inline-block;
        font-size: 22px;
        margin-right: 20px;
      }

      .searchfriend {
        width: 100%;
        position: absolute;
        top: 0%;
        left: 0;

        &.seachnewfiend-enter,
        &.seachnewfiend-leave-to {
          top: 100%;
        }

        &.seachnewfiend-enter-active,
        &.seachnewfiend-leave-active {
          transition: top 0.4s linear;
        }

        &.seachnewfiend-enter-to,
        &.seachnewfiend-leave {
          top: 0%;
        }
      }

      .searchfriendinput {
        width: 86%;
        height: 34px;
        border: none;
        outline: none;
        color: black;
        padding-left: 8px;
      }

      .friendsearchicon {
        font-size: 25px;
        vertical-align: middle;
        margin-left: 15px;
      }
    }

    .menubox {
      padding: 25px;
    }

    .nav {
      display: flex;
      position: relative;
      margin-bottom: 25px;

      .navname {
        display: inline-block;
        max-width: 180px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 22px;
        line-height: 56px;
        margin-left: 15px;
      }

      .menuicon {
        position: absolute;
        font-size: 22px;
        color: #888;
        top: calc(25% - 5px);
        right: 0;
      }
    }

    .searchbox {
      position: relative;

      .search {
        width: 100%;
        height: 42px;
        background-color: rgba(27, 26, 26, 0.637);
        border: none;
        outline: none;
        padding-left: 40px;
        font-size: 18px;
      }

      .searchicon {
        display: inline-block;
        position: absolute;
        top: 1px;
        left: 5px;
        font-size: 30px;
        color: #999;
      }
    }
  }
}
</style>