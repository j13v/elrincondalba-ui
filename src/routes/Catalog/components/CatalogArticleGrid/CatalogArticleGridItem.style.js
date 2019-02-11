export default theme => ({
  root: {
    filter: 'unset',
    backgroundPosition: '50% 50%',
    backgroundOrigin: 'border-box',
    backgroundSize: 'cover',
  },
  media: {
    position: 'relative',
    overflow: 'hidden',
    '&:hover $overlay': {
      opacity: 1,
    },
    '&:hover $control': {
      padding: '10px',
    },
    '&:hover $image': {
      transform: 'scale(1.2)',
    },
  },
  image: {
    transition: 'transform .5s',
    boxShadow: 'inset 0px 0px 1px 1px #efefef',
    // position: 'absolute',
    // top: 0,
    // left: 0,
  },
  overlay: {
    transition: 'opacity .5s',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
  control: {
    transition: 'padding .5s',
    padding: 0,
    width: '50%',
    position: 'absolute',
    height: '100%',
    color: '#FFFFFF',
    backgroundColor: 'inherit !important',
    borderRadius: 0,
    '&:first-child': {
      left: 0,
      '& > span': {
        justifyContent: 'flex-start',
      },
    },

    '&:last-child': {
      right: 0,
      '& > span': {
        justifyContent: 'flex-end',
      },
    },
  },
  infoName: {
    textAlign: 'center',
    display: 'block',
    margin: '1em 0',
    fontWeight: '100',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  infoPrice: {
    textAlign: 'center',
    display: 'block',
    marginBottom: '1em',
  },
  ratingStars: {
    justifyContent: 'space-around',
    width: '50%',
    margin: '0 auto',
  },
  imageInset: {

    transform: 'translateY(100%)',
    position: 'absolute',

    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: 'rgba(173, 139, 96, 0.60)',
    color: '#FFFFFF',
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '80%',
      height: '80%',
      border: 'solid 3px #FFFFFF',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
});
