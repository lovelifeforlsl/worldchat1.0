import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:'',
    title:'',
    addyouolist:[],
    friendlist:[],
    wantchat:{
      // name:'xiaobai'
    },
    startchat:'',

    // chatmessage:{
       
    // }
    
  },
  mutations,
  actions: {
  },
  modules: {
  }
})
