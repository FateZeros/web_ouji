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
