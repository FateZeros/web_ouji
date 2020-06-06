<template>
    <el-row>
        <el-steps :active="active" finish-status="success">
            <el-step title="股权转让"></el-step>
            <el-step title="辭職通知書" :status="forthStatus"></el-step>
        </el-steps>

        <!-- page1 -->
        <el-form v-show="active == 0" class="ncc1-page" ref="formPage0" :model="form" :rules="rules" label-width="150px">
            <el-row class="nnc1-module-title">A.转让人信息 Transferor Information </el-row>
            <el-row class="form-item-container">
                <el-form-item label="公司英文名稱:" prop="cNameEn">
                    <el-input v-model="form.cNameEn" placeholder="公司英文名称只能由字母以及符号和空格组成并以 LIMITED 结尾"></el-input>
                </el-form-item>
                <el-form-item label="公司中文名稱:" prop="cNameCn">
                    <el-input v-model="form.cNameCn" placeholder="公司中文名称只能由数字或中文汉字以及符号与空格并以有限公司结尾"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="转让人英文名稱:" prop="tNameEn">
                            <el-input v-model="form.tNameEn" placeholder="转让人英文名稱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="转让人中文文名稱:" prop="tNameCn">
                            <el-input v-model="form.tNameCn" placeholder="转让人中文名稱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="注册金额:" prop="tStockNum">
                            <el-input v-model="form.tStockNum" placeholder="HK Dollar(HK$)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="转让人地址:" prop="tAddr">
                    <el-input v-model="form.tAddr" placeholder="转让人地址"></el-input>
                </el-form-item>
            </el-row>
            <el-row class="nnc1-module-title">B.受让人信息 Transferee Information </el-row>
            <el-row class="form-item-container">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="受让人英文名稱:" prop="tNameEn1">
                            <el-input v-model="form.tNameEn1" placeholder="受让人英文名稱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="受让人中文文名稱:" prop="tNameCn1">
                            <el-input v-model="form.tNameCn1" placeholder="受让人中文名稱"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="受让人地址:" prop="tAddr1">
                    <el-input v-model="form.tAddr1" placeholder="受让人地址"></el-input>
                </el-form-item>
            </el-row>
            <el-row class="nnc1-module-title">C.股份信息 Stock Information </el-row>
            <el-row class="form-item-container">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="股份总份数:" prop="stockT">
                            <el-input v-model="form.stockT" placeholder="股份总份数"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="每股金额:" prop="stockPer">
                            <el-input v-model="form.stockPer" placeholder="每股金额,两位小数(HK$)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
        </el-form>

        <!-- page2 -->
        <el-form v-show="active == 1" class="ncc1-page" ref="formPage1" :model="form" :rules="rules" label-width="150px">
            <el-row class="nnc1-module-title">A.辭職通知 Notice of Resignation of Company Secretary and Director </el-row>
            <el-row class="form-item-container">
                <el-form-item label="商業登記證號碼:" prop="busiNum">
                    <el-input v-model="form.busiNum" placeholder="商業登記證號碼"></el-input>
                </el-form-item>
                <el-form-item label="公司编号:" prop="cNum">
                    <el-input v-model="form.cNum" placeholder="公司编号"></el-input>
                </el-form-item>
                <el-form-item label="辭職人中文名:" prop="czNameCn">
                    <el-input v-model="form.czNameCn" placeholder="辭職人中文名"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="辭職人英文姓:" prop="czNameEn1">
                            <el-input v-model="form.czNameEn1" placeholder="辭職人英文姓"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="辭職人英文名:" prop="czNameEn2">
                            <el-input v-model="form.czNameEn2" placeholder="辭職人英文姓"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="辭職人ChinaId:" prop="chinaId">
                    <el-input v-model="form.chinaId" placeholder="辭職人ChinaId"></el-input>
                </el-form-item>
                <el-form-item label="辭職日期:" prop="czDate">
                    <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.czDate"
                    style="width: 100%;"
                    format="dd/MM/yyyy"
                    value-format="dd/MM/yyyy"
                    ></el-date-picker>
                </el-form-item>
            </el-row>
            <el-row class="nnc1-module-title">B.提交人的资料　Presentor’s Reference</el-row>
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

        <el-row class="btn-row">
            <el-button @click="prePage" v-show="active !== 0">上一步</el-button>
            <el-button @click="nextPage" v-show="active !== 1">下一步</el-button>
            <el-button @click="nextPage" v-show="active == 1">提交</el-button>
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
        cNameEn: '',
        cNameCn: '',
        // 转让人信息
        tNameEn: '',
        tNameCn: '',
        tStockNum: '',
        tAddr: '',

        // 受让人信息
        tNameEn1: '',
        tNameCn1: '',
        tAddr1: '',

        stockT: '',
        stockPer: '',

        busiNum: '',
        cNum: '',
        czNameCn: '',
        czNameEn1: '',
        czNameEn2: '',

        chinaId: '',
        czDate: '',

        sUName: defaultInfo.userName,
        sUAddr: defaultInfo.userAddr,
        sUPhone: defaultInfo.userPhone,
        sUFax: defaultInfo.userFax,
        sUEmail: defaultInfo.userEmail
      },
      rules: {
        cNameEn: [{ required: true, message: '请输入公司英文名稱' }],
        cNameCn: [{ required: true, message: '请输入公司中文名稱' }],
        tNameEn: [{ required: true, message: '请输入转让人中文名称' }],
        tNameCn: [{ required: true, message: '请输入转让人英文名称' }],
        tStockNum: [{ required: true, message: '请输入注册资金' }],
        tAddr: [{ required: true, message: '请输入转让人地址' }],

        tNameEn1: [{ required: true, message: '请输入受让人英文名称' }],
        tNameCn1: [{ required: true, message: '请输入受让人中文名称' }],
        tAddr1: [{ required: true, message: '请输入受让人地址' }],

        stockT: [{ required: true, message: '请输入股份总份数' }],
        stockPer: [{ required: true, message: '请输入每股金额' }],

        busiNum: [{ required: true, message: '请输入商業登記證號碼' }],
        cNum: [{ required: true, message: '请输入公司编号' }],
        czNameCn: [{ required: true, message: '请输入辭職人中文名' }],
        czNameEn1: [{ required: true, message: '请输入辭職人英文名' }],
        czNameEn2: [{ required: true, message: '请输入辭職人英文名' }],
        chinaId: [{ required: true, message: '请输入chinaId' }],
        czDate: [{ required: true, message: '请输入辭職日期' }],

        sUName: [{ required: true, message: '请输入提交人名稱' }],
        sUAddr: [{ required: true, message: '请输入提交人地址' }],
        sUPhone: [{ required: true, message: '请输入提交人電話' }],
        sUFax: [{ required: true, message: '请输入提交人傳真' }],
        sUEmail: [{ required: true, message: '请输入提交人電郵' }]
      },
      submitUser: {
        userInfo: 'defaultUser'
      }
    }
  },

  methods: {
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
          if (this.active < 1) {
            this.active = this.active + 1
          } else {
            const params = Object.assign({}, this.form)
            const [dateD, dateM, dateY] = params.czDate.split('/')
            params.dateY = dateY
            params.dateM = dateM
            params.dateD = dateD
            // console.log(params)
            this.produceWord('GGGD', params)
          }
        } else {
          return false
        }
      })
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
