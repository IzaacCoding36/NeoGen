import i18n from 'i18next';
import ptBR from './pt-BR.json';
import en from './en.json';

const resources = {
  'pt-BR': { translation: ptBR },
  en: { translation: en },
};

// Só inicializa i18n no lado do cliente
if (typeof window !== 'undefined' && !i18n.isInitialized) {
  // Importações dinâmicas para evitar problemas no SSR
  Promise.all([
    import('i18next-browser-languagedetector'),
    import('react-i18next'),
  ]).then(([LanguageDetectorModule, reactI18nextModule]) => {
    const LanguageDetector = LanguageDetectorModule.default;
    const { initReactI18next } = reactI18nextModule;
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'pt-BR',
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
          lookupLocalStorage: 'language',
        },
      });
  });
}

export default i18n;
