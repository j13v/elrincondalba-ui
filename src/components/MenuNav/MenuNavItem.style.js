export default theme => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  link: {
    textTransform: 'uppercase',
    fontWeight: 100,
  },
  active: {
    '& $link': {
      color: theme.palette.primary.main,
    },
  },
});
