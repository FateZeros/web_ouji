<template>
  <el-row>
    <el-col
      :span="12"
      class="wechat-bill-value-wrap"
    >
      <el-row class="wechat-bill-value-row">
        收款姓名：
        <el-input
          v-model="name"
          style="flex: 1;"
          placeholder="请输入收款姓名"
        />
      </el-row>
      <el-row class="wechat-bill-value-row">
        转账金额：
        <el-input-number
          v-model="moneyCount"
          :min="0"
          style="flex: 1;"
          placeholder="请输入金额"
        />
      </el-row>
      <el-row class="wechat-bill-value-row">
        转账时间：
        <el-date-picker
          show-time
          style="flex: 1;"
          v-model="billDate"
          @change="handleDateChange"
        />
      </el-row>
      <el-row class="wechat-bill-value-row">
        转账单号：
        <el-input
          readOnly
          style="flex: 1;"
          placeholder="自动生成"
          v-model="billNum"
        />
      </el-row>
      <el-row class="wechat-bill-value-row">
        <el-button
          type="primary"
          @click="handleProduceImg"
        >生成截图</el-button>
      </el-row>
    </el-col>
    <el-col :span="12">
      <div
        class="wechat-bill-wrap"
        ref="wechatBill"
      >
        <div class="bill-row1"></div>
        <div class="bill-row2"></div>
        <div class="bill-row3">

        </div>
        <div class="bill-row4">
          扫二维码付款-给{{name}}
        </div>
        <div class="bill-row5">
          {{moneyCountFormat}}
        </div>
        <div class="bill-row6">
        </div>
        <div class="bill-row7">
          <div class="bill-row-label">当前状态</div>
          <div class="bill-row-value">支付成功</div>
        </div>
        <div class="bill-row7">
          <div class="bill-row-label">收款方备注</div>
          <div class="bill-row-value">二维码收款</div>
        </div>
        <div class="bill-row7">
          <div class="bill-row-label">支付方式</div>
          <div class="bill-row-value">零钱</div>
        </div>
        <div class="bill-row7">
          <div class="bill-row-label">转账时间</div>
          <div class="bill-row-value">{{billDateFormat}}</div>
        </div>
        <div
          class="bill-row7"
          style="margin-bottom: 30px;"
        >
          <div class="bill-row-label">转账单号</div>
          <div class="bill-row-value">{{billNum}}</div>
        </div>
        <div class="bill-empty">
        </div>
        <div class="bill-row8">
          <div class="bill-row-label8">发起群收款</div>
        </div>
        <div class="bill-row8">
          <div class="bill-row-label8">查看收款方名片</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import dayjs from 'dayjs'
import html2Canvas from 'html2canvas'

export default {
  name: 'wechat-bill',

  data() {
    return {
      name: '付海鸥',
      billDate: undefined,
      moneyCount: undefined,
      billNum: undefined
    }
  },

  computed: {
    moneyCountFormat() {
      let result = ''
      if (this.moneyCount > 0) {
        result = `-${this.moneyCount.toFixed(2)}`
      }
      return result
    },

    billDateFormat() {
      let result = ''
      if (this.billDate) {
        result = dayjs(this.billDate).format('YYYY年MM月D日 HH:mm:ss')
      }
      return result
    }
  },

  methods: {
    handleDateChange(value) {
      const time = dayjs(value).format('YYYYMMDD')
      this.produceBillNum(time)
    },

    produceBillNum(time) {
      const randomNum = this.getRandomNum(14)
      this.billNum = `1000049901${time}${randomNum}`
    },

    getRandomNum(m1) {
      const m = m1 > 15 ? 15 : m1
      const num = Math.random().toString()
      if (num.substr(num.length - m, 1) === '0') {
        return this.getRandomNum(m)
      }
      return num.substring(num.length - m)
    },

    handleProduceImg() {
      html2Canvas(this.$refs.wechatBill).then(canvas => {
        const dataUrl = canvas.toDataURL('image/png')
        if (dataUrl !== '') {
          const aLink = document.createElement('a')
          aLink.href = dataUrl
          aLink.download = 'wechat-bill.png'
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink)
        }
      })
    }
  }
}
</script>

<style scoped>
.wechat-bill-value-wrap {
  font-size: 16px;
  font-family: Arial, 微软雅黑;
}

.wechat-bill-value-row {
  margin-bottom: 20px;
  width: 50%;
  display: flex;
  align-items: center;
}

.wechat-bill-wrap {
  width: 325px;
  border: 1px solid #e3e3e3;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #fff;
  font-family: Aria;
}

.bill-row1 {
  width: 100%;
  height: 16px;
}

.bill-row2 {
  width: 100%;
  height: 36px;
}

.bill-row3 {
  width: 100%;
  height: 54px;
  margin-top: 10px;
  background: url('../../assets/wechat.png') no-repeat center;
  background-size: 50px;
}

.bill-row4 {
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  color: #1f1f1f;
  text-align: center;
  margin-top: 4px;
  overflow: hidden;
  padding: 0 3%;
  white-space: nowrap;
}

.bill-row5 {
  width: 100%;
  height: 50px;
  font-size: 27px;
  color: #1f1f1f;
  text-align: center;
  margin-top: 12px;
}

.bill-row6 {
  width: 90%;
  height: 36px;
  border-bottom: 1px solid #e3e3e3;
  margin: 0 auto;
  margin-bottom: 20px;
}

.bill-row7 {
  width: 90%;
  min-height: 30px;
  line-height: 30px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 4px;
}

.bill-empty {
  width: 100%;
  height: 8px;
  background: #f9f9fb;
}

.bill-row8 {
  width: 90%;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid #e3e3e3;
  color: #333;
  background: url('../../assets/right-arrow.png') no-repeat right center;
  background-size: 12px;
}

.bill-row-label {
  width: 70px;
  color: #888;
}

.bill-row-label8 {
  min-width: 70px;
  color: #888;
}

.bill-row-value {
  flex: 1;
  margin-left: 20px;
  color: #1f1f1f;
  word-break: break-all;
}
</style>
