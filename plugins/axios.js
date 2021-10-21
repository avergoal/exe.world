export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    if(config.data) {
      let FormData = require('form-data'),
          formData = new FormData(),
          token = store.getters['profile/token']
      if(config.data.api_token || token) {
        formData.append('api_token', (config.data.api_token) ? config.data.api_token : token)
        if(config.data.api_token) {
          delete config.data.api_token
        }
      }
      for(let e in config.data) {
        formData.append(e, config.data[e])
      }
      config.data = formData
    }
    return config
  })
  $axios.onRequestError(error => {
    console.log(error, 'requestError')
  })
  $axios.onResponseError(error => {
    return Promise.resolve(error.response)
  })
}