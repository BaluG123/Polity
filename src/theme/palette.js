export const getTheme = mode => {
  const dark = mode === 'dark';
  return {
    dark,
    primary: '#1976D2',
    primaryDark: '#0D47A1',
    accent: '#F57C00',
    success: '#2E7D32',
    background: dark ? '#0B1220' : '#F6F8FB',
    surface: dark ? '#111827' : '#FFFFFF',
    surfaceAlt: dark ? '#1F2937' : '#EEF4FA',
    text: dark ? '#F8FAFC' : '#1F2937',
    muted: dark ? '#CBD5E1' : '#64748B',
    border: dark ? '#334155' : '#E2E8F0',
    cardShadow: dark ? '#000000' : '#1E293B',
    statusBar: dark ? '#0B1220' : '#1976D2',
  };
};
