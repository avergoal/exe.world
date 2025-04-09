export default function ({ store }, inject) {
  const baseURL = 'https://api.exe.world/';

  // ========== REQUEST INTERCEPTOR ==========
  const applyRequestInterceptors = (url, options) => {
    const token = store.getters['auth/token'];

    options.headers = {
      ...options.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    // Пример кастомного логирования
    // console.log('🔄 Запрос:', url, options);

    return { url, options };
  };

  // ========== RESPONSE INTERCEPTOR ==========
  const applyResponseInterceptors = async (response) => {
    if (!response.ok) {
      const errorData = await response.json();
      // Можно глобально отловить 401, 500 и т.д.
      if (response.status === 401) {
        console.warn('⚠️ Unauthorized — возможно, токен истёк');
      }
      throw errorData;
    }

    const data = await response.json();
    return data;
  };

  // ========== Основной универсальный fetch ==========
  const request = async (method, url, params = {}) => {
    let fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;
    const options = { method };

    if (method === 'POST' || method === 'PUT') {
      options.body = new URLSearchParams(params).toString();
    } else if (method === 'GET' && Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString();
      fullURL += `?${query}`;
    }

    const { url: finalURL, options: finalOptions } = applyRequestInterceptors(fullURL, options);

    try {
      const response = await fetch(finalURL, finalOptions);
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
