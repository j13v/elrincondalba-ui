export default theme => ({
  root: {
    textDecoration: 'none',
    color: '#444444',
    fontWeight: 100,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
});
