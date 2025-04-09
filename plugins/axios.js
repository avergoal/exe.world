export default function ({ store }, inject) {
  const baseURL = 'https://api.exe.world/';

  const applyRequestInterceptors = (url, options, method, params) => {
    const token = store.getters['auth/token'];

    options.headers = {
      ...options.headers,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (token && (method === 'POST' || method === 'PUT')) {
      // options.headers['Authorization'] = `Bearer ${token}`;
      params.api_token = token;
    }

    return { url, options, params };
  };

  const applyResponseInterceptors = async (response) => {
    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401) {
        console.warn('⚠️ Unauthorized — возможно, токен истёк');
      }
    }

    return {
      data: json,
      status: response.status,
      ok: response.ok,
    };
  };

  const request = async (method, url, params = {}) => {
    let fullURL = url.startsWith('http') ? url : `${baseURL}${url}`;
    const options = { method };

    const {
      url: finalURL,
      options: finalOptions,
      params: finalParams,
    } = applyRequestInterceptors(fullURL, options, method, params);

    if (method === 'POST' || method === 'PUT') {
      finalOptions.body = new URLSearchParams(finalParams).toString();
    } else if (method === 'GET' && Object.keys(finalParams).length > 0) {
      const query = new URLSearchParams(finalParams).toString();
      fullURL += `?${query}`;
    }

    try {
      const response = await fetch(finalURL, finalOptions);
      return await applyResponseInterceptors(response);
    } catch (error) {
      console.error('❌ Ошибка при запросе:', error);
      return { error };
    }
  };

  const api = {
    get: (url, params) => request('GET', url, params),
    post: (url, params) => request('POST', url, params),
    put: (url, params) => request('PUT', url, params),
    delete: (url, params) => request('DELETE', url, params),
  };

  inject('axios', api);
}
