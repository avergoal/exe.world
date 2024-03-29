export default function ({ $axios, store, req }) {
  $axios.onRequest(config => {
    if(process.server){
      const arr = req.rawHeaders
      const result = {};

      for (let i = 0; i < arr.length; i += 2) {
        const key = arr[i];
        result[key] = arr[i + 1];
      }
      // console.log(req.headers)
      store.dispatch('stat/setHeader', {
        name: "req headers",
        data: req.headers
      })
      store.dispatch('app/setHeader',{
        'X-Forwarded-For':result['X-Forwarded-For'],
        // 'User-Agent':result['User-Agent'],
      })
    }
    if(process.client){
      const headers = store.getters['app/headers'];
      config.headers['X-Forwarded-For'] = headers['X-Forwarded-For'];
      // config.headers['User-Agent'] = headers['User-Agent'];
    }
    if(config.data) {
       // if (req !== undefined) {
       //   config.headers.common['x-forwarded-for'] = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
       //   config.headers.common['User-Agent'] = window.navigator.userAgent
       // }
      let FormData = require('form-data'),
          formData = new FormData(),
          token = store.getters['auth/token']
      if(config.data.api_token || token) {
        formData.append('api_token', (config.data.api_token) ? config.data.api_token : token)
      }
      if(config.data.api_token) {
        delete config.data.api_token
      }
      Object.keys(config.data).map(k => {
        formData.append(k, config.data[k])
      })
      config.data = formData
    }
    return config
  })
  $axios.onRequestError(error => {
    console.log(error, 'requestError')
  })
  $axios.onResponseError(
    async function(error) {
      if(error.response.data.error === 'token_expired') {
        await store.dispatch('app/toggleModal', { target: 'refreshPage' })
        return Promise.reject(error.response)
      } else {
        return Promise.resolve(error.response)
      }
  })
}
