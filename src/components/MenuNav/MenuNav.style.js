export default theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row',
    listStyle: 'none',
    padding: 0,
  },
  nav: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
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
