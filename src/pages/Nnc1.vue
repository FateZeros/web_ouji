<template>
  <el-row>
    <el-steps
      :active="active"
      finish-status="success"
    >
      <el-step title="初始化表单"></el-step>
      <el-step title="股本与股东"></el-step>
      <el-step title="首任秘書"></el-step>
      <el-step
        title="首任董事"
        :status="forthStatus"
      ></el-step>
    </el-steps>

    <!-- page1 -->
    <el-form
      v-show="active == 0"
      class="ncc1-page"
      ref="formPage0"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-row class="nnc1-module-title">A.填写公司基础信息 Basic Information Company</el-row>
      <el-row class="form-item-container">
        <el-form-item label="法定文件版本">
          <el-radio-group
            v-model="form.language"
            @change="changeLanguage"
          >
            <el-radio label="cn">繁体中文　Traditional</el-radio>
            <el-radio label="en">英文　English</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="註冊辦事處地址:"
          prop="cRAddr"
        >
          <el-input
            v-model="form.cRAddr"
            placeholder="公司所使用的註冊辦事處的建議地址"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="公司英文名稱:"
          prop="cNameEn"
        >
          <el-input
            v-model="form.cNameEn"
            placeholder="公司英文名称只能由字母以及符号和空格组成并以 LIMITED 结尾"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="公司中文名稱:"
          prop="cNameCn"
        >
          <el-input
            v-model="form.cNameCn"
            placeholder="公司中文名称只能由数字或中文汉字以及符号与空格并以有限公司结尾"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row class="nnc1-module-title">B.提交人的资料　Presentor’s Reference</el-row>
      <el-row class="form-item-container">
        <el-form-item label="提交人信息">
          <el-radio-group
            v-model="submitUser.userInfo"
            @change="changeSubmitUser"
          >
            <el-radio label="defaultUser">默认</el-radio>
            <el-radio label="selfUser">自定义</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="提交人名稱:"
          prop="sUName"
        >
          <el-input
            v-model="form.sUName"
            placeholder="提交人的中文名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="提交人地址:"
          prop="sUAddr"
        >
          <el-input
            v-model="form.sUAddr"
            placeholder="提交人的地址"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="提交人電話:"
              prop="sUPhone"
            >
              <el-input
                v-model="form.sUPhone"
                placeholder="提交人電話"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="提交人傳真:"
              prop="sUFax"
            >
              <el-input
                v-model="form.sUFax"
                placeholder="提交人傳真"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="提交人電郵:"
          prop="sUEmail"
        >
          <el-input
            v-model="form.sUEmail"
            placeholder="提交人電郵"
            type="email"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- page2 -->
    <el-form
      v-show="active == 1"
      class="ncc1-page"
      ref="formPage1"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-row class="nnc1-module-title">A：股本信息　Share Capital</el-row>
      <el-row class="form-item-container">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="股份的類別:"
              prop="cSType"
            >
              <el-input
                v-model="form.cSType"
                placeholder="股份的類別"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="貨幣:"
              prop="cSCurrency"
            >
              <el-input
                v-model="form.cSCurrency"
                placeholder="貨幣(HKD)"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="建議發行股份總數:"
            prop="cSTotal"
          >
            <el-input
              v-model="form.cSTotal"
              placeholder="建議發行股份總數(数字)"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-row>
      <el-row class="nnc1-module-title">B：创办成员/股东信息　Founder Members</el-row>
      <el-row class="form-item-container">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="中文姓名:"
              prop="fNameCn"
            >
              <el-input
                v-model="form.fNameCn"
                placeholder="必须为中文"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="英文姓名:"
              prop="fNameEn"
            >
              <el-input
                v-model="form.fNameEn"
                placeholder="姓和名必须以'-'分割，如WU-JIANMIN"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="地址:"
          prop="fAddr"
        >
          <el-input
            v-model="form.fAddr"
            placeholder="联络地址或证件地址"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="國家／地區:"
              prop="fCountry"
            >
              <el-input
                v-model="form.fCountry"
                placeholder="國家／地區"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="占股份的数目:"
              prop="fStockNum"
            >
              <el-input
                v-model="form.fStockNum"
                placeholder="小于等于發行股份總數"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-checkbox-group v-model="form.isChairman">
            <el-checkbox name="isChairman">作为董事 (如作为董事该信息将体现在董事栏)</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-row v-show="form.isOtherChairman">
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="中文姓名:"
                prop="fNameCn1"
              >
                <el-input
                  v-model="form.fNameCn1"
                  placeholder="必须为中文"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="英文姓名:"
                prop="fNameEn1"
              >
                <el-input
                  v-model="form.fNameEn1"
                  placeholder="如WU JIANMIN"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="地址:"
            prop="fAddr1"
          >
            <el-input
              v-model="form.fAddr1"
              placeholder="联络地址或证件地址"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="國家／地區:"
                prop="fCountry1"
              >
                <el-input
                  v-model="form.fCountry1"
                  placeholder="國家／地區"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="占股份的数目:"
                prop="fStockNum1"
              >
                <el-input
                  v-model="form.fStockNum1"
                  placeholder="小于等于發行股份總數"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-form-item>
          <el-checkbox-group
            v-model="form.isOtherChairman"
            @change="changeOtherMem"
          >
            <el-checkbox name="isOtherChairman">添加另外一位成员 (如果超过2位成员/股东，请自行续页)</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- page3 -->
    <el-form
      v-show="active == 2"
      class="ncc1-page"
      ref="formPage2"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-row class="nnc1-module-title">首任秘书　First Secretary</el-row>
      <el-row class="form-item-container">
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="公司編號:"
              prop="cNumber"
            >
              <el-input
                v-model="form.cNumber"
                placeholder="公司編號"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="公司邮件:"
              prop="cEmail"
            >
              <el-input
                v-model="form.cEmail"
                placeholder="公司邮件(NIL)"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="公司中文名稱:"
          prop="sNameCn"
        >
          <el-input
            v-model="form.sNameCn"
            placeholder="公司中文名稱"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="公司英文名稱:"
          prop="sNameEn"
        >
          <el-input
            v-model="form.sNameEn"
            placeholder="公司英文名稱"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="香港地址:"
          prop="sHKAddr"
        >
          <el-input
            v-model="form.sHKAddr"
            placeholder="香港地址"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>

    <!-- page4 -->
    <el-form
      v-show="active == 3"
      class="ncc1-page"
      ref="formPage3"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-row class="nnc1-module-title">首任董事　First Directors</el-row>
      <el-row class="form-item-container">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="董事姓名:"
              prop="chNameCn"
            >
              <el-input
                v-model="form.chNameCn"
                placeholder="中文姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="英文姓名:"
              prop="chSureName"
            >
              <el-input
                v-model="form.chSureName"
                placeholder="英文姓式"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="英文姓名:"
              prop="chOtherName"
            >
              <el-input
                v-model="form.chOtherName"
                placeholder="英文名字"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="國家／地區:"
          prop="chCountry"
        >
          <el-input
            v-model="form.chCountry"
            placeholder="國家／地區"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="住址:"
          prop="chAddr"
        >
          <el-input
            v-model="form.chAddr"
            placeholder="联络地址或证件地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型:">
          <el-radio-group
            v-model="form.certificateType"
            @change="changeCertificateType"
          >
            <el-radio label="chinaId">中国身份证号码</el-radio>
            <el-radio label="hkId">香港身份证号码</el-radio>
            <el-radio label="passport">護照</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-show="form.certificateType == 'chinaId'"
          prop="chChinaId"
        >
          <el-input
            v-model="form.chChinaId"
            placeholder="个人董事在中国大陆的身份证号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="form.certificateType == 'hkId'"
          prop="chHKId"
        >
          <el-input
            v-model="form.chHKId"
            placeholder="个人董事在香港身份证号码"
          ></el-input>
        </el-form-item>
        <el-row v-show="form.certificateType == 'passport'">
          <el-col :span="12">
            <el-form-item
              label="護照簽發國家:"
              prop="psCountry"
            >
              <el-input
                v-model="form.psCountry"
                placeholder="護照簽發國家"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="護照號碼:"
              prop="psNumber"
            >
              <el-input
                v-model="form.psNumber"
                placeholder="護照號碼"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
              <el-form-item label="姓名簽署:" prop="fNameSigned">
                  <el-input v-model="form.fNameSigned" placeholder="姓名簽署"></el-input>
              </el-form-item>
            </el-col> -->
          <el-col :span="12">
            <el-form-item
              label="簽署日期:"
              prop="fDateSigned"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.fDateSigned"
                style="width: 100%;"
                format="dd/MM/yyyy"
                value-format="dd/MM/yyyy"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
    </el-form>

    <el-row class="btn-row">
      <el-button
        @click="prePage"
        v-show="active !== 0"
      >上一步</el-button>
      <el-button
        @click="nextPage"
        v-show="active !== 3"
      >下一步</el-button>
      <el-button
        @click="nextPage"
        v-show="active == 3"
      >提交</el-button>
    </el-row>
  </el-row>
