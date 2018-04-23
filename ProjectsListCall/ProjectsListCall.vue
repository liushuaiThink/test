<template>
  <div id="ProjectsListCall">
    <!-- 面包屑导航 -->
    <!-- <Subnav :secondLevel="secondLevel" :threeLevel="threeLevel" @refresh="refresh"></Subnav> -->
    <!-- 头部 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h2>通话明细</h2>
        </div>
      </el-col>
    </el-row>
    <!-- 内容 -->
    <div class="top">
      <p>全部通话：<span>{{topdata.total}}个</span></p>
      <el-tooltip class="item" effect="dark" content="接通率=所有接通号码数量/所有拨打号码数量*%" placement="top">
        <p>接通率：<span>{{callRate}}</span></p>
      </el-tooltip>
      <p>已质检：<span>{{topdata.quality}}个</span></p>
      <el-tooltip class="item" effect="dark" content="质检率=已质检数/（总呼出数-预约待跟进-未接通）" placement="top">
        <p>质检率：<span>{{qualityRate}}</span></p>
      </el-tooltip>
      <p>不合格：<span>{{topdata.unqualified}}个</span></p>
      <el-tooltip class="item" effect="dark" content="合格率=质检合格数/已质检数" placement="top">
        <p>合格率：<span>{{passRate}}</span></p>
      </el-tooltip>
    </div>
    <!-- middle -->
    <div class="middle">
    <el-select v-model="form.call" placeholder="已呼叫" clearable style="width:8%;" >
        <el-option label="已呼叫" :value="1"></el-option>
        <el-option label="待呼叫" :value="2"></el-option>
      </el-select>
      <el-select v-model="form.call_result" placeholder="通话结果" clearable style="width:8%;" >
        <el-option label="通话结果" :value="0"></el-option>
        <el-option label="接通" :value="1"></el-option>
        <el-option label="无人接听" :value="2"></el-option>
        <el-option label="拒接" :value="3"></el-option>
        <el-option label="关机" :value="4"></el-option>
        <el-option label="停机" :value="5"></el-option>
        <el-option label="空号" :value="6"></el-option>
        <el-option label="其他" :value="7"></el-option>
      </el-select>
      <!-- <el-select v-model="form.settlement_result" placeholder="结算结果" style="width:8%;" >
        <el-option label="结算结果" :value="1"></el-option>
        <el-option v-for="(item,index) in searchOp" :label="item.title" :value="item.id" :key="item.id"></el-option>
        <el-option label="预约待跟进" value="yuyue"></el-option>
      </el-select> -->
      <el-cascader
        placeholder="成单状态"
        expand-trigger="hover"
        change-on-select
        :value="form.jiesuanstandard"
        v-model='form.jiesuanstandard'
        :options="options"
        :show-all-levels="false"
        style="width:8%;float:left;margin-right:10px"
        clearable
      ></el-cascader>
      <el-select v-model="form.quality" placeholder="质检结果" clearable style="width:8%;">
        <el-option label="质检结果" :value="0"></el-option>
        <el-option label="合格" :value="1"></el-option>
        <el-option label="不合格" :value="2"></el-option>
        <el-option label="未质检" :value="3"></el-option>
      </el-select>
      <el-input style="width:8%;float:left;margin-left:10px" v-model="form.start_long" placeholder="通话时长(秒)"></el-input>
          <div style="float:left;margin-top:7px">-</div>
          <el-input style="width:8%;float:left;" v-model="form.end_long" placeholder="通话时长(秒)"></el-input>
      </el-input>
      <el-input
        placeholder="搜索客户号码"
        icon="search"
        v-model="form.phone"
        :on-icon-click="handleIconClick"
        style="width:8%;float:left;margin-left:10px">
      </el-input>
      <p style="float:left;line-height:40px;margin:0 10px">共计：<span>{{total?total:0}}</span>条</p>
      <el-button type="primary" style="width:100px;" @click="handleCall">查看</el-button>
      <el-button :disabled="false" style="width:100px"  @click="exportToExcel(true)">导出数据</el-button>
      <div class="wenhao">?</div>
    </div>
    <!-- table -->
    <el-table
      :data="searchedTableData"
      border
      style="width: 92%;margin:30px 0 0 20px">
      <el-table-column
        prop="call_date"
        label="通话日期">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="客户号码">
      </el-table-column>
      <el-table-column
        prop="yk_name"
        label="云客">
        <template scope="scope">
          <el-popover trigger="hover" placement="right">
            <p><h2 style="font-size:20px">{{ scope.row.yk_detail.name }}</h2>{{scope.row.yk_detail.level}}</p>
            <p>本项目呼出: {{ scope.row.yk_detail.exhale }}</p>
            <p>本项目接通: {{ scope.row.yk_detail.connect }}</p>
            <p>本项目已质检数: {{ scope.row.yk_detail.quality }}</p>
            <p>本项目质检合格率: {{ scope.row.yk_detail.success_rate }}%</p>
            <p>签入过的项目: {{ scope.row.yk_detail.checkin }}</p>
            <p>累计呼出: {{ scope.row.yk_detail.accumulated_exhaled }}</p>
            <p>累计接通: {{ scope.row.yk_detail.accumulated_connect }}</p>
            <p>总质检合格率: {{ scope.row.yk_detail.prufrate }}%</p>
            <div slot="reference" class="name-wrapper" >
              <span @click="handleYk(scope.index,scope.row)" v-if="scope.row.yk_name?true:false"><el-tag >{{ scope.row.yk_name }}</el-tag></span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="call_result"
        label="通话结果">
      </el-table-column>
      <el-table-column
        prop="standard_title"
        label="成单状态">
      </el-table-column>
      <el-table-column
        prop="long"
        label="通话时长">
      </el-table-column>
      <el-table-column
        prop="total_long"
        label="累计时长">
      </el-table-column>
      <el-table-column
        prop="call_times"
        label="拨打次数">
        <template scope="scope">
          <el-popover trigger="hover" placement="right">
            <p v-for="item in scope.row.call_detail">{{item.call_date}}<span style="margin-left:5px">{{item.disposition}}</span><span style="margin-left:5px">{{item.order_status}}</span> </p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.call_times }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="qc_res"
        label="质检结果">
      </el-table-column>
      <el-table-column
        prop="note"
        label="工单备注">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template scope="scope">
          <el-button
            @click.native.prevent="handleDetails(scope.$index, tableData,scope.row)"
            type="text"
            size="small">
            录音 
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="录音" :visible.sync="dialogTableVisible"  :close-on-click-modal="false">
        <div class="con-l">
            <div style="padding:5px 5px 10px 5px">
              <div id="waveform" style="background:#fff"></div>
              <el-row style="margin:10px 0;text-align:center;color:#99A9BF">
                <span style="width:20%;float:left">{{quality.call_date}}</span>
                <span style="width:20%;float:left">{{quality.phone}}</span>
                <span style="width:20%;float:left">{{quality.call_status}}</span>
                <span style="width:20%;float:left">{{quality.standard_title}}</span>
                <span style="width:20%;float:left">{{quality.long?'通话时长：'+quality.long:''}}</span>
              </el-row>
              <div id="play" style="text-align: center">
                <el-button type="primary" size="small" style="background:#D3DCE6;border:1px solid #D3DCE6" id="playPause">
                  <i class="fa fa-play" style="display:none"></i>
                  <i class="fa fa-pause"></i>
                </el-button>
                <el-button type="primary" size="small" style="background:#D3DCE6;border:1px solid #D3DCE6" id="skipBackward">
                  <i class="fa fa-step-backward"></i>
                </el-button>
                <el-button type="primary" size="small" style="background:#D3DCE6;border:1px solid #D3DCE6" id="skipForward">
                  <i class="fa fa-step-forward"></i>
                </el-button>
                <el-button type="primary" size="small" style="background:#D3DCE6;border:1px solid #D3DCE6" id="toggleMute">
                  <a :href="quality.record" :download="quality.record" style="color:#fff"><i class="fa fa-download"></i></a>
                </el-button>
              </div>
            </div>
            <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px" ref="ruleForm" class="demo-ruleForm" style="margin:0 0 0 0" v-if="record.is_qc==3?true:false">
              <el-form-item label="质检结果：" prop="result">
                <el-radio-group v-model="ruleForm.result" @change="handleResult">
                  <el-radio-button label="1">合格</el-radio-button>
                  <el-radio-button label="2">不合格</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="合格级别："  v-if="ruleForm.result==1?true:false">
                <el-radio-group v-model="ruleForm.hege" @change="handleError">
                  <el-radio-button :label="item.id" v-for="(item,index) in error_lev" :key="index">{{item.description}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="错误级别：" prop="error" v-if="ruleForm.result==2?true:false">
                <el-radio-group v-model="ruleForm.error" @change="handleError">
                  <el-radio-button :label="item.id" v-for="(item,index) in error_lev" :key="index">{{item.description}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="错误类型：" prop="type" v-if="ruleForm.error?true:false">
                <el-checkbox-group v-model="ruleForm.type" fill="#324057">
                  <el-checkbox-button v-for="(item,index) in error_type" :label="item.id" :key="index">{{item.description}}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
             <el-form-item label="备注：" v-if="ruleForm.type !=''||ruleForm.hege!=''?true:false">
                <el-input v-model="ruleForm.comment" style="width:80%"></el-input>
              </el-form-item>
              <el-form-item  v-if="ruleForm.type !=''||ruleForm.hege!=''?true:false">
                <el-checkbox v-model="ruleForm.isAdd">是否加入样本库</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" id="submitForm" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>

            <el-form :model="ruleForm" :rules="rules" :label-position="labelPosition" label-width="100px" ref="ruleForm" class="demo-ruleForm" style="margin:0 0 0 0" v-if="record.is_qc==3?true:false">
              <el-form-item label="质检结果：">
                <p>{{qc_res[0]}}</p>
              </el-form-item>
              <el-form-item label="合格级别：" v-if="qc_res[0]=='合格'">
                <p>{{qc_res[1]}}</p>
              </el-form-item>
              <el-form-item label="错误级别：" v-if="qc_res[0]=='不合格'">
                <p>{{qc_res[1]}}</p>
              </el-form-item>
              <el-form-item label="错误类型：" v-if="qc_res[0]=='不合格'">
                <p>
                  <span v-for="item in qc_res2" style="margin:0 20px 0 0">{{item}}</span>
                </p>
              </el-form-item>
              <el-form-item label="备注：">
                <p>{{record.qc_note}}</p>
              </el-form-item>
              <el-form-item >
                <p></p>
              </el-form-item>
            </el-form>
        <!-- <p style="width:100%;">
          <audio :src="record.record" autobuffer autoloop autoplay controls id="audio"></audio>
        </p>
        <p>
          <el-col :span="16">云客：<span>{{record.yk_name?record.yk_name:''}}      {{record.user_id}}</span></el-col>
        </p>
        <p>
          <el-col :span="16">客户电话：<span>{{record.phone}}</span></el-col>
          <el-col :span="8">成单状态：<span>{{record.call_result}}</span></el-col>
        </p>
        <p>
            <el-col :span="16">通话日期：<span>{{record.call_date}}</span></el-col>
            <el-col :span="8">通话时长：<span>{{record.long}}秒</span></el-col>
        </p>
        <p style="width:100%;">
              <el-col :span="4">工单备注：</el-col>
              <el-col :span="20" style="margin-bottom:20px"><span>{{quality.note}}</span></el-col>
        </p>
        <div style="width:100%;margin-top:20px" v-for="(item,index) in record.cdr">
          <p style="width:100%;">
            <audio :src="item.callfilename" autobuffer autoloop  controls id="audio"></audio>
          </p>
          <p>
              <el-col :span="14">通话日期：<span>{{item.calldate}}</span></el-col>
              <el-col :span="10">通话时长：<span>{{item.billsec}}</span></el-col>
          </p>
        </div>
        <p style="margin-top:20px">质检结果：
          <el-radio-group v-model="radio">
              <el-radio class="radio" :label="1" @change.native="handleHide()">合格</el-radio>
              <el-radio class="radio" :label="2" @change.native="handleShow()">不合格</el-radio>
          </el-radio-group>
        </p>
        <div class="buhege" style="background:#f2f2f2;padding:10px;margin:10px 0 0 80px;" v-if="flag">
          <p>
            <el-radio-group v-model="radio2">
              <el-radio :label="1">一般错误</el-radio>
              <el-radio :label="2">严重错误</el-radio>
              <el-radio :label="3">致命错误</el-radio>
            </el-radio-group>
          </p>
          <p style="margin:10px 0">
            <span style="float:left;background:#8492A6;margin:0 5px 5px 0;border-radius:2px;font-size:12px;padding:2px;color:#fff;cursor:pointer" v-for="(item,index) in reason" :key="index" @click="handleAdd(item)">{{item}}</span>
          </p>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="质检不合格理由"
            v-model="textarea">
          </el-input>
          <el-checkbox v-model="isExample" style="margin:10px 0 0 0">是否加入样本库</el-checkbox>
        </div> -->
      </div>
      <div class="con-m" style="float:left;width:30%;overflow-y:auto;margin:0 0 20px 20px">
        <p>业务问卷</p>
        <hr color=#ccc>
        <div style="height:108px;overflow-y:auto;padding:10px" class="answer">
          <p v-for="(item,index) in testPaper" :key="index" style="text-align:center;line-height:30px;margin-bottom:10px" class="paper">
            <el-popover trigger="hover" placement="top" >
              <p style="width:200px">Q{{index+1}}：{{item.q_title}}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag >
                  <span style="width:10%;float:left">Q{{index+1}}</span>
                  <span>{{item.answer.answered?item.answer.answered:'未选择'}}</span>
                </el-tag>
              </div>
            </el-popover>
          </p>
          <!-- <p v-for="(item,index) in testPaper">{{item.anwser.alp?item.anwser.alp:'A'}}：{{item.anwser.q_id}}</p> -->
          <!-- <table style="font-size:14px">
            <tr v-for="(item,index) in testPaper" style="line-height:30px">
              <td width="70%">{{item.q_title}}</td>
              <td width="5%">{{item.anwser.alp}}</td>
              <td width="25%" v-for="(obj,i) in item.q_data" v-if="item.anwser.answered!=obj.val">【{{obj.title}}】</td>
            </tr>
          </table> -->
        </div>
        <p style="margin-top:10px">客户资料</p>
        <hr color=#ccc>
        <div class="kehu" style="overflow-y:auto;height:185px">
          <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
            <el-form-item :label="item+'：'" v-for="(item,index) in file_name" :key="index" v-if="item==''?false:true">
              <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{info[index]}}</p>
            </el-form-item>
<!--             <el-form-item label="曾用名：">
              <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">王**</p>    
            </el-form-item>
            <el-form-item label="性别：">
              <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">男</p>    
            </el-form-item>
            <el-form-item label="公司名称：">
              <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">北京南邮信息科技</p>    
            </el-form-item>
            <el-form-item label="公司地址：">
              <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">北京市丰台区花乡...</p> -->    
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- <div style="width: 100%;float: left;text-align: center;margin: 30px;">
        <el-button type="primary" style="width:115px;height:36px" @click="handleSubmit">提交</el-button>
        <el-button type="primary" style="width:135px;height:36px" @click="handleSubmitnext">提交并质检下一条</el-button>
      </div> -->
    </el-dialog>
    <!-- 分页 -->
    <el-pagination class="pagination txt-r" v-show="searchedTableData.length>0" layout="prev, pager, next" :page-size='10' @current-change="currentChange" :total="total" style="text-align:center;margin:50px 0">
    </el-pagination>
  </div>
</template>

<script>

import Subnav from '../Subnav/Subnav'
import exportExcel from '../../common/exportExcel'
import axios from 'axios'

export default {
  name: 'managers',
  components: {
    Subnav,
  },
  data() {
    return {
      reason:['礼貌用语错误','普通话不标准','候机时间过长','业务解答错误','未录入工单','工单录入不准确','态度不积极','有过激行为'],
      options: [{
          value: '0',
          label: '全部',
        },
        {
          value: '3',
          label: '成功',
          children: []
        },
        {
          value: '4',
          label: '不成功',
          children: []
        },
        {
          value: '5',
          label: '预约待跟进',
        }],
      currentPage: 1,
      secondLevel: '管理员管理',
      threeLevel: '管理员列表',
      form: {
          call:1,
          call_result: '',
          settlement_result: '',
          jiesuanstandard:[],
          quality: '',
          start_long: '',
          end_long:'',
          phone: '',
      }, 
      tableData: [],
      searchedTableData: [],
      topdata:[],
      callRate:'',
      qualityRate:'',
      passRate:'',
      yk_detail:[],
      call_detail:[],
      dialogTableVisible:false,
      total:1,
      record:'',
      radio: null,
      radio2: null,
      flag:false,
      textarea: '',
      quality:'',
      survey:[],
      answer:[],
      testPaper:[],
      searchOp:[],
      isExample:false,
      labelPosition:'right',
      rules:{
        result: [
            { required: true, message: '请选择质检结果', trigger: 'blur' },
          ],
          error: [
            { required: true, type: 'number',message: '请选择错误级别', trigger: 'blur' },
          ],
          hege: [
            { required: true, type: 'number',message: '请选择合格级别', trigger: 'blur' },
          ],
          type: [
            { required: true, type: 'array',message: '请选择错误类型', trigger: 'blur' },
          ],
      },
      error_lev:[],
      hege:[],
      buhege:[],
      eType:[],
      error_type:[],
      ruleForm:{
        result:null,
        hege:'',
        error:null,
        type:[],
        comment:'',
        isAdd:false
      },
      formLabelAlign:{

      },
      info:[],
      file_name:[],
      qc_res:[],
      qc_res2:[],
      num:1,
      wf:''
    };
  },
  created(){
    this.getTop()
    this.getData()
    this.getSearch()
  },
  watch:{
    dialogTableVisible(){
      if (this.dialogTableVisible==false) {
        // $("#waveform")empty()
        this.num++
      }
    },
  },
  methods: {
    // 质检结果获取错误级别
    getResult(){
      let data = {
        admin_token:localStorage.token,
      }
      this.$http('/yunying/project/error_level',{},data,{},'get').then(res=>{
        console.log(res)
        if (res.data.code==1000&&res.data.data) {
            this.hege=res.data.data.hege
            this.buhege=res.data.data.buhege
        }
      })
    },
    handleResult(){
      //console.log(this.ruleForm.result)
          this.ruleForm.error=null
          this.ruleForm.hege = ''
          this.ruleForm.type=[]
          if (this.ruleForm.result==1) {
            this.error_lev=this.hege
          }else if(this.ruleForm.result==2){
            this.error_lev=this.buhege
          }
    },
    getError(){
      let data = {
        admin_token:localStorage.token,
      }
      this.$http('/yunying/project/error_describe',{},data,{},'get').then(res=>{
        //console.log(res)
        if (res.data.code==1000&&res.data.data) {
          this.eType=res.data.data
        }
      })
    },
    handleError(){
      this.ruleForm.type=[]
      for (let i in this.eType) {
        if (this.ruleForm.error==i) {
          this.error_type=this.eType[i]
          return
        }else{
          this.error_type=[]
        }
      }
    },
    refresh(){
        this.$store.dispatch('mainLoadingAction',true);
        var that=this
        setTimeout(function(){
          that.$store.dispatch('mainLoadingAction',false);
        },300)
      },
    handleIconClick(ev) {
      //console.log(ev);
    },
    // handleHide(){
    //   this.flag = false
    //   this.radio2=null
    //   this.textarea=''
    //   this.isExample=false
    // },
    // handleShow(){
    //   this.flag = true
    //   this.radio2=1
    // },
    // handleAdd(item){
    //     //console.log(1)
    //     this.textarea+=" "+item+" "
    // },
    // 头部统计
    getTop(){
      let data={
        admin_token:localStorage.token,
        project_id:this.$route.query.id
      }
      this.$http('/yunying/statistics/header_statistics',{},data,{},'get').then(res=>{
        //console.log(res)
        if (res.data.code==1000&&res.data.data) {
          this.topdata = res.data.data
          this.callRate  = res.data.data.connect==0?'--':res.data.data.connect+'%'
          this.qualityRate = res.data.data.quality_rate==0?'--':res.data.data.quality_rate+'%'
          this.passRate = res.data.data.success_rate==0?'--':res.data.data.success_rate+'%'
        }
      })
    },
    getSearch(){
      let data={
        admin_token:localStorage.token,
        project_id:this.$route.query.id
      }
      this.$http('/yunying/project/yks_search',{},data,{},'get').then(res=>{
        //console.log(res)
        let that =this
        if (res.data.code==1000&&res.data.data) {
          this.searchOp=res.data.data.standard
          res.data.data.standard.forEach( function(element, index) {
              ////console.log(res.data.data.standard[index].type)
              if (res.data.data.standard[index].type==3) {
                that.options[1].children.push({value: res.data.data.standard[index].id,label:res.data.data.standard[index].title},)
              }else if(res.data.data.standard[index].type==4||res.data.data.standard[index].type==5){
                that.options[2].children.push({value: res.data.data.standard[index].id,label:res.data.data.standard[index].title},)
              }
            });
        }
      })
    },
    // 通话明细-明细列表
    getData(){
      let datacall={
        admin_token:localStorage.token,
        project_id:this.$route.query.id,
        type:1
      }
      this.$http('/yunying/statistics/detail_list',{},datacall,{},'get').then(res=>{
        console.log(res.data.data)
        this.total = res.data.data.total
        this.tableData = res.data.data.list
        this.searchedTableData = this.tableData
        this.searchedTableData.forEach( function(element, index) {
          if (element.phone) {
            element.phone=element.phone.substr(0,3)+"****"+element.phone.substr(7);
          }
          if (element.note) {
            element.note = element.note.substr(0,6)
          }
        });
      })
    },
    handleYk(index,row){
      //console.log(row)
      this.$router.push({
          path: '/index/YunKeDetail',
          query:{
            id:row.user_id,
            activeName:'personalData'
          }
        });
    },
    currentChange(page) {
          this.currentPage = page;
          let data ={
            admin_token:localStorage.token,
            project_id:Number(this.$route.query.id),
            type:this.form.call,
            call_status:this.form.call_result,
            call_result_type:this.form.jiesuanstandard[0]?this.form.jiesuanstandard[0]:0,
            settlement_result:this.form.jiesuanstandard[1]?this.form.jiesuanstandard[1]:0,
            quality:this.form.quality,
            start_long:this.form.start_long,
            end_long:this.form.end_long,
            phone:this.form.phone,
            page:page
          }
          //console.log(data)
          this.$http('/yunying/statistics/detail_list',{},data,{},'get').then(res=>{
            //console.log(res)
            // let that = this
            if (res.data.code==1000&&res.data.data) {
            //   res.data.data.list.forEach( function(element, index) {
            //     that.tableData.push(element)
            //   });
            //   //console.log( this.tableData)
              this.total = res.data.data.total
              this.tableData = res.data.data.list
              this.searchedTableData = this.tableData
              this.searchedTableData.forEach( function(element, index) {
                if (element.phone) {
                  element.phone=element.phone.substr(0,3)+"****"+element.phone.substr(7);
                }
                if (element.note) {
                  element.note = element.note.substr(0,6)
                }
              });
            }
          })
    },
    handleDetails(index,tab,row){
      this.getResult()
      this.getError()
      //console.log(row)
      this.quality=row
      //this.handleHide()
      //this.radio=null
      this.testPaper=[]
      let data={
        admin_token:localStorage.token,
        record_id:row._id,
        project_id:this.$route.query.id
      }
      this.$http('/yunying/statistics/record_detail',{},data,{},'get').then(res=>{
        console.log(res)
        let that =this
        if (res.data.code==1000&&res.data.data) {
            this.dialogTableVisible = true
            this.record = res.data.data
            this.file_name = res.data.data.info.file_name
            console.log(this.file_name)
            this.info = res.data.data.info.info
            this.qc_res2=[]
            if (res.data.data.qc_res) {
              this.qc_res=res.data.data.qc_res
              if (this.qc_res[2]) {
                this.qc_res[2].forEach( function(element, index) {
                  that.qc_res2.push(element.description)
                });
              }
            }
            //console.log(this.qc_res)
            if (res.data.data.record) {
              let url = res.data.data.record 
                setTimeout(()=>{
                  var wavesurfer = WaveSurfer.create({
                    container: '#waveform',
                    waveColor: '#72b566',
                    progressColor: '#E5E9F2',
                    height:60
                  });

                  wavesurfer.on('ready', function () {
                      wavesurfer.play();
                  });
                  wavesurfer.on('finish', function () {
                      $('.fa-play').toggle(1)
                      $('.fa-pause').toggle(1)
                  });
                  this.wf=wavesurfer
                  wavesurfer.load(url);
                  $('#skipBackward').off('click').on('click',function(){
                      wavesurfer.skipBackward()
                  })
                  $('#playPause').off('click').on('click',function(){
                      $('.fa-play').toggle(1)
                      $('.fa-pause').toggle(1)
                      wavesurfer.playPause()
                  })
                  $('#skipForward').off('click').on('click',function(){
                      wavesurfer.skipForward()
                  })
                   //setInterval(function(){ //console.log(wavesurfer.getCurrentTime()); }, 100);
                  $('#toggleMute').off('click').on('click',function(){
                      //wavesurfer.toggleMute()
                  })
                  $('#submitForm').off('click').on('click',function(){
                    setTimeout(function(){
                      wavesurfer.destroy()
                    },100)
                  })
                  $(".el-dialog__headerbtn").off('click').on('click',function(){
                    setTimeout(()=>{ wavesurfer.destroy();},100)
                  })
                },200);
            }    
          if (res.data.data.survey.list) {
            this.survey= res.data.data.survey.list
          }
          if (res.data.data.answer.answer) {
            this.answer = res.data.data.answer.answer
            this.answer.forEach( function(element, index) {
              ////console.log(element)
              if (element.answered==1) {
                element.alp='A'
              }else if(element.answered==2){
                element.alp='B'
              }else if(element.answered==3){
                element.alp='C'
              }else if(element.answered==3){
                element.alp='D'
              }else{
                element.alp=''
              }
            });
            let that = this
            this.survey.forEach( function(element, index) {
              element.answer = that.answer[index]
              ////console.log(element)
              that.testPaper.push(element)
              ////console.log(that.testPaper)
            });
            //console.log(that.testPaper)
          }
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleCall(){
      let data ={
        admin_token:localStorage.token,
        project_id:Number(this.$route.query.id),
        type:this.form.call,
        call_status:this.form.call_result,
        call_result_type:this.form.jiesuanstandard[0]?this.form.jiesuanstandard[0]:0,
        settlement_result:this.form.jiesuanstandard[1]?this.form.jiesuanstandard[1]:0,
        quality:this.form.quality,
        start_long:this.form.start_long,
        end_long:this.form.end_long,
        phone:this.form.phone
      }
      console.log(data)
      this.$http('/yunying/statistics/detail_list',{},data,{},'get').then(res=>{
        console.log(res)
        if (res.data.code==1000&&res.data.data) {
          this.total = res.data.data.total
          this.tableData = res.data.data.list
          this.searchedTableData = this.tableData
          this.searchedTableData.forEach( function(element, index) {
            if (element.phone) {
              element.phone=element.phone.substr(0,3)+"****"+element.phone.substr(7);
            }
            if (element.note) {
              element.note = element.note.substr(0,6)
            }
          });
        }else{
          this.searchedTableData=[]
        }
      })
    },
    exportToExcel(isAll) {
      console.log(this.searchedTableData)
      if (this.searchedTableData.length>0) {
        let data ={
          admin_token:localStorage.token,
          project_id:Number(this.$route.query.id),
          type:this.form.call,
          call_status:this.form.call_result,
          call_result_type:this.form.jiesuanstandard[0]?this.form.jiesuanstandard[0]:0,
          settlement_result:this.form.jiesuanstandard[1]?this.form.jiesuanstandard[1]:0,
          quality:this.form.quality,
          start_long:this.form.start_long,
          end_long:this.form.end_long,
          phone:this.form.phone
        }
        console.log(data)
        let call_result_type=this.form.jiesuanstandard[0]?this.form.jiesuanstandard[0]:0
        let settlement_result=this.form.jiesuanstandard[1]?this.form.jiesuanstandard[1]:0
        this.$message('正在导出');
        window.location.href='https://api.yunkezaijia.com/yunying/statistics/export?admin_token='+localStorage.token+'&project_id='+Number(this.$route.query.id)+'&type='+this.form.call+'&call_status='+this.form.call_result+'&call_result_type='+call_result_type+'&settlement_result='+settlement_result+'&quality='+this.form.quality+'&start_long='+this.form.start_long+'&end_long='+this.form.end_long+'&phone='+this.form.phone
        // var name = '数据表',
        //   theader = ['客户号码', '通话日期', '云客', '呼叫结果', '通话时长', '通话结果', '拨打次数', '质检结果', '工单备注'],
        //   filterVal = ['phone', 'call_date', 'user_id', 'call_result', 'long', 'standart_title', 'call_times','quality_feedback','note'],
        //   data = '';
        // if (isAll) {
        //   data = this.tableData;
        //   if (this.tableData.length > 0) {
        //     exportExcel(name, theader, filterVal, data)
        //   } else {
        //     this.$message({
        //       type: 'info',
        //       message: '没有数据'
        //     });
        //   }
        // } 
       }else{
        this.$message({
          type:'warning',
          message:'无可导出数据'
        })
       }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data={
            admin_token:localStorage.token,
            project_id:Number(this.$route.query.id),
            record_id:this.quality._id,
            standard_id:this.quality.call_result,
            kefu_id:this.quality.user_id,
            qc_res:this.ruleForm.result,
            error_level:this.ruleForm.error==''?this.ruleForm.error:this.ruleForm.hege,
            error_level_two:this.ruleForm.type,
            qc_note:this.ruleForm.comment
          }
          console.log(data)
          this.$http('/yunying/project/qc_save',data,{},{},'post').then(res=>{
            console.log(res)
            if (res.data.code==1000) {
              this.getData()
              $("#waveform").children().remove(); 
              this.dialogTableVisible = false
              this.$refs[formName].resetFields();
              this.$message({
                type:'success',
                message:'提交成功'
              })
            }else{
              this.$message({
                type:'warning',
                message:res.data.error
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted(){
       // $('#skipBackward').on('click',function(){
       //    wavesurfer.skipBackward()
       // })
       // $('#playPause').on('click',function(){
       //    wavesurfer.playPause()
       // })
       // $('#skipForward').on('click',function(){
       //    wavesurfer.skipForward()
       // })
       // //setInterval(function(){ console.log(wavesurfer.getCurrentTime()); }, 100);
       // $('#toggleMute').on('click',function(){
       //    wavesurfer.toggleMute()
       // })
    },
    beforeDestroy (){
       //console.log(this.wf)
       //暂停
       //this.wf.playPause();
       if (this.wf!='') {
        this.wf.destroy();
       }
       //this.wf.backend.ac.state='';

       //console.log(this.wf.bmediaContainer.baseURI)
    },
  filters: {
      // filterBynum(val, args) {
      //   //console.log(val)
      //   //console.log(args)
      //   return val.slice(args.num, args.num + 10)
      // }
    }
}
</script>

<style scoped>
/* 头部 */
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
.bg-purple-dark {
    background: #e5e9f2;
  }
.grid-content {
    min-height: 50px;
  }
.grid-content h2{float: left;font-size: 18px;margin:15px 0 0 20px;}
/* top */
.top{width: 100%;height: 30px;margin-left: 20px}
.top p{float: left;width: 130px;height: 30px;background: #f2f2f2;border-radius: 78px;text-align: center;line-height: 30px;font-size: 14px;margin-right: 10px}
/* middle */
.middle{width: 100%;height: 30px;margin:20px 0 0 20px}
.middle .el-select{float: left;margin-right: 10px}
.middle button{float: left;}
.wenhao{width: 20px;height: 20px;border-radius: 50%;border:1px solid #f2f2f2;float: left;text-align: center;line-height: 20px;font-weight: 600;margin: 6px 0 0 10px}
.el-table .cell{font-size: 12px!important}
.con-l{width:65%;min-height: 228px;float: left;}
.con-l p:nth-of-type(2){margin-top: 15px;height: 21px}
.con-l p:nth-of-type(3){margin-top: 20px;height: 21px}
.con-l p:nth-of-type(4){margin-top: 20px;height: 21px}
.con-l p:nth-of-type(5){margin-top: 20px;min-height: 21px}
.con-m::-webkit-scrollbar-thumb{background: #324157;width: 3px}
.con-m::-webkit-scrollbar-track{background: #ccc;width: 3px}
.con-m::-webkit-scrollbar {width: 3px}
.answer::-webkit-scrollbar-thumb{background: #324157;width: 3px}
.answer::-webkit-scrollbar-track{background: #ccc;width: 3px;}
.answer::-webkit-scrollbar{width: 3px}
.el-tag{background: #fff;color:#000;font-size: 12px;width: 100%}
.el-tag:hover{cursor: pointer}
.paper:hover{background: #fff}
.kehu .el-form-item{margin-bottom: 0;}
.kehu::-webkit-scrollbar-thumb{background: #324157;width: 3px}
.kehu::-webkit-scrollbar-track{background: #ccc;width: 3px;}
.kehu::-webkit-scrollbar{width: 3px}
.el-form-item{margin-bottom: 16px}
.el-form-item:nth-of-type(4),.el-form-item:nth-of-type(5){margin-bottom: 0}
</style>
<style>
  #ProjectsListCall .el-table td, .el-table th.is-leaf{text-align: center}
  .el-table .cell{font-size: 12px!important}
  .el-table th>.cell{text-align: center!important}
  #ProjectsListCall .el-dialog--small{max-height: 75%;overflow-y: auto;overflow-x:hidden;}
  #ProjectsListCall .el-dialog--small::-webkit-scrollbar-thumb{background: #324157;width: 3px}
  #ProjectsListCall .el-dialog--small::-webkit-scrollbar-track{background: #ccc;width: 3px}
  #ProjectsListCall .el-dialog--small::-webkit-scrollbar {width: 3px}
  #ProjectsListCall .el-dialog--small{width: 1200px}
  #ProjectsListCall .el-radio-button:last-child .el-radio-button__inner{border-radius:0;}
  #ProjectsListCall .el-radio-button:first-child .el-radio-button__inner{border-radius:0;}
  #ProjectsListCall .el-radio-button, .el-radio-button__inner{margin-right: 3px;border-radius:0;}
  #ProjectsListCall .el-radio-button__inner{border: 1px solid #bfcbd9}
  #ProjectsListCall .el-radio-button__orig-radio:checked+.el-radio-button__inner{border-color: #20a0ff}
  #ProjectsListCall .el-radio-button__orig-radio:checked+.el-radio-button__inner{box-shadow: -1px 0 0 0 #fff}
  #ProjectsListCall .el-checkbox-button:first-child .el-checkbox-button__inner{border-radius:0;}
  #ProjectsListCall .el-checkbox-button:last-child .el-checkbox-button__inner{border-radius:0;}
  #ProjectsListCall .el-checkbox-button__inner{border: 1px solid #bfcbd9;}
  #ProjectsListCall .el-checkbox-button, .el-checkbox-button__inner{margin-right: 3px}
</style>

