const THEME = {
  BACKGROUND: '#f6f5fa',
  COLOR: 'black',
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
  { label: 'Dutch', value: 'nl-NL' },
  { label: 'French', value: 'fr-FR' },
  { label: 'German', value: 'de-DE' },
  { label: 'Spanish', value: 'es-ES' },
  { label: 'Italian', value: 'it-IT' },
  { label: 'Portuguese', value: 'pt-PT' },
  { label: 'Russian', value: 'ru-RU' },
  { label: 'Japanese', value: 'ja-JP' },
  { label: 'Chinese', value: 'zh-CN' },
  { label: 'Arabic', value: 'ar-SA' },
  { label: 'Hindi', value: 'hi-IN' },
  { label: 'Korean', value: 'ko-KR' },
  { label: 'Turkish', value: 'tr-TR' },
  { label: 'Polish', value: 'pl-PL' },
  { label: 'Czech', value: 'cs-CZ' },
  { label: 'Swedish', value: 'sv-SE' },
  { label: 'Danish', value: 'da-DK' },
  { label: 'Norwegian', value: 'no-NO' },
  { label: 'Finnish', value: 'fi-FI' },
  { label: 'Greek', value: 'el-GR' },
  { label: 'Hebrew', value: 'he-IL' },
  { label: 'Hungarian', value: 'hu-HU' },
  { label: 'Romanian', value: 'ro-RO' },
  { label: 'Thai', value: 'th-TH' },
  { label: 'Indonesian', value: 'id-ID' },
  { label: 'Malay', value: 'ms-MY' },
  { label: 'Vietnamese', value: 'vi-VN' },
  { label: 'Filipino', value: 'tl-PH' },
  { label: 'Ukrainian', value: 'uk-UA' },
  { label: 'Bulgarian', value: 'bg-BG' },
  { label: 'Croatian', value: 'hr-HR' },
  { label: 'Serbian', value: 'sr-RS' },
  { label: 'Slovak', value: 'sk-SK' },
  { label: 'Slovenian', value: 'sl-SI' },
  { label: 'Estonian', value: 'et-EE' },
  { label: 'Latvian', value: 'lv-LV' },
  { label: 'Lithuanian', value: 'lt-LT' },
  { label: 'Icelandic', value: 'is-IS' },
  { label: 'Irish', value: 'ga-IE' },
  { label: 'Welsh', value: 'cy-GB' },
  { label: 'Galician', value: 'gl-ES' },
  { label: 'Basque', value: 'eu-ES' },
  { label: 'Albanian', value: 'sq-AL' },
  { label: 'Macedonian', value: 'mk-MK' },
  { label: 'Bosnian', value: 'bs-BA' },
  { label: 'Armenian', value: 'hy-AM' },
  { label: 'Georgian', value: 'ka-GE' },
  { label: 'Uzbek', value: 'uz-UZ' },
  { label: 'Tatar', value: 'tt-RU' },
  { label: 'Tajik', value: 'tg-TJ' },
  { label: 'Khmer', value: 'km-KH' },
  { label: 'Mongolian', value: 'mn-MN' },
  { label: 'Nepali', value: 'ne-NP' },
  { label: 'Sinhalese', value: 'si-LK' },
  { label: 'Punjabi', value: 'pa-IN' },
  { label: 'Tamil', value: 'ta-IN' },
  { label: 'Telugu', value: 'te-IN' },
  { label: 'Kannada', value: 'kn-IN' },
  { label: 'Urdu', value: 'ur-PK' },
  { label: 'Bengali', value: 'bn-BD' },
  { label: 'Lao', value: 'lo-LA' },
  { label: 'Burmese', value: 'my-MM' },
  { label: 'Kyrgyz', value: 'ka-KG' },
  { label: 'Uighur', value: 'ug-CN' },
  { label: 'Turkmen', value: 'tm-TM' },
  { label: 'Kurdish', value: 'ku-IQ' },
  { label: 'Persian', value: 'fa-IR' },
  { label: 'Pashto', value: 'ps-AF' },
  { label: 'Divehi', value: 'dv-MV' },
  { label: 'Bihari', value: 'bh-IN' },
  { label: 'Marathi', value: 'mr-IN' },
  { label: 'Sanskrit', value: 'sa-IN' },
  { label: 'Kazakh', value: 'kk-KZ' },
  { label: 'Kyrgyz', value: 'ky-KG' },
  { label: 'Azerbaijani', value: 'az-AZ' },
  { label: 'Belarusian', value: 'be-BY' },
  { label: 'English', value: 'en-US' },
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
