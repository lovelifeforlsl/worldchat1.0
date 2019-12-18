import * as types from './mutation-types'
export default {
    [types.ADDYOU_LIST_ADD](state,name) {
        state.addyouolist.unshift({
            username:name
        })
    },
    [types.ADDYOU_LIST_DEL](state,name) {
        console.log(name)
        for(var i=0;i<state.addyouolist.length;i++){
            if(state.addyouolist[i].username==name){
                console.log(state.addyouolist[i].name)
              state.addyouolist.splice(i,1) 
            }
      }
        console.log('state.addyouolist=>',state.addyouolist)
    },
    [types.UPLOAD_USERNAME](state,name) {
        state.username=name
    },

    [types.FRIEND_LIST_ADD](state,name) {
        state.friendlist.unshift({
            username:name
        })
    },

    [types.CHANGE_TITLE](state,name) {
        if(!state.startchat){
            state.title=name
        }else{
            state.title=state.startchat
        }

    },
    [types.WHAT_START](state,name) {

        state.wantchat={...state.wantchat,name:name}
        console.log(state.wantchat)
    },

    [types.START_CHAT](state,name) {
        state.startchat=name
        state.title=name
        state.wantchat.name=''
    },

    


    
}