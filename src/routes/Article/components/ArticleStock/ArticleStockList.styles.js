export default theme => ({
  root: {
    // backgroundColor: '#EFEFEF',
  },
  listItem: {
    '& $button': {
      opacity: 0,
    },
    '&:hover $button': {
      opacity: 1,
    },
  },
  button: {

  },
});
