import Vue from 'vue'

export function makeRequest({ url, method = 'get', data = {} }) {
  return new Promise((resolve, reject) => {
    Vue.http[method](url, data)
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
