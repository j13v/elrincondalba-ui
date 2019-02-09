export default theme => ({
  root: {

  },
  mediaContent: {
    position: 'relative',
    width: '100%',
    paddingBottom: '133.33%',
    '& > *': {
      position: 'absolute',
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
    },
  },
  dropzone: {
    border: 'solid 2px #6f6c6c',
    borderStyle: 'dashed',
    padding: '1em',
    backgroundColor: 'rgba(0,0,0,0.2)',
    '& > p': {
      display: 'block',
      height: '100%',
      border: 'dashed 2px white',
      boxSizing: 'border-box',
      margin: 0,
      padding: '1em',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },
});
