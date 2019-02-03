export default theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  link: {
    textTransform: 'uppercase',
    fontWeight: 100,
  },
  active: {
    '& $link': {
      color: '#ad8b60',
    },
  },
});
