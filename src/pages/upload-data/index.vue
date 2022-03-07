<template>
  <div class="upload-data-wrap">
    <el-row>
      <el-button
        type="primary"
        @click="handleSearch"
      >
        查询
      </el-button>
      <el-button
        type="primary"
        style="margin-left: 12px;"
        @click="handleDownload"
        :loading="downloading"
      >导出 Doc</el-button>
      <el-upload
        accept=".xls,.xlsx"
        action="/"
        class="upload-btn"
        :show-file-list="false"
        :http-request="handleCustomRequest"
        :on-change="handleUploadFileChange"
      >
        <el-button style="margin-left: 12px;">上传 Excel</el-button>
      </el-upload>
    </el-row>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        :loading="loading"
        height="600"
      >
        <el-table-column
          prop="companyCode"
          label="公司編號"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="companyEnName"
          label="公司英文名稱"
        >
        </el-table-column>
        <el-table-column
          prop="companyCnName"
          label="公司中文名稱"
        >
        </el-table-column>
        <el-table-column
          prop="companySecretryEn"
          label="公司秘書英文"
        >
        </el-table-column>
        <el-table-column
          prop="companySecretryCn"
          label="公司秘書中文"
        >
        </el-table-column>
        <el-table-column
          prop="_resignDate"
          label="辭職日期"
        >
        </el-table-column>
        <el-table-column
          prop="submitUser"
          label="提交人資料姓名"
        >
        </el-table-column>
        <el-table-column
          prop="submitAddr"
          label="提交人資料地址"
        >
        </el-table-column>
        <el-table-column
          prop="signUser"
          label="簽署"
        >
        </el-table-column>
        <el-table-column
          prop="_date"
          label="日期"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { excelApi } from '../../api'
import { getExcelList, uploadExcel, downloadDocs } from '@/api'
import dayjs from 'dayjs'

/* eslint-disable */
export default {
  name: 'upload-data',

  data() {
    return {
      tableData: [],
      loading: false,
      downloading: false,

      baseURL: 'http://localhost:6633',
      uploadFileList: []
    }
  },

  methods: {
    handleSearch() {
      this.loading = true
      getExcelList()
        .then(response => {
          const res = response.bodyData
          if (res.code >= 200 && res.code < 400) {
            if (Array.isArray(res.body)) {
              res.body.forEach((item, index) => {
                if (item.resignDate) {
                  item._resignDate = dayjs(item.resignDate).format('DD/MM/YYYY')
                }
                if (item.date) {
                  item._date = dayjs(item.date).format('DD/MM/YYYY')
                }
              })
            }
            this.tableData = res.body
          } else {
            this.$message.error('获取数据失败～')
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    handleUploadFileChange(file) {
      this.uploadFileList.push(file)
    },

    handleCustomRequest() {
      const formData = new FormData()
      console.log(this.uploadFileList, 11212)
      this.uploadFileList.forEach(item => {
        formData.append('files', item.raw)
      })
      setTimeout(() => {
        console.log(formData, 33333)
      }, 200)
      console.log(formData, 111)
      // uploadExcel(formData)
      //   .then(res => {
      //     if (res.code === 200) {
      //       this.$message.success('上传成功')
      //       this.handleSearch()
      //     } else {
      //       this.$message.error('上传失败～')
      //     }
      //   })
      //   .catch(() => {
      //     this.$message.error('上传失败')
      //   })
    },

    handleDownload() {
      this.downloading = true
      downloadDocs()
        .then(response => {
          const res = response.bodyData
          if (res.code >= 200 && res.code < 400) {
            const aLink = document.createElement('a')
            aLink.download = `ND4.zip`
            // aLink.href = '/downloads/ND4.zip'
            aLink.href = `${baseURL}/downloads/ND4.zip`
            document.body.appendChild(aLink)
            aLink.click()
            document.body.removeChild(aLink)
          } else {
            this.$message.error('导出失败')
          }
        })
        .catch(() => {
          this.$message.error('导出失败')
        })
        .finally(() => {
          this.downloading = false
        })
    }
  },

  mounted() {
    this.handleSearch()
  }
}
</script>

<style scoped>
.upload-data-wrap {
}

.table-wrap {
  margin-top: 20px;
}

.upload-btn {
  display: inline-block;
}
</style>
