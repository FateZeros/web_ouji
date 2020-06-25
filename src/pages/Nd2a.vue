<template>
    <el-row>
        <el-steps :active="active" finish-status="success">
          <el-step title="公司秘書／董事的停任"></el-step>
          <el-step title="提交人的资料"></el-step>
          <el-step title="委任公司秘書／董事" :status="forthStatus"></el-step>
        </el-steps>

        <!-- page1 -->
        <el-form v-show="active == 0" class="ncc1-page" ref="formPage0" :model="form" :rules="rules" label-width="150px">
            <el-row class="nnc1-module-title">A.公司秘書／董事的停任 Cessation to Act as Company Secretary／Director</el-row>
            <el-row class="form-item-container">
              <el-form-item label="公司編號:" prop="cNumber">
                <el-input v-model="form.cNumber" placeholder="输入公司编号"></el-input>
              </el-form-item>
              <el-form-item label="公司英文名稱:" prop="cNameEn">
                <el-input v-model="form.cNameEn" placeholder="公司英文名称只能由字母以及符号和空格组成并以 LIMITED 结尾"></el-input>
              </el-form-item>
              <el-form-item label="公司中文名稱:" prop="cNameCn">
                <el-input v-model="form.cNameCn" placeholder="公司中文名称只能由数字或中文汉字以及符号与空格并以有限公司结尾"></el-input>
              </el-form-item>
            </el-row>

            <el-row class="nnc1-module-title">B.公司秘書／董事的詳情 (自然人) Particulars of Company Secretary／Director</el-row>
            <el-row class="form-item-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="中文姓名:" prop="chNameCn">
                      <el-input v-model="form.chNameCn" placeholder="中文姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="英文姓名:" prop="chSureName">
                      <el-input v-model="form.chSureName" placeholder="英文姓式"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="英文姓名:" prop="chOtherName">
                      <el-input v-model="form.chOtherName" placeholder="英文名字"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="证件类型:">
                  <el-radio-group v-model="form.certificateType" @change="changeCertificateType">
                    <el-radio label="chinaId">身份證明CHINA ID</el-radio>
                    <el-radio label="hkId">身份分證明HongKong ID</el-radio>
                    <el-radio label="passport">護照</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item v-show="form.certificateType == 'chinaId'" label="大陆身份证明ID:" prop="chChinaId">
                <el-input v-model="form.chChinaId" placeholder="中国大陆身份证明"></el-input>
              </el-form-item>
              <el-form-item v-show="form.certificateType == 'hkId'" prop="chHKId">
                  <el-input v-model="form.chHKId" placeholder="个人董事在香港身份证号码"></el-input>
              </el-form-item>
              <el-row v-show="form.certificateType == 'passport'">
                  <el-col :span="12">
                      <el-form-item label="護照簽發國家:" prop="psCountry">
                        <el-input v-model="form.psCountry" placeholder="護照簽發國家"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="護照號碼:" prop="psNumber">
                        <el-input v-model="form.psNumber" placeholder="護照號碼"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-form-item label="停任日期:" prop="leaveDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.leaveDate"
                  style="width: 100%;"
                  format="dd/MM/yyyy"
                  value-format="dd/MM/yyyy"
                ></el-date-picker>
              </el-form-item>
            </el-row>
        </el-form>

        <!-- page2 -->
        <el-form v-show="active == 1" class="ncc1-page" ref="formPage1" :model="form" :rules="rules" label-width="150px">
          <el-row class="nnc1-module-title">提交人的资料　Presentor’s Reference</el-row>
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

        <!-- page3 -->
        <el-form v-show="active == 2" class="ncc1-page" ref="formPage2" :model="form" :rules="rules" label-width="150px">
          <el-row class="nnc1-module-title">委任公司秘書／董事　Appointment of Company Secretary／Director</el-row>
          <el-row class="form-item-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="中文姓名:" prop="wNameCn">
                      <el-input v-model="form.wNameCn" placeholder="中文姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="英文姓名:" prop="wSureName">
                      <el-input v-model="form.wSureName" placeholder="英文姓式"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="英文姓名:" prop="wOtherName">
                      <el-input v-model="form.wOtherName" placeholder="英文名字"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="地址:" prop="wAddr">
                <el-input v-model="form.wAddr" placeholder="联络地址或证件地址"></el-input>
              </el-form-item>
              <el-form-item label="國家／地區:" prop="wCountry">
                  <el-input v-model="form.wCountry" placeholder="國家／地區"></el-input>
              </el-form-item>

              <el-form-item label="证件类型:">
                  <el-radio-group v-model="form.certificateType2" @change="changeCertificateType2">
                    <el-radio label="wchinaId">中国身份证明</el-radio>
                    <el-radio label="whkId">香港身份证明</el-radio>
                    <el-radio label="wpassport">護照</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item v-show="form.certificateType2 == 'wchinaId'" label="大陆身份证明ID:" prop="wChinaId">
                <el-input v-model="form.wChinaId" placeholder="中国大陆身份证明"></el-input>
              </el-form-item>
              <el-form-item v-show="form.certificateType2 == 'whkId'" prop="wHKId">
                  <el-input v-model="form.wHKId" placeholder="个人董事在香港身份证号码"></el-input>
              </el-form-item>
              <el-row v-show="form.certificateType2 == 'wpassport'">
                  <el-col :span="12">
                      <el-form-item label="護照簽發國家:" prop="wpsCountry">
                        <el-input v-model="form.wpsCountry" placeholder="護照簽發國家"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="護照號碼:" prop="wpsNumber">
                        <el-input v-model="form.wpsNumber" placeholder="護照號碼"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>

              <el-form-item label="委任日期:" prop="wDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.wDate"
                  style="width: 100%;"
                  format="dd/MM/yyyy"
                  value-format="dd/MM/yyyy"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="簽署日期:" prop="signDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.signDate"
                  style="width: 100%;"
                  format="dd/MM/yyyy"
                  value-format="dd/MM/yyyy"
                ></el-date-picker>
              </el-form-item>
          </el-row>
        </el-form>

        <el-row class="btn-row">
          <el-button @click="prePage" v-show="active !== 0">上一步</el-button>
          <el-button @click="nextPage" v-show="active !== 2">下一步</el-button>
          <el-button @click="nextPage" v-show="active == 2">提交</el-button>
        </el-row>
    </el-row>
