<template>
    <el-form :model="form" :rules="rules" ref="form" label-width="150px">
      <el-steps :active="active" finish-status="success">
        <el-step title="初始化表单"></el-step>
        <el-step title="股本与股东"></el-step>
        <el-step title="步骤 3" :status="thirdStatus"></el-step>
      </el-steps>

      <!-- page1 -->
      <el-row v-show="active == 0" class="ncc1-page">
        <el-row class="nnc1-module-title">A.填写公司基础信息 Basic Information Company</el-row>
        <el-row class="form-item-container">
          <el-form-item label="法定文件版本">
            <el-radio-group v-model="form.language">
              <el-radio label="繁体中文　Traditional" value="cn"></el-radio>
              <el-radio label="英文　English" value="en"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公司英文名稱:" prop="companyNameEn">
            <el-input v-model="form.companyNameEn" placeholder="公司英文名称只能由字母以及符号和空格组成并以 LIMITED 结尾"></el-input>
          </el-form-item>
          <el-form-item label="公司中文名稱:" prop="companyNameCn">
            <el-input v-model="form.companyNameCn" placeholder="公司中文名称只能由数字或中文汉字以及符号与空格并以有限公司结尾"></el-input>
          </el-form-item>
          <el-form-item label="註冊辦事處地址:" prop="companyRegistAddr">
            <el-input v-model="form.companyRegistAddr" placeholder="公司所使用的註冊辦事處的建議地址"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="nnc1-module-title">B.提交人的资料　Presentor’s Reference</el-row>
        <el-row class="form-item-container">
          <el-form-item label="提交人信息">
            <el-radio-group v-model="submitUser.userInfo">
              <el-radio label="默认" value="defaultUser"></el-radio>
              <el-radio label="自定义" value="selfUser"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公司名稱:" prop="submitUserName">
            <el-input v-model="form.submitUserName" placeholder="提交人的中文名称"></el-input>
          </el-form-item>
          <el-form-item label="提交人地址:" prop="submitUserAddr">
            <el-input v-model="form.submitUserAddr" placeholder="提交人的地址"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="提交人電話:" prop="submitUserPhone">
                <el-input v-model="form.submitUserPhone" placeholder="提交人電話"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交人傳真:" prop="submitUserFax">
                <el-input v-model="form.submitUserFax" placeholder="提交人傳真"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提交人電郵:" prop="submitUserEmail">
                <el-input v-model="form.submitUserEmail" placeholder="提交人電郵"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-row>

      <!-- page2 -->
      <el-row v-show="active == 1" class="ncc1-page">
        <el-row class="nnc1-module-title">A：股本信息　Share Capital</el-row>
      </el-row>

      <!-- page3 -->
      <el-row v-show="active == 2" class="ncc1-page">
        步骤3
      </el-row>

      <el-row class="btn-row">
        <el-button @click="prePage" v-show="active !== 0">上一步</el-button>
        <el-button @click="nextPage" v-show="active !== 2">下一步</el-button>
        <el-button @click="nextPage" v-show="active == 2">提交</el-button>
      </el-row>
    </el-form>
</template>

<script>
import submitUserInfo from '@/config/submitUser'

export default {
  data() {
    return {
      active: 0,
      thirdStatus: 'wait',
      form: {
        language: '',
        companyNameEn: '',
        companyNameCn: '',
        companyRegistAddr: '',
        submitUserName: submitUserInfo.userName,
        submitUserAddr: submitUserInfo.userAddr,
        submitUserPhone: submitUserInfo.userPhone,
        submitUserFax: submitUserInfo.userFax,
        submitUserEmail: submitUserInfo.userEmail
      },
      submitUser: {
        userInfo: 'defaultUser'
      },
      rules: {

      }
    }
  },

  methods: {
    prePage() {
      if (this.active > 0) {
        this.active = this.active - 1
      }    
      this.thirdStatus = 'wait'
    },

    nextPage() {
      if (this.active < 2) {
        this.active = this.active + 1
      } else {
        this.thirdStatus = 'success'
        console.log(this.active)
      } 
    }
  }
}
</script>

<style scoped>
.ncc1-page {
  margin-top: 20px;
}

.form-item-container {
  width: 80%;
  margin: 0 auto;
}

.nnc1-module-title {
  padding: 10px 0;
  border-bottom: 1px solid #333;
  margin-bottom: 16px;
}

.btn-row {
  width: 80%;
  margin: 0 auto;
  text-align: right;
}
</style>


