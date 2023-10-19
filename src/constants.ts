const THEME = {
  // BACKGROUND: '#FFF2D8',
  // COLOR: '#4D4637',
  // COLOR_ALT: '#0F2C59',
  // CTA: '#FF7C7C',
  // ACCENT: '#1A936F'
  BACKGROUND: 'white',
  COLOR: '#001524',
  COLOR_ALT: '#0F2C59',
  CTA: '#713ABE',
  ACCENT: '#FF9501',
}

const FONTS = {
  POPPINS: {
    THIN: 'Poppins_100Thin',
    THIN_ITALIC: 'Poppins_100Thin_Italic',
    EXTRA_LIGHT: 'Poppins_200ExtraLight',
    EXTRA_LIGHT_ITALIC: 'Poppins_200ExtraLight_Italic',
    LIGHT: 'Poppins_300Light',
    LIGHT_ITALIC: 'Poppins_300Light_Italic',
    REGULAR: 'Poppins_400Regular',
    REGULAR_ITALIC: 'Poppins_400Regular_Italic',
    MEDIUM: 'Poppins_500Medium',
    MEDIUM_ITALIC: 'Poppins_500Medium_Italic',
    SEMI_BOLD: 'Poppins_600SemiBold',
    SEMI_BOLD_ITALIC: 'Poppins_600SemiBold_Italic',
    BOLD: 'Poppins_700Bold',
    BOLD_ITALIC: 'Poppins_700Bold_Italic',
    EXTRA_BOLD: 'Poppins_800ExtraBold',
    EXTRA_BOLD_ITALIC: 'Poppins_800ExtraBold_Italic',
    BLACK: 'Poppins_900Black',
    BLACK_ITALIC: 'Poppins_900Black_Italic',
  },
}

const DATA = {
  USER_DATA: 'user:preferences',
  SETUP_COMPLETE: 'onboarding:complete',
}

const TEST_COURSE: Course = {
  id: 1,
  scenario: 'You are at a bar...',
  sentences: [
    {
      id: 1,
      translation: 'Pourriez-vous recommander une bière locale ?',
      original: 'Could you recommend a local brew?',
      audio: require('../assets/audio/1.m4a'),
    },
    {
      id: 2,
      translation: "Je voudrais une bière, s'il vous plaît.",
      original: 'I would like a beer, please.',
      audio: require('../assets/audio/2.m4a'),
    },
    {
      id: 3,
      translation: 'Où est la carte des boissons ?',
      original: 'Where is the drink menu?',
      audio: require('../assets/audio/3.m4a'),
    },
    {
      id: 4,
      translation: "J'aimerais un verre de vin rouge.",
      original: 'I would like a glass of red wine.',
      audio: require('../assets/audio/4.m4a'),
    },
    {
      id: 5,
      translation: 'Pouvez-vous me recommander un cocktail spécial ?',
      original: 'Can you recommend a special cocktail?',
      audio: require('../assets/audio/5.m4a'),
    },
    {
      id: 6,
      translation: "Combien coûte une bouteille d'eau minérale ?",
      original: 'How much does a bottle of mineral water cost?',
      audio: require('../assets/audio/6.m4a'),
    },
    {
      id: 7,
      translation: 'Est-ce que vous servez des snacks ici ?',
      original: 'Do you serve snacks here?',
      audio: require('../assets/audio/7.m4a'),
    },
    {
      id: 8,
      translation: 'Pouvez-vous allumer la télévision pour le match de football ?',
      original: 'Can you turn on the TV for the football game?',
      audio: require('../assets/audio/8.m4a'),
    },
    {
      id: 9,
      translation: "Je vais payer l'addition.",
      original: 'I will pay the bill.',
      audio: require('../assets/audio/9.m4a'),
    },
    {
      id: 10,
      translation: "C'est l'heure de fermeture.",
      original: "It's closing time.",
      audio: require('../assets/audio/10.m4a'),
    },
  ],
}

export { THEME, FONTS, DATA, TEST_COURSE }
