// export default async ({ i18n, store }) => {
//   try {
//     const response = await store.dispatch('app/getTranslation');
//     const translations = response.response;
//     // await app.i18n.setLocale('en');
//     // app.i18n.fallbackLocale = 'en';
//     // Set i18n locale messages
//     i18n.setLocaleMessage('en', translations);
//
//     // Set additional i18n parameters
//
//
//     // console.log(app.i18n.messages);
//   } catch (error) {
//     console.error('Error fetching translations', error);
//   }
// };
export default async ({ app, store },inject) => {
  const response = await store.dispatch('app/getTranslation');
  const translations = response.response;
  app.i18n.locales = ['fr','en']
  app.i18n.setLocaleMessage('en',translations) ;

};
