import { useLanguage } from '../context/LanguageContext';
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';

const translations = {
  en: enTranslations,
  es: esTranslations,
};

export default function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, language };
}
