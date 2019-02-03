export default theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  brand: {
    flexGrow: 1,
    fontWeight: 600,
    fontStyle: 'normal',
    marginLeft: '1em',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbar: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(theme.breakpoints.values.lg + theme.spacing.unit * 3 * 2)]: {
      width: theme.breakpoints.values.lg,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});
