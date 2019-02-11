export default theme => ({
  root: {
    display: 'table',
    listStyle: 'none',
    padding: 0,
    '& > *': {
      display: 'table-cell',
    },
  },
});
