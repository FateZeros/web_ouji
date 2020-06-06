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
        1.税务局改地址最新
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
        2.周年申報表
      </el-row>
    </el-form>

    <!-- ND2A page3 -->
    <el-form v-show="active ===3" class="page-content" ref="formPage3" :model="form" :rules="rules" label-width="150px">
      <el-row class="module-title">
        3.更改公司秘書及董事通知書
      </el-row>
    </el-form>

    <!-- NR1 page4 -->
    <el-form v-show="active ===4" class="page-content" ref="formPage4" :model="form" :rules="rules" label-width="150px">
      <el-row class="module-title">
        4.註冊辦事處地址更改通知書
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
export default {
  data() {
    return {
      active: 1,
      forthStatus: 'wait',

      form: {
        busiNumPage1: '',
        busiNamePage1: '',
        originAddrPage1: '',
        newAddrPage1: ''
      },

      rules: {
        busiNumPage1: [{ required: true, message: '请输入總行商業登記號碼' }],
        busiNamePage1: [{ required: true, message: '请输入總行業務名稱' }],
        originAddrPage1: [{ required: true, message: '请输入原有地址' }],
        newAddrPage1: [{ required: true, message: '请输入新營業地址' }]
      }
    }
  },

  methods: {
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
