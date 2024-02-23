import i18n from 'i18next'
import common_de from 'src/assets/i18n/translations/de/common.json';
import common_en from 'src/assets/i18n/translations/en/common.json';

i18n.init({
  interpolation: { escapeValue: false },  // React already does escaping
  lng: 'en',                              // language to use
  resources: {
      en: {
          common: common_en               // 'common' is our custom namespace
      },
      de: {
          common: common_de
      },
  },
  defaultNS: 'common',
  fallbackLng: 'en',
  debug: false,
  react: {
    wait: true
  }
});

// i18n
//   .use(Backend)
//   .use(initReactI18next)
//   .init({
//     lng: 'en',
//     // backend: {
//     //   /* translation file path */
//     //   loadPath: 'assets/i18n/{{ns}}/{{lng}}.json'
//     // },
//     resources: {
//       en: {
//           common: common_en               // 'common' is our custom namespace
//       },
//       de: {
//           common: common_de
//       },
//     },
//     fallbackLng: 'en',
//     debug: true,
//     /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
//     // ns: ['translations'],
//     // defaultNS: 'translations',
//     // keySeparator: false,
//     // interpolation: {
//     //   escapeValue: false,
//     //   formatSeparator: ','
//     // },
//     react: {
//       wait: true
//     }
//   })

export default i18n