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

// Inner joined list of support languages between
// Azure Speech Assessment API and Narakeet TTS API
const LANGUAGES = [
  { label: 'German', value: 'de-DE' },
  { label: 'Tamil (India)', value: 'ta-IN1' },
  { label: 'Arabic (Saudi Arabia)', value: 'ar-SA' },
  { label: 'French (Canada)', value: 'fr-CA' },
  { label: 'French (France)', value: 'fr-FR' },
  { label: 'Hindi (India)', value: 'hi-IN1' },
  { label: 'Italian (Italy)', value: 'it-IT' },
  { label: 'Japanese (Japan)', value: 'ja-JP' },
  { label: 'Korean (Korea)', value: 'ko-KR' },
  { label: 'Malay (Malaysia)', value: 'ms-MY' },
  { label: 'Norwegian Bokmål (Norway)', value: 'nb-NO' },
  { label: 'Portuguese (Brazil)', value: 'pt-BR' },
  { label: 'Russian (Russia)', value: 'ru-RU' },
  { label: 'Chinese (Cantonese, Traditional)', value: 'zh-HK1' },
  { label: 'Chinese (Mandarin, Simplified)', value: 'zh-CN' },
  { label: 'Spanish (Mexico)', value: 'es-MX' },
  { label: 'Spanish (Spain)', value: 'es-ES' },
  { label: 'Swedish (Sweden)', value: 'sv-SE1' },
  { label: 'Vietnamese (Vietnam)', value: 'vi-VN1' },
  { label: 'English (Australia)', value: 'en-AU' },
  { label: 'English (Canada)', value: 'en-CA' },
  { label: 'English (India)', value: 'en-IN' },
  { label: 'English (United Kingdom)', value: 'en-GB' },
  { label: 'English (United States)', value: 'en-US' },
]

const LEVELS = [
  {
    name: 'beginning',
    descriptions: 'Make simple sentences using everyday words for clear communication.',
  },
  {
    name: 'intermediate',
    descriptions: 'Use different sentence structures and proper punctuation to express ideas clearly.',
  },
  {
    name: 'advanced',
    descriptions:
      'Master complex structures, employ a precise vocabulary, and use strategies for clear communication of sophisticated concepts.',
  },
]

const LEVEL_CRITERIA = `
Level 1: Basic Sentences
Grammar and Syntax:
Sentences should have correct grammar and basic syntax.
Simple sentence structures (subject-verb-object).
Use of common conjunctions (and, but, or).
Vocabulary:
Use of common and everyday words.
Limited use of specialized or complex vocabulary.
Clarity:
Clear and straightforward communication.
Avoidance of ambiguous or convoluted phrasing.

Level 2: Intermediate Sentences
Grammar and Syntax:
More varied sentence structures (e.g., compound and complex sentences).
Correct use of punctuation for emphasis and clarity.
Proper use of verb tenses and agreement.
Vocabulary:
Expanded vocabulary with a mix of common and more advanced words.
Use of synonyms and varied expressions.
Clarity:
Clear communication with the ability to express more nuanced ideas.
Awareness of context for effective communication.

Level 3: Advanced Sentences
Grammar and Syntax:
Mastery of complex sentence structures (e.g., subordinate clauses, participial phrases).
Skillful use of rhetorical devices (e.g., parallelism, inversion).
Varied sentence beginnings for stylistic effect.
Vocabulary:
Extensive and precise vocabulary.
Effective use of domain-specific terminology.
Ability to convey abstract and sophisticated concepts.
Clarity:
Clear communication of complex ideas.
Use of rhetorical strategies to enhance persuasiveness or engagement.

As users progress through each level, they can expect an increase in linguistic complexity and sophistication. These criteria provide a framework for gradually advancing the difficulty of generated sentences.
`

const INTERESTS = [
  'Music',
  'Dance',
  'Food',
  'Fashion',
  'Beauty',
  'Comedy',
  'Entertainment',
  'Fitness',
  'Health',
  'DIY',
  'Crafts',
  'Travel',
  'Adventure',
  'Pets',
  'Education',
  'Technology',
  'Gaming',
  'Art',
  'Books',
  'Movies',
  'Sports',
  'Home Decor',
  'Photography',
  'Nature',
  'Science',
  'History',
  'Cooking',
  'Yoga',
  'Hiking',
  'Business',
  'Entrepreneurship',
  'Parenting',
  'Gardening',
  'Fashion Design',
  'Mental Health',
  'Travel Photography',
  'Space Exploration',
  'Languages',
  'Cars',
  'Sustainability',
  'Environment',
  'Astrology',
  'Cooking Shows',
  'Tech Gadgets',
  'Podcasts',
  'Singing',
  'Writing',
  'Craft Beer',
  'Fashion Accessories',
  'Animation',
  'Financial Literacy',
]

export { FONTS, THEME, LANGUAGES, INTERESTS, LEVELS, LEVEL_CRITERIA }
