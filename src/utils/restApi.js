import Vue from 'vue'
const baseURL = 'localhost:6633'

export function makeRequest({ url, method = 'get', data = {} }) {
  let reqUrl = url
  if (process.env.NODE_ENV === 'production') {
    reqUrl = `${baseURL}${url}`
  }
  return new Promise((resolve, reject) => {
    Vue.http[method](reqUrl, data)
      .then(response => {
        const { code, msg, records, status } = response.data
        if (code === 200 || status === 200) {
          resolve({ code, msg, records, bodyData: response.body })
        } else {
          reject({ code, msg })
        }
      })
      .catch(() => {
        reject({ code: -1, msg: '服务器故障' })
      })
  })
}
