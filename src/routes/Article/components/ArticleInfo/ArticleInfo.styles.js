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
  briefBox: {
    fontSize: '14px',
    color: '#bcbcbc',
    backgroundImage: 'linear-gradient(to left, #bcbcbc 33%, rgba(255,255,255,0) 0%)',
    backgroundPosition: 'bottom',
    backgroundSize: '20px 1px',
    backgroundRepeat: 'repeat-x',
    padding: '0em 0 1em 0',
    lineHeight: '1.5',
    margin: '1em 0',
  },
  description: {
    lineHeight: '1.6em',
    fontWeight: '100',
    letterSpacing: '0.04em',
    fontSize: '22px',
    textTransform: 'lowercase',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
});
