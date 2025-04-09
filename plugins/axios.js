export default function ({ store }, inject) {
  const baseURL = 'https://api.exe.world/';

  // ========== REQUEST INTERCEPTOR ==========
  const applyRequestInterceptors = ( options, method, params) => {
    const token = store.getters['auth/token'];

    options.headers = {
      ...options.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (token && (method === 'POST' || method === 'PUT')) {
      // options.headers['Authorization'] = `Bearer ${token}`;
      params.api_token = token;
    }

    return { options, params };
  };

  // ========== RESPONSE INTERCEPTOR ==========
  const applyResponseInterceptors = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      // Можно глобально отловить 401, 500 и т.д.
      if (response.status === 401) {
        console.warn('⚠️ Unauthorized — возможно, токен истёк');
      }
      return  {
        data: errorData,     // 👈 поведение как в axios
        status: response.status,
        ok: response.ok,
      };
    }

    const data = await response.json();
    return {
      data: data,     // 👈 поведение как в axios
      status: response.status,
      ok: response.ok,
    };
  };

  // ========== Основной универсальный fetch ==========
  const request = async (method, url, params = {}) => {
    let fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;
    const options = { method };

    const { options: finalOptions,params: finalParams, } = applyRequestInterceptors(options,method,params);


    if (method === 'POST' || method === 'PUT') {
      options.body = new URLSearchParams(finalParams).toString();
    } else if (method === 'GET' && Object.keys(finalParams).length > 0) {
      const query = new URLSearchParams(finalParams).toString();
      fullURL += `?${query}`;
    }


    try {
      const response = await fetch(fullURL, finalOptions);
      return await applyResponseInterceptors(response);
    } catch (error) {
      console.error('❌ Ошибка при запросе:', error);
      return { error };
    }
  };

  // ========== Обёртки для методов ==========
  const api = {
    get: (url, params) => request('GET', url, params),
    post: (url, params) => request('POST', url, params),
    put: (url, params) => request('PUT', url, params),
    delete: (url, params) => request('DELETE', url, params),
  };

  // Инжектим как $api
  inject('axios', api);
}
