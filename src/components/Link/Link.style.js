export default theme => ({
  root: {
    textDecoration: 'none',
    color: '#444444',
    fontWeight: 100,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
});
