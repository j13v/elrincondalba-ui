export default theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    boxShadow: 'none',
    borderBottom: '1px solid #EFEFEF',
  },
  brand: {
    flexGrow: 1,
    fontWeight: 600,
    fontStyle: 'normal',
    marginLeft: '1em',
    fontSize: '1.5rem',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(theme.breakpoints.values.lg + theme.spacing(3 * 2))]: {
      width: theme.breakpoints.values.lg,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});
