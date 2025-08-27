export interface TranslationStatusByLanguageDataItem {
  language: string;
  countryCode: string;
  content: string;
  translated: string;
  untranslated: string;
  progress: string;
}

export const translationStatusByLanguageMockData: TranslationStatusByLanguageDataItem[] = [
  {
    language: 'English',
    countryCode: 'GB',
    content: '1,500',
    translated: '1,300',
    untranslated: '200',
    progress: '100',
  },
  {
    language: 'Spanish',
    countryCode: 'ES',
    content: '1,500',
    translated: '1,100',
    untranslated: '400',
    progress: '80',
  },
  {
    language: 'French',
    countryCode: 'FR',
    content: '1,500',
    translated: '800',
    untranslated: '700',
    progress: '60',
  },
  {
    language: 'German',
    countryCode: 'DE',
    content: '1,500',
    translated: '600',
    untranslated: '900',
    progress: '40',
  },
  {
    language: 'Ukrainian',
    countryCode: 'UA',
    content: '1,500',
    translated: '150',
    untranslated: '1,350',
    progress: '20',
  },
];

export const translationStatusByLanguageMockDataYearly: TranslationStatusByLanguageDataItem[] = [
  {
    language: 'English',
    countryCode: 'GB',
    content: '1,500',
    translated: '1,300',
    untranslated: '200',
    progress: '70',
  },
  {
    language: 'Spanish',
    countryCode: 'ES',
    content: '1,500',
    translated: '1,100',
    untranslated: '400',
    progress: '60',
  },
  {
    language: 'Ukrainian',
    countryCode: 'UA',
    content: '1,500',
    translated: '150',
    untranslated: '1,350',
    progress: '55',
  },
  {
    language: 'French',
    countryCode: 'FR',
    content: '1,500',
    translated: '800',
    untranslated: '700',
    progress: '40',
  },
  {
    language: 'German',
    countryCode: 'DE',
    content: '1,500',
    translated: '600',
    untranslated: '900',
    progress: '20',
  },
];

export const translationStatusByLanguageMockDataMonthly: TranslationStatusByLanguageDataItem[] = [
  {
    language: 'Ukrainian',
    countryCode: 'UA',
    content: '1,500',
    translated: '150',
    untranslated: '1,350',
    progress: '98',
  },
  {
    language: 'English',
    countryCode: 'GB',
    content: '1,500',
    translated: '1,300',
    untranslated: '200',
    progress: '85',
  },
  {
    language: 'French',
    countryCode: 'FR',
    content: '1,500',
    translated: '800',
    untranslated: '700',
    progress: '66',
  },
  {
    language: 'German',
    countryCode: 'DE',
    content: '1,500',
    translated: '600',
    untranslated: '900',
    progress: '45',
  },
  {
    language: 'Spanish',
    countryCode: 'ES',
    content: '1,500',
    translated: '1,100',
    untranslated: '400',
    progress: '35',
  },
];
