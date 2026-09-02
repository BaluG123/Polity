// Rajakiya design system — typography scale.
// No custom font is bundled yet (adding one means relinking native assets),
// so this scale leans on weight, size and letter-spacing for hierarchy using
// the system font. Swap fontFamily in one place here if a custom face is
// added later — every screen should read `type.*` rather than raw fontSize.

export const type = {
  display: { fontSize: 34, fontWeight: '900', letterSpacing: 0.2 },
  h1: { fontSize: 26, fontWeight: '800', letterSpacing: 0.1 },
  h2: { fontSize: 21, fontWeight: '800' },
  h3: { fontSize: 17, fontWeight: '700' },
  bodyLg: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  body: { fontSize: 14.5, fontWeight: '400', lineHeight: 22 },
  bodyStrong: { fontSize: 14.5, fontWeight: '700', lineHeight: 21 },
  caption: { fontSize: 12.5, fontWeight: '600', lineHeight: 17 },
  label: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  button: { fontSize: 15.5, fontWeight: '800', letterSpacing: 0.2 },
};
