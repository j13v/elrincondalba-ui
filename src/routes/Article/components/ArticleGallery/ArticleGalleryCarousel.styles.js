export default theme => ({
  root: {
    margin: '-8px 0',
  },
  image: {
    paddingBottom: '116.33%',
    width: '100%',
    cursor: 'pointer',
    margin: '8px 0',
    '&div': {
      filter: 'brightness(50%)',
    },
    '&$selected': {
      filter: 'none',
    },
  },
  add: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#efefef',
    boxShadow: 'inset #ffffff 0px 0px 0px 8px, inset #ffffff 0px -24px 0px 0px',
    border: '#efefef solid 1px',
    color: '#c4c4c4',
    fontWeight: '100',
    lineHeight: '10px',
    display: 'inline-block',
    position: 'relative',
    '&:after, &:before': {
      content: '""',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '5em',
      height: '4em',
      borderRadius: '5px',
      border: '#cecece 0.2em solid',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%)',
      boxShadow: '#D4D4D4 0.05em 0.05em 0px 0px',
    },
    '&:before': {
      // boxShadow: 'inset #d4d4d4 3px -1px 0px 1px, ',
      boxShadow: 'inset #d4d4d4 0.2em -0.1em 0px 0.1em, #d4d4d4 1.8em -2.4em 0px -1.2em, #d4d4d4 -2em -1.7em 0px -1.2em',
      borderRadius: '50%',
      border: '#cecece 0.2em solid',
      width: '2.5em',
      height: '2.5em',
      position: 'absolute',
      top: '30%',
      transform: 'translate(-50%)',
      left: '50%',
    },
  },
  selected: {

  },
});
