import AppCrashBug from '../../assets/images/app-crash-bug.png';


export default theme => ({
  root: {

  },
  media: {
    paddingTop: '56%',
    backgroundImage: `url(${AppCrashBug})`,
    backgroundOrigin: 'border-box',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '60% auto',
  },
});
