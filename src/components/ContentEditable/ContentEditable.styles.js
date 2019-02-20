export default theme => ({
  root: {},
  editable: {
    backgroundColor: '#EFEFEF',
    borderRadius: '5px',
    cursor: 'text',
    '&:hover': {
      backgroundColor: '#DFDFDF',
    },
    '&:focus': {
      backgroundColor: '#EFEFEF',
      outline: 'none !important',
      boxShadow: '0 0 10px #333',
      color: '#333',
    },
  },
});
