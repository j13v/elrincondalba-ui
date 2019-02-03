import Fonts from './CssBaseline.fonts';


export default theme => ({
  '@font-face': Fonts,
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box',
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      backgroundColor: theme.palette.background.default,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      '@media print': {
        // Save printer ink.
        backgroundColor: theme.palette.common.white,
      },
    },
  },
});

// [{
//   '"font-family"': 'Montserrat',
//   src: `url("${FontMonserratBold}") format("woff2")`,
//   '"font-weight"': '700',
// }],
