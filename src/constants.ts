const THEME = {
  BACKGROUND: '#f6f5fa',
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
  SETUP_COMPLETE: 'onboarding:complete',
  USER_DATA: 'data:preferences',
  COURSES: 'data:courses',
  SCENARIOS: 'data:scenarios',
}

const TEST_COURSE: Course = {
  id: 1,
  createdAt: new Date(),
  lastModified: new Date(),
  language: {
    id: 1,
    name: 'French',
    code: 'fr-FR',
    proficiency: null,
  },
  scenario: {
    id: 1,
    title: 'You are at a bar...',
    description: 'You are at a new bar and are about to spend the night there.',
  },
  sentences: [
    {
      id: 1,
      translation: 'Pourriez-vous recommander une bière locale ?',
      original: 'Could you recommend a local brew?',
      audio: 1,
      completed: false,
    },
    {
      id: 2,
      translation: "Je voudrais une bière, s'il vous plaît.",
      original: 'I would like a beer, please.',
      audio: 2,
      completed: false,
    },
    {
      id: 3,
      translation: 'Où est la carte des boissons ?',
      original: 'Where is the drink menu?',
      audio: 3,
      completed: false,
    },
    {
      id: 4,
      translation: "J'aimerais un verre de vin rouge.",
      original: 'I would like a glass of red wine.',
      audio: 4,
      completed: false,
    },
    {
      id: 5,
      translation: 'Pouvez-vous me recommander un cocktail spécial ?',
      original: 'Can you recommend a special cocktail?',
      audio: 5,
      completed: false,
    },
    {
      id: 6,
      translation: "Combien coûte une bouteille d'eau minérale ?",
      original: 'How much does a bottle of mineral water cost?',
      audio: 6,
      completed: false,
    },
    {
      id: 7,
      translation: 'Est-ce que vous servez des snacks ici ?',
      original: 'Do you serve snacks here?',
      audio: 7,
      completed: false,
    },
    {
      id: 8,
      translation: 'Pouvez-vous allumer la télévision pour le match de football ?',
      original: 'Can you turn on the TV for the football game?',
      audio: 8,
      completed: false,
    },
    {
      id: 9,
      translation: "Je vais payer l'addition.",
      original: 'I will pay the bill.',
      audio: 9,
      completed: false,
    },
    {
      id: 10,
      translation: "C'est l'heure de fermeture.",
      original: "It's closing time.",
      audio: 10,
      completed: false,
    },
  ],
}

export { THEME, FONTS, DATA, TEST_COURSE }
