const THEME = {
  // BACKGROUND: '#FFF2D8',
  // COLOR: '#4D4637',
  // COLOR_ALT: '#0F2C59',
  // CTA: '#FF7C7C',
  // ACCENT: '#1A936F'
  BACKGROUND: 'white',
  COLOR: '#001524',
  COLOR_ALT: '#0F2C59',
  CTA: '#219C90',
  ACCENT: '#1A936F',
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

const SCREENS = {
  ONBOARDING: 'Onboarding' as never,
  DASHBOARD: 'Dashboard' as never,
  SETTINGS: 'Settings' as never,
}

const DATA = {
  USER_DATA: 'user:preferences',
  SETUP_COMPLETE: 'onboarding:complete',
}

export { THEME, FONTS, SCREENS, DATA }