</template>

<script>
import defaultInfo from '@/config/defaultInfo'
import { ProduceWord } from '@/api'

export default {
  data() {
    return {
      active: 0,
      forthStatus: 'wait',

      form: {
        cNumber: '',
        cNameEn: '',
        cNameCn: '',

        chNameCn: '',
        chSureName: '',
        chOtherName: '',

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
        idN9: 'NIL',
        leaveDate: '',

        sUName: defaultInfo.userName,
        sUAddr: defaultInfo.userAddr,
        sUPhone: defaultInfo.userPhone,
        sUFax: defaultInfo.userFax,
        sUEmail: defaultInfo.userEmail,

        wNameCn: '',
        wSureName: '',
        wOtherName: '',
        wAddr: '',
        wCountry: '',
        wDate: '',

        // 证件类型
        certificateType2: 'wchinaId',
        wChinaId: '',
        wHKId: 'NIL',
        wpsCountry: 'NIL',
        wpsNumber: 'NIL',

        // 香港id分成9个单独数字
        widN1: 'NIL',
        widN2: 'NIL',
        widN3: 'NIL',
        widN4: 'NIL',
        widN5: 'NIL',
        widN6: 'NIL',
        widN7: 'NIL',
        widN8: 'NIL',
        widN9: 'NIL',

        signDate: ''
      },
      rules: {
        cNumber: [{ required: true, message: '输入公司编号' }],
        cNameEn: [{ required: true, message: '输入公司英文名稱' }],
        cNameCn: [{ required: true, message: '请输入公司中文名稱' }],
        chNameCn: [{ required: true, message: '请输入中文姓名' }],
        chSureName: [{ required: true, message: '请输入英文姓式' }],
        chOtherName: [{ required: true, message: '请输入英文名字' }],
        chChinaId: [{ required: true, message: '请输入中国大陆身份证明' }],
        chHKId: [{ required: true, message: '请输入香港身份证明' }],
        psCountry: [{ required: true, message: '请输入護照簽發國家' }],
        psNumber: [{ required: true, message: '请输入護照号码' }],

        leaveDate: [{ required: true, message: '请输入选择停任日期' }],

        sUName: [{ required: true, message: '请输入提交人名稱' }],
        sUAddr: [{ required: true, message: '请输入提交人地址' }],
        sUPhone: [{ required: true, message: '请输入提交人電話' }],
        sUFax: [{ required: true, message: '请输入提交人傳真' }],
        sUEmail: [{ required: true, message: '请输入提交人電郵' }],

        wNameCn: [{ required: true, message: '请输入中文姓名' }],
        wSureName: [{ required: true, message: '请输入英文姓式' }],
        wOtherName: [{ required: true, message: '请输入英文名字' }],
        wAddr: [{ required: true, message: '请输入联络地址或证件地址' }],
        wCountry: [{ required: true, message: '请输入國家／地區' }],
        wChinaId: [{ required: true, message: '请输入中国大陆身份证明' }],
        wHKId: [{ required: true, message: '请输入香港身份证明' }],
        wpsCountry: [{ required: true, message: '请输入護照簽發國家' }],
        wpsNumber: [{ required: true, message: '请输入護照号码' }],
        wDate: [{ required: true, message: '请输入委任日期' }],
        signDate: [{ required: true, message: '请输入簽署日期' }]
      },
      submitUser: {
        userInfo: 'defaultUser'
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
          sUEmail: ''
        }
      } else {
        this.form = {
          ...this.form,
          sUName: defaultInfo.userName,
          sUAddr: defaultInfo.userAddr,
          sUPhone: defaultInfo.userPhone,
          sUFax: defaultInfo.userFax,
          sUEmail: defaultInfo.userEmail
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

    changeCertificateType2(value) {
      this.form = {
        ...this.form,
        wChinaId: value == 'wchinaId' ? '' : 'NIL',
        wHKId: value == 'whkId' ? '' : 'NIL',
        wpsCountry: value == 'wpassport' ? '' : 'NIL',
        wpsNumber: value == 'wpassport' ? '' : 'NIL'
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
        2: 'formPage2'
      }
      this.$refs[formObj[this.active]].validate(valid => {
        if (valid) {
          if (this.active < 2) {
            this.active = this.active + 1
          } else {
            const params = Object.assign({}, this.form)
            console.log(params)
            params.leaveY = params.leaveDate.split('/')[2]
            params.leaveM = params.leaveDate.split('/')[1]
            params.leaveD = params.leaveDate.split('/')[0]
            params.wYY = params.wDate.split('/')[2]
            params.wMM = params.wDate.split('/')[1]
            params.wDD = params.wDate.split('/')[0]
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

            // 如果选中的是 HKID
            if (params.certificateType2 == 'whkId') {
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
              ] = Array.from(params.wHKId)
              console.log(Array.from(params.chHKId))
              params.widN1 = hkId1
              params.widN2 = hkId2
              params.widN3 = hkId3
              params.widN4 = hkId4
              params.widN5 = hkId5
              params.widN6 = hkId6
              params.widN7 = hkId7
              params.widN8 = hkId8
              params.widN9 = hkId9
            }
            delete params.certificateType2
            // console.log(params)
            this.produceWord('ND2A', params)
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

.btn-row {
  width: 80%;
  margin: 0 auto;
  text-align: right;
}
</style>

