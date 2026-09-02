// Rajakiya design system — palette
// Direction: "premium exam-prep" — deep navy authority + antique gold accent,
// warm paper backgrounds in light mode, ink-navy backgrounds in dark mode.
// Every screen should read theme.* tokens rather than hardcoding hex values.

const lightTheme = {
  dark: false,

  // Brand
  primary: '#12335F',
  primaryDark: '#081A33',
  primaryLight: '#2C5A94',
  accent: '#C79A3E',
  accentDark: '#9C7526',
  accentSoft: '#F3E6C6',

  // Semantic
  success: '#1E7145',
  successSoft: '#E3F1E8',
  danger: '#B3261E',
  dangerSoft: '#FBE7E5',
  info: '#1D6FA5',
  infoSoft: '#E4F0F8',

  // Surfaces
  background: '#F7F4EC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1ECDD',
  surfaceRaised: '#FFFFFF',

  // Text
  text: '#1A2233',
  muted: '#5C6577',
  faint: '#8C93A1',
  onPrimary: '#FFFFFF',
  onAccent: '#2A1D06',

  // Structure
  border: '#E4DFCF',
  borderStrong: '#D3CCB6',
  cardShadow: '#0B1220',
  statusBar: '#081A33',

  // Gradients (array form, ready for LinearGradient `colors`)
  heroGradient: ['#081A33', '#12335F', '#2C5A94'],
  accentGradient: ['#C79A3E', '#9C7526'],
};

const darkTheme = {
  dark: true,

  primary: '#4C81C0',
  primaryDark: '#0A1830',
  primaryLight: '#6FA0DA',
  accent: '#E0B75C',
  accentDark: '#B98A34',
  accentSoft: '#3A2E11',

  success: '#4CAF7D',
  successSoft: '#123324',
  danger: '#E2685F',
  dangerSoft: '#3A1613',
  info: '#5FA8DD',
  infoSoft: '#0F2436',

  background: '#080F1E',
  surface: '#101B2E',
  surfaceAlt: '#172542',
  surfaceRaised: '#152238',

  text: '#F4F1E8',
  muted: '#A9B2C4',
  faint: '#79839A',
  onPrimary: '#FFFFFF',
  onAccent: '#241A05',

  border: '#233150',
  borderStrong: '#2E3F63',
  cardShadow: '#000000',
  statusBar: '#080F1E',

  heroGradient: ['#050B18', '#0F2748', '#1E4A78'],
  accentGradient: ['#E0B75C', '#B98A34'],
};

export const getTheme = mode => (mode === 'dark' ? darkTheme : lightTheme);

// Shape tokens (radius / elevation) — mode-independent, imported alongside getTheme.
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#0B1220',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  raised: {
    shadowColor: '#0B1220',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 6,
  },
};
