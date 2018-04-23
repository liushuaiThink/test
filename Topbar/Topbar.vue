<template>
  <div id="Topbar">
    <el-menu theme="dark"  class="el-menu-demo" index="" default-active="10" mode="horizontal" style="height:62px;line-height:62px;padding:0px 20px;padding-right:10px">
      <img src="../../../static/logo_03.jpg" style="margin-top:16px;float:left">
      <router-link to="/index/managerslist" style="color:#f1f1f1;line-height:62px;float:left;margin-left:6px">
        <span style="font-size:20px;font-weight:900">运营管理平台</span>
      </router-link>  
      <el-button style="padding:3px 7px;margin-left:15px;background:#4e97d9;border:0 " type="primary" @click.native="changeNav">
        <i class="fa fa-bars"></i>
      </el-button>
      <el-submenu index="" style="height:62px;line-height:62px;float:right" v-if="flag">
        <template slot="title" style="height:62px;line-height:62px"><i class="iconfont icon-guanliyuan" style="margin-right:6px"></i>{{user_name}}</template>
        <!-- <el-menu-item index="4" style="height:45px;line-height:45px">个人信息</el-menu-item>
        <el-menu-item index="2" style="height:45px;line-height:45px">修改密码</el-menu-item> -->
        <el-menu-item index="3" style="height:45px;line-height:45px;color:#000" @click="handleOut">退出</el-menu-item>
      </el-submenu>
      <el-button style="float:right;margin:15px 0 0 24px;" index="1" v-else @click="handleLogin">登陆</el-button>
      <i class="iconfont icon-gaojing" style="margin:-2px 4px 0 0;float:right;position:relative;cursor: pointer;font-size:18px"><div class="new" v-if="scoket==0?false:true">{{scoket}}</div></i>
      <i class="iconfont icon-youxiang" style="margin-right:24px;float:right;cursor: pointer;font-size:18px"></i>
    </el-menu>
  </div>      
 
</template>

<script>

export default {
    name:'topbar',
    data() {
      return {
         activeIndex: '1',
         flag:'',
         scoket:0,
         user_name:''
      };
    },
    computed:{
      
    },
    created(){
      if(localStorage.token){
        this.flag = true
      }
      this.user_name=localStorage.user_name
      // webscoket
      var ws = Bus.$app.make('ws');
      ws.setUser({"uid":localStorage.id,"user_token":localStorage.token});
      ws.connect();
      var log = Bus.$app.make('log');
      var callbacks = Bus.$app.make('callback');
      var msg = Bus.$app.make("message");
      var tips = Bus.$app.make("tips");
      var notice = Bus.$app.make("notice");
      log.setVerbose(9);
      callbacks.add("open",()=>{console.log(msg);msg.register()});
      callbacks.add("open",()=>{console.log(msg);tips.register()});
      callbacks.add("open",()=>{console.log(msg);notice.register()});
      callbacks.add("tips",(msg)=>{
        console.log(msg)
        this.scoket=msg.Content 
      });
      callbacks.add("message",(msg)=>{
          console.log(msg);
          this.scoket=msg.Content 
          console.log(this.scoket)
      });
      callbacks.add("notice",(msg)=>{
          console.log(msg);
          this.scoket=msg.Content 
          console.log(this.scoket)
      });
      callbacks.add("status",(msg)=>{log.log(msg)});
    },
     watch:{
      scoket(){
        // this.$message({
        //   message:this.scoket
        // })
      }
    },
    methods: {

      changeNav(){
        var navStyleWidth = this.$store.getters.GetNavStyle.width
        if(navStyleWidth=='220px'){
          this.$store.dispatch('navStyleAction',{width:'0px',flex:'0 0 0px'});
        }else{
          this.$store.dispatch('navStyleAction',{width:'220px',flex:'0 0 220px'});
        }
      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleOut(){
        let data={
          admin_token:localStorage.token
        }
        this.$http('/yunying/yunying/outlogin',data,{},{},'post').then(res=>{
          //console.log(res)
          if (res.data.code==1000) {
            this.flag=false
            this.$message({
              message: '您已退出',
              type: 'success'
            });
            this.$router.push({path:'/'})
            localStorage.removeItem('token')
          }
        })   
      },
      handleLogin(){
        this.$router.push({path:'/'})
      }
    },
    mounted(){
      
    }
  }
</script>

<style scoped>
  .el-menu--dark{background: #4e97d9;color: #fff}
  .el-menu--horizontal .el-menu-item{height: 62px;line-height: 62px;width: 100px}
  .el-submenu__title{height: 62px!important;line-height: 62px!important}
  .el-menu--horizontal .el-submenu .el-menu-item{width: 100%!important}  
  .el-menu{border-radius: 0px!important}
  /* .el-menu--horizontal .el-submenu{margin-top: -8px} */
  .el-submenu .el-menu-item{min-width: 10px}
  .new{width: 16px;height: 16px;border-radius: 50%;background: red;position: absolute;top: 14px;left:9px;font-size: 1px;color:#fff;line-height: 18px;text-align:center}
</style>
<style>
  #Topbar .el-menu--horizontal .el-submenu>.el-menu{top:62px;}
  #Topbar .el-menu--horizontal .el-submenu .el-submenu__title:hover{background:#4e97d9;border-color:#4e97d9;}
  #Topbar .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{color: #fff;text-align:center}
  #Topbar .el-menu--horizontal .el-submenu .el-submenu__icon-arrow{color: #fff;}
</style>