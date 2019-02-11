export default theme => ({
  root: {
    display: 'table',
    listStyle: 'none',
    margin: '1rem 0',
    padding: 0,
    color: '#e5e5e5',
    borderStyle: 'solid',
    borderWidth: '1px',
    '&$fullWidth': {
      width: '100%',
    },
  },
  radio: {
    padding: '0.5rem',
    fontWeight: 100,
    minWidth: '2em',
    display: 'table-cell',
    textAlign: 'center',
    borderRightStyle: 'solid',
    borderRightWidth: '1px',
    borderRadius: 0,
    color: 'inherit',
    '&:last-child': {
      border: 'none',
    },
    '&disabled': {
      color: '#e5e5e5',
    },
    '&checked': {
      boxShadow: '1px 1px 1px 1px #EFEFEF',
    },
  },
  label: {
    color: '#000',
  },
  checked: {},
  disabled: {},
  fullWidth: {},
});
