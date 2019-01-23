export default theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexFlow: 'row nowrap',
    flexGrow: 1,
  },
  sideBar: {
    width: '50px',
  },
  mainContainer: {
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'column nowrap',
    overflow: 'hidden',
  },
  mainView: {
    flexGrow: 1,
    display: 'flex',
    flexFlow: 'column',
  },
});
