export default theme => ({
  root: {
    // display: 'block', // Fix IE 11 issue.
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
    // [theme.breakpoints.up(1200 + theme.spacing.unit * 3 * 2)]: {
    //   width: 1200,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },
  container: {
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(theme.breakpoints.values.lg + theme.spacing.unit * 3 * 2)]: {
      width: theme.breakpoints.values.lg,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  breadcrumbs: {
    margin: '10px 0',
  },
});
