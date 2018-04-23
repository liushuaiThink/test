import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

const Login=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Login/Login'))
  })
}

const Register=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Register/Register'))
  })
}
const HelpCenter=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/HelpCenter/HelpCenter'))
  })
}
const Liuchen=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Liuchen/Liuchen'))
  })
}
const Forgetpassword=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Forgetpassword/Forgetpassword'))
  })
}

const Index=function(resolve){
	require.ensure([],function(){
		resolve(require('../components/Index/Index'))
	})
}

const Home=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Home/Home'))
  })
}

const Business=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Business/Business'))
  })
}

const Work=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Work/Work'))
  })
}

const Wallet=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Wallet/Wallet'))
  })
}

const TheLadder=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/TheLadder/TheLadder'))
  })
}

const MyCollection=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/MyCollection/MyCollection'))
  })
} 

const BootPage=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/BootPage/BootPage'))
  })
}

const UserDetails=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/UserDetails/UserDetails'))
  })
}
const Ceshi=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Ceshi/Ceshi'))
  })
}
const Shebeiceshi=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Shebeiceshi/Shebeiceshi'))
  })
}
const Zhuantiyi=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Zhuantiyi/Zhuantiyi'))
  })
}
const Zhuantier=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Zhuantier/Zhuantier'))
  })
}
const checkAccount=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/checkAccount/checkAccount'))
  })
}

const UndertakeProjectDetail=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/UndertakeProjectDetail/UndertakeProjectDetail'))
  })
}

const Details=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Details/Details'))
  })
}

const UserCenter=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/UserCenter/UserCenter'))
  })
}

const UpGrade=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/UpGrade/UpGrade'))
  })
}

const WorkBench=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/WorkBench/WorkBench'))
  })
}

const WorkbenchNew=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/WorkbenchNew/WorkbenchNew'))
  })
}

const Message=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/message/message'))
  })
}

const Monitor=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Monitor/Monitor'))
  })
}
const Shuaxin=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Shuaxin/Shuaxin'))
  })
}
const Silingsicuowu=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Silingsicuowu/Silingsicuowu'))
  })
}
const Guzhangcause=function(resolve){
  require.ensure([],function(){
    resolve(require('../components/Guzhangcause/Guzhangcause'))
  })
}


Vue.use(Router)

const router=new Router({
  mode: 'hash',
  base: __dirname,
  routes: [
    { path: '/', redirect: '/login',meta:{keepAlive:false}},
    {
      path:'/WorkBench',
      component:WorkBench,
      meta:{keepAlive:false}
    },
    {
      path:'/WorkbenchNew',
      component:WorkbenchNew,
      meta:{keepAlive:false}
    },
    {
      path:'/Monitor',
      component:Monitor,
      meta:{keepAlive:false}
    },
    {
      path:'/login',
      component:Login,
      meta:{keepAlive:false}
    },
      {
      path:'/register',
      component:Register,
      meta:{keepAlive:false}
    },
      {
      path:'/forgetpassword',
      component:Forgetpassword,
      meta:{keepAlive:false}
    },
    {
      path:'/bootpage',
      component:BootPage,
      meta:{keepAlive:false}
    },
    {
      path: '/index',redirect: '/index/home',
      component: Index,
      children:[
        {
          path:'/index/home',
          component:Home,
          meta:{keepAlive:false}
        },
  
        {
          path:'/index/business',
          component:Business,
          meta:{keepAlive:false}
        },
        {
          path:'/index/helpcenter',
          component:HelpCenter,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Liuchen',
          component:Liuchen,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Work',
          component:Work,
          meta:{keepAlive:false}
        },
        {
          path:'/index/checkAccount',
          component:checkAccount,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Wallet',
          component:Wallet,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Message',
          component:Message,
          meta:{keepAlive:false}
        },
        {
          path:'/index/TheLadder',
          component:TheLadder,
          meta:{keepAlive:false}
        },
        {
          path:'/index/MyCollection',
          component:MyCollection,
          meta:{keepAlive:false}
        },
        {
          path:'/index/ceshi',
          component:Ceshi,
          meta:{keepAlive:false}

        },
        {
          path:'/index/Shebeiceshi',
          component:Shebeiceshi

        },
        {
          path:'/index/UndertakeProjectDetail',
          component:UndertakeProjectDetail,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Details',
          component:Details,
          meta:{keepAlive:false}
        },
        {
          path:'/index/UserCenter',
          component:UserCenter,
          meta:{keepAlive:false}
        },
        {
          path:'/index/UpGrade',
          component:UpGrade,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Zhuantiyi',
          component:Zhuantiyi,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Zhuantier',
          component:Zhuantier,
          meta:{keepAlive:false}
        },
        {
          path:'/index/Shuaxin',
          component:Shuaxin,
          meta:{keepAlive:false}
        },
         {
          path:'/index/Silingsicuowu',
          component:Silingsicuowu,
          meta:{keepAlive:false}
        },
         {
          path:'/index/Guzhangcause',
          component:Guzhangcause,
          meta:{keepAlive:false}
        },
        {
          path:'/index/UserDetails',
          component:UserDetails,
          meta:{keepAlive:false}
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('loadingAction',true);
  next()
})

export default router