import { makeRequest } from '@/utils/restApi'

// 登录接口
export function Login(data) {
  return makeRequest({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 生成word
export function ProduceWord(data) {
  return makeRequest({
    url: '/api/produceword',
    method: 'post',
    data
  })
}

// 生成 zip
export function ProduceWordZip(data) {
  return makeRequest({
    url: '/api/produceword-muti',
    method: 'post',
    data
  })
}


// 获取列表
export function getExcelList() {
  return makeRequest({
    url: '/api/excel',
    method: 'get'
  })
}

// 上传 excel
export function uploadExcel(data) {
  return makeRequest({
    url: '/api/upload_excel',
    method: 'post',
    data
  })
}

// 下载 excel
export function downloadDocs() {
  return makeRequest({
    url: '/api/download_docs',
    method: 'post'
  })
}

