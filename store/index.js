import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

// 这里定义初始状态
let state = {
    loading:false,
    level:'',//云客等级
    identifyVerify:'',//实名认证状态
    faceSrc1:'',
    yunkeName:'',//实名认证
    refresh:false,
    defaultIndex:'',
    msgCount:0,//默认消息数量
    userIcon:'../../static/userCenter/userCenter_icon.png',//默认头像
    isshowfacerecognition:false,
};
// 获取定义好的状态的值$getter.方法名
const getters = {
    GetLoading:function(state){
        return state.loading
    },
    GetRefresh:function(state){
        return state.refresh
    },
    GetDefaultIndex:function(){
        return state.defaultIndex
    },
    isshowfacerecognition:function(){
        return state.isshowfacerecognition
    }
};
//更新状态的方法
const mutations = {
    changeLoading:function(state,n){//
        state.loading=n
    },
    changeRefresh:function(state,n){
        state.refresh=n
    },
    changedefaultIndex:function(state,n){
        state.defaultIndex=n
    },
    changeIsShowFaceRecognition:function(state,n){
        state.isshowfacerecognition=n
    }
};

//事件触发后的逻辑操作dispath
const actions = {
    loadingAction:function({commit},n){
        commit('changeLoading',n)
    },
    refreshAction:function({commit},n){
        commit('changeRefresh',n)
    },
    defaultIndexAction:function({commit},n){
        commit('changedefaultIndex',n)
    },
    isshowfacerecognitionAction:function({commit},n){
        commit('changeIsShowFaceRecognition',n)
    },
};





export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
