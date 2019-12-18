<template>
  <div>
    <ul>
      <li v-for="(ele,index) in friendlist" :key="index" @click="wantchat(ele.username)">
        <a-avatar
          shape="square"
          :size="48"
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2717062052,3164034025&fm=26&gp=0.jpg"
        />
        <span class="name">{{ele.username}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState} from "vuex";
import * as types from "../store/mutation-types";
import store from "../store";
export default {
      computed: mapState(["friendlist"]),
      methods:{
        wantchat(name){
          console.log('name===>',name)
                store.commit(types.WHAT_START, name);
        }
      }
}
</script>

<style lang="scss" scoped>
* {
  text-align: left;
}

li {
  padding: 15px 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.582);

  .name {
      display: inline-block;
      font-size: 18px;
      margin-left: 15px;
      color: white;
  }
}
</style>