</template>

<script>
import defaultInfo from '@/config/defaultInfo'
import { ProduceWord } from '@/api'

export default {
  data() {
    const validateFunderNameEn = (rule, value, cb) => {
      const arr = value.split(' ')
      if (arr[0] && arr[1]) {
        cb()
      } else {
        cb(new Error('必须以空格隔开'))
      }
    }

    const validateCName = (rule, value, cb) => {
      const cnameReg = /\.(LIMITED|limited)$/
      if (cnameReg.test(value)) {
        cb()
      } else {
        cb(new Error('公司名称必须以 .LIMITED / .limited 结尾'))
      }
    }

    return {
      active: 0,
      forthStatus: 'wait',
      form: {
        language: 'cn',
        cNameEn: '',
        cNameCn: '',
        cRAddr: defaultInfo.workAddrCn,
        sUName: defaultInfo.userName,
        sUAddr: defaultInfo.userAddr,
        sUPhone: defaultInfo.userPhone,
        sUFax: defaultInfo.userFax,
        sUEmail: defaultInfo.userEmail,
        cSType: defaultInfo.companyStockTypeCn,
        cSCurrency: defaultInfo.companyCurrenyCn,
        cSTotal: defaultInfo.stockTotal,
        fNameCn: '',
        fNameEn: '',
        fAddr: '',
        fCountry: '',
        fStockNum: '',

        fNameCn1: 'NIL',
        fNameEn1: 'NIL',
        fAddr1: 'NIL',
        fCountry1: 'NIL',
        fStockNum1: 'NIL',
        cSType1: 'NIL',
        cSCurrency1: 'NIL',
        fStockNumC1: 'NIL',

        // 是否作为懂事
        isChairman: false,
        // 是否添加另外一位成员
        isOtherChairman: false,

        cNumber: defaultInfo.companyNumber,
        cEmail: 'NIL',
        sNameCn: defaultInfo.secretaryNameCn,
        sNameEn: defaultInfo.secretaryNameEn,
        sHKAddr: defaultInfo.secretaryHKAddr,

        chNameCn: '',
        chSureName: '',
        chOtherName: '',
        chCountry: '',
        chAddr: '',

        // fNameSigned: '',
        fDateSigned: '',

        // 证件类型
        certificateType: 'chinaId',
        chChinaId: '',
        chHKId: 'NIL',
        psCountry: 'NIL',
        psNumber: 'NIL',

        // 香港id分成9个单独数字
        idN1: 'NIL',
        idN2: 'NIL',
        idN3: 'NIL',
        idN4: 'NIL',
        idN5: 'NIL',
        idN6: 'NIL',
        idN7: 'NIL',
        idN8: 'NIL',
        idN9: 'NIL'
      },
      submitUser: {
        userInfo: 'defaultUser'
      },
      rules: {
        cNameEn: [
          { required: true, message: '请输入公司英文名稱' },
          { validator: validateCName }
        ],
        cNameCn: [
          { required: true, message: '请输入公司中文名稱' },
          { validator: validateCName }
        ],
        cRAddr: [{ required: true, message: '请输入註冊辦事處地址' }],
        sUName: [{ required: true, message: '请输入提交人名稱' }],
        sUAddr: [{ required: true, message: '请输入提交人地址' }],
        sUPhone: [{ required: true, message: '请输入提交人電話' }],
        sUFax: [{ required: true, message: '请输入提交人傳真' }],
        sUEmail: [{ required: true, message: '请输入提交人電郵' }],

        cSType: [{ required: true, message: '请输入股份的類別' }],
        cSCurrency: [{ required: true, message: '请输入貨幣' }],
        cSTotal: [{ required: true, message: '请输入建議發行的股份總數' }],
        fNameCn: [{ required: true, message: '请输入中文姓名' }],
        fNameEn: [
          { required: true, message: '请输入英文姓名' },
          { validator: validateFunderNameEn }
        ],
        fAddr: [{ required: true, message: '请输入地址' }],
        fCountry: [{ required: true, message: '请输入國家／地區' }],
        fStockNum: [{ required: true, message: '请输入占股份的数目' }],

        fNameCn1: [{ required: true, message: '请输入中文姓名' }],
        fNameEn1: [{ required: true, message: '请输入英文姓名' }],
        fAddr1: [{ required: true, message: '请输入地址' }],
        fCountry1: [{ required: true, message: '请输入國家／地區' }],
        fStockNum1: [{ required: true, message: '请输入占股份的数目' }],

        cNumber: [{ required: true, message: '请输入公司編號' }],
        // companyEmail: [
        //   { required: true, message: '请输入公司邮件' }
        // ],
        sNameCn: [{ required: true, message: '公司中文名稱' }],
        sNameEn: [{ required: true, message: '公司英文名稱' }],
        sHKAddr: [{ required: true, message: '香港地址' }],

        chNameCn: [{ required: true, message: '请输入董事姓名' }],
        chSureName: [{ required: true, message: '请输入英文姓式' }],
        chOtherName: [{ required: true, message: '请输入英文名字' }],
        chCountry: [{ required: true, message: '请输入國家／地區' }],
        chAddr: [{ required: true, message: '请输入联络地址或证件地址' }],
        chChinaId: [
          { required: true, message: '请输入中国大陆的身份证号码' }
          // { validator: validateRequire }
        ],
        chHKId: [
          { required: true, message: '请输入香港身份证号码' }
          // { validator: validateRequire }
        ],
        psCountry: [
          { required: true, message: '请输入護照簽發國家' }
          // { validator: validateRequire }
        ],
        psNumber: [
          { required: true, message: '请输入護照號碼' }
          // { validator: validateRequire }
        ],
        // fNameSigned: [{ required: true, message: '请输入姓名簽署' }],
        fDateSigned: [{ required: true, message: '请输入选择日期' }]
      }
    }
  },

  methods: {
    changeLanguage(value) {
      if (value == 'cn') {
        this.form = {
          ...this.form,
          cRAddr: defaultInfo.workAddrCn,
          cSType: defaultInfo.companyStockTypeCn,
          cSCurrency: defaultInfo.companyCurrenyCn,
          cSTotal: defaultInfo.stockTotal
        }
      } else {
        this.form = {
          ...this.form,
          cRAddr: defaultInfo.workAddrEn,
          cSType: defaultInfo.companyStockTypeEn,
          cSCurrency: defaultInfo.companyCurrenyEn,
          cSTotal: defaultInfo.stockTotal
        }
      }
    },

    changeOtherMem(value) {
      if (!value) {
        this.form = {
          ...this.form,
          fNameCn1: 'NIL',
          fNameEn1: 'NIL',
          fAddr1: 'NIL',
          fCountry1: 'NIL',
          fStockNum1: 'NIL'
        }
      }
    },

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

    changeCertificateType(value) {
      this.form = {
        ...this.form,
        chChinaId: value == 'chinaId' ? '' : 'NIL',
        chHKId: value == 'hkId' ? '' : 'NIL',
        psCountry: value == 'passport' ? '' : 'NIL',
        psNumber: value == 'passport' ? '' : 'NIL'
      }
    },

    prePage() {
      if (this.active > 0) {
        this.active = this.active - 1
      }
      this.forthStatus = 'wait'
    },

    nextPage() {
      const formObj = {
        0: 'formPage0',
        1: 'formPage1',
        2: 'formPage2',
        3: 'formPage3'
      }
      this.$refs[formObj[this.active]].validate(valid => {
        if (valid) {
          if (this.active < 3) {
            // 如果第2页的作为董事勾选
            if (this.active == 1 && this.form.isChairman) {
              const { fNameCn, fAddr, fCountry } = this.form
              const [chSureName, chOtherName] = this.form.fNameEn.split('-')
              this.form = {
                ...this.form,
                chNameCn: fNameCn,
                chSureName,
                chOtherName,
                chAddr: fAddr,
                chCountry: fCountry
              }
            }
            this.active = this.active + 1
          } else {
            const params = Object.assign({}, this.form)
            delete params.isChairman
            delete params.language
            params.fNameEn = params.fNameEn.split('-').join(' ')
            // console.log(params)
            // 如果选中的是 HKID
            if (params.certificateType == 'hkId') {
              const [
                hkId1 = 'NIL',
                hkId2 = 'NIL',
                hkId3 = 'NIL',
                hkId4 = 'NIL',
                hkId5 = 'NIL',
                hkId6 = 'NIL',
                hkId7 = 'NIL',
                hkId8 = 'NIL',
                hkId9 = 'NIL'
              ] = Array.from(params.chHKId)
              console.log(Array.from(params.chHKId))
              params.idN1 = hkId1
              params.idN2 = hkId2
              params.idN3 = hkId3
              params.idN4 = hkId4
              params.idN5 = hkId5
              params.idN6 = hkId6
              params.idN7 = hkId7
              params.idN8 = hkId8
              params.idN9 = hkId9
            }
            delete params.certificateType
            // 如果添加另外一位股东
            if (params.isOtherChairman) {
              params.cSType1 = params.cSType
              params.cSCurrency1 = params.cSCurrency
              params.fStockNumC1 = params.cSCurrency + params.fStockNum1
            }
            delete params.isOtherChairman
            // console.log(params)
            this.produceWord('NNC1', params)
          }
        } else {
          return false
        }
      })
    },

    produceWord(wordName, wordParams) {
      const data = {
        docxName: wordName,
        docxParams: wordParams
      }

      ProduceWord(data)
        .then(() => {
          this.forthStatus = 'success'
          const url = `/output/${wordName}`
          const fileName = `${wordName}.docx`
          this.$alert(
            `<a href=${url} download=${fileName}>${fileName}</a>`,
            'WORD 下载，点击下载',
            {
              dangerouslyUseHTMLString: true
            }
          )
        })
        .catch(({ code, msg }) => {
          this.$message({
            message: msg,
            type: 'error',
            duration: 2000
          })
        })
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
</style>


