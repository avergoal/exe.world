export default async ({app, store}) => {
  const response = await store.dispatch('app/getTranslation');
  const translations = response.response;
  const locales = store.getters['app/locales'];
  app.i18n.locales = [
    { code: 'en', iso: 'en-US', file: 'en.js' },
    { code: 'ru', iso: 'ru-RU', file: 'ru.js' }
  ]
  app.i18n.localeCodes = locales.map(locale => locale.code)
  app.i18n.defaultLocale = 'en'
  app.i18n.fallbackLocale = 'en'
  app.i18n.setLocaleMessage('en', translations);
};


