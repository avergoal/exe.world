export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    if(config.data) {
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
