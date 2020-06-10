<template>
  <el-row>
    <el-steps :active="active" finish-status="success">
      <el-step title="税务局改地址"></el-step>
      <el-step title="NAR1周年申报表"></el-step>
      <el-step title="ND2A"></el-step>
      <el-step title="NR1註冊辦事處地址" :status="forthStatus"></el-step>
    </el-steps>

    <!-- 税务局改地址 page1 -->
    <el-form v-show="active === 1" class="page-content" ref="formPage1" :model="form" :rules="rules" label-width="150px">
      <el-row class="module-title">
        A.税务局改地址最新
      </el-row>
      <el-row class="form-item-container">
        <el-form-item label="總行商業登記號碼" prop="busiNumPage1">
          <el-input v-model="form.busiNumPage1" placeholder="请输入總行商業登記號碼"></el-input>
        </el-form-item>
        <el-form-item label="總行業務名稱" prop="busiNamePage1">
          <el-input v-model="form.busiNamePage1" placeholder="请输入總行業務名稱"></el-input>
        </el-form-item>
        <el-form-item label="原有地址" prop="originAddrPage1">
          <el-input v-model="form.originAddrPage1" placeholder="请输入原有地址"></el-input>
        </el-form-item>
        <el-form-item label="新營業地址" prop="newAddrPage1">
          <el-input v-model="form.newAddrPage1" placeholder="请输入新營業地址"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- NAR1周年申报表 page2 -->
    <el-form v-show="active ===2" class="page-content" ref="formPage2" :model="form" :rules="rules" label-width="150px">
      <el-row class="module-title">
        A.周年申報表 Annual Return
      </el-row>
      <el-row class="form-item-container">
        <el-form-item label="公司编号:" prop="cNum">
          <el-input v-model="form.cNum" placeholder="公司编号"></el-input>
        </el-form-item>
        <el-form-item label="公司英文名稱:" prop="cNameEn">
          <el-input v-model="form.cNameEn" placeholder="公司英文名称只能由字母以及符号和空格组成并以 LIMITED 结尾"></el-input>
        </el-form-item>
        <el-form-item label="公司中文名稱:" prop="cNameCn">
          <el-input v-model="form.cNameCn" placeholder="公司中文名称只能由数字或中文汉字以及符号与空格并以有限公司结尾"></el-input>
        </el-form-item>
        <el-form-item label="申報表的結算日期:" prop="settleDate">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.settleDate"
            style="width: 50%;"
            format="dd/MM/yyyy"
            value-format="dd/MM/yyyy"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="註冊辦事處地址:" prop="cRAddr">
          <el-input v-model="form.cRAddr" placeholder="公司所使用的註冊辦事處的建議地址"></el-input>
        </el-form-item>
      </el-row>
      <el-row class="module-title">B.提交人的资料　Presentor’s Reference</el-row>
      <el-row class="form-item-container">
        <el-form-item label="提交人信息">
          <el-radio-group v-model="submitUser.userInfo" @change="changeSubmitUser">
            <el-radio label="defaultUser">默认</el-radio>
            <el-radio label="selfUser">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提交人名稱:" prop="sUName">
          <el-input v-model="form.sUName" placeholder="提交人的中文名称"></el-input>
        </el-form-item>
        <el-form-item label="提交人地址:" prop="sUAddr">
          <el-input v-model="form.sUAddr" placeholder="提交人的地址"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提交人電話:" prop="sUPhone">
              <el-input v-model="form.sUPhone" placeholder="提交人電話"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提交人傳真:" prop="sUFax">
              <el-input v-model="form.sUFax" placeholder="提交人傳真"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="提交人電郵:" prop="sUEmail">
          <el-input v-model="form.sUEmail" placeholder="提交人電郵" type="email"></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- ND2A page3 -->
    <el-form v-show="active ===3" class="page-content" ref="formPage3" :model="form" :rules="rules" label-width="150px">
      <el-row class="module-title">
        A.更改公司秘書及董事通知書
      </el-row>
    </el-form>

    <!-- NR1 page4 -->
    <el-form v-show="active ===4" class="page-content" ref="formPage4" :model="form" :rules="rules" label-width="150px">
      <el-row class="module-title">
        A.註冊辦事處地址更改通知書
      </el-row>
    </el-form>

    <el-row class="btn-row">
      <el-button @click="prePage" v-show="active !== 1">上一步</el-button>
      <el-button @click="nextPage" v-show="active !== 4">下一步</el-button>
      <el-button @click="nextPage" v-show="active == 4">提交</el-button>
    </el-row>
  </el-row>
</template>

<script>
import defaultInfo from '@/config/defaultInfo'

export default {
  data() {
    return {
      active: 2,
      forthStatus: 'wait',

      form: {
        busiNumPage1: '',
        busiNamePage1: '',
        originAddrPage1: '',
        newAddrPage1: '',
        cNum: '',
        cNameEn: '',
        cNameCn: '',
        settleDate: '',

        cRAddr: defaultInfo.workAddrCn,

        sUName: defaultInfo.userName,
        sUAddr: defaultInfo.userAddr,
        sUPhone: defaultInfo.userPhone,
        sUFax: defaultInfo.userFax,
        sUEmail: defaultInfo.userEmail
      },
      submitUser: {
        userInfo: 'defaultUser'
      },

      rules: {
        busiNumPage1: [{ required: true, message: '请输入總行商業登記號碼' }],
        busiNamePage1: [{ required: true, message: '请输入總行業務名稱' }],
        originAddrPage1: [{ required: true, message: '请输入原有地址' }],
        newAddrPage1: [{ required: true, message: '请输入新營業地址' }],
        cNum: [{ required: true, message: '请输入公司编号' }],
        cNameEn: [{ required: true, message: '请输入公司英文名稱' }],
        cNameCn: [{ required: true, message: '请输入公司中文名稱' }],
        settleDate: [{ required: true, message: '请输入本申報表的結算日期' }],

        sUName: [{ required: true, message: '请输入提交人名稱' }],
        sUAddr: [{ required: true, message: '请输入提交人地址' }],
        sUPhone: [{ required: true, message: '请输入提交人電話' }],
        sUFax: [{ required: true, message: '请输入提交人傳真' }],
        sUEmail: [{ required: true, message: '请输入提交人電郵' }]
      }
    }
  },

  methods: {
    changeSubmitUser(value) {
      // 切换到自定义提交人
      if (value == 'selfUser') {
        this.form = {
          ...this.form,
          sUName: '',
          sUAddr: '',
          sUPhone: '',
          sUFax: '',
          sUEmail: '',
          cSType: ''
        }
      } else {
        this.form = {
          ...this.form,
          sUName: defaultInfo.userName,
          sUAddr: defaultInfo.userAddr,
          sUPhone: defaultInfo.userPhone,
          sUFax: defaultInfo.userFax,
          sUEmail: defaultInfo.userEmail,
          cSType: defaultInfo.companyStockType
        }
      }
    },

    prePage() {
      if (this.active > 1) {
        this.active -= 1
      }
      this.forthStatus = 'wait'
    },

    nextPage() {
      const formObj = {
        1: 'formPage1',
        2: 'formPage2',
        3: 'formPage3',
        4: 'formPage4'
      }

      this.$refs[formObj[this.active]].validate(valid => {
        if (valid) {
          this.active += 1
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
