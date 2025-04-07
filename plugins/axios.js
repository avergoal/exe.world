export default function ({ $axios, store, req }) {
  $axios.onRequest(config => {
    // config.metadata = { startTime: new Date() };
    // console.log(`[${config.url}] 🔄 Начат запрос`);
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
      Object.keys(config.data).forEach(k => {
        const value = config.data[k];
        if (value !== undefined && value !== null) {
          formData.append(k, value);
        } else {
          // console.warn(`⚠️ Пропущено поле "${k}" с пустым значением`, value);
        }
      });
      config.data = formData
    }
    return config
  })
  $axios.onResponse((response) => {
    // const duration = new Date().getTime() - response.config.metadata.startTime.getTime();
    // console.log(`[${response.config.url}] ✅ Ответ за ${duration} мс`);
  });
  $axios.onRequestError(error => {
    console.log(error, 'requestError')
  })
  $axios.onResponseError(
    async function(error) {
      // const duration = error.config?.metadata
      //   ? new Date().getTime() - error.config.metadata.startTime.getTime()
      //   : 'неизвестно';
      //
      // console.error(`[${error.config?.url}] ❌ Ошибка через ${duration} мс`, error);
      if(error?.response?.data?.error === 'token_expired') {
        await store.dispatch('app/toggleModal', { target: 'refreshPage' })
        return Promise.reject(error.response)
      } else {
        return Promise.resolve(error.response)
      }
  })
}
