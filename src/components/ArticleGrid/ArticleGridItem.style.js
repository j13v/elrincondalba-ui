export default theme => ({
  root: {
    filter: 'unset',
    backgroundPosition: '50% 50%',
    backgroundOrigin: 'border-box',
    backgroundSize: 'cover',
  },
  imageBox: {
    position: 'relative',
    overflow: 'hidden',
    '&:hover $image': {
      transition: 'all .5s',
      transform: 'scale(1.2)',
    },
  },
  image: {

  },
  infoName: {
    textAlign: 'center',
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
    opacity: '0',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
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
    '&:hover': {
      backgroundColor: 'rgba(173, 139, 96, 0.60)',
      opacity: 1,
    },
  },
});
