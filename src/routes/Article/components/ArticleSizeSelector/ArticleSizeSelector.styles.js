export default theme => ({
  root: {
    display: 'table',
    listStyle: 'none',
    margin: '1rem 0',
    padding: 0,
    color: '#e5e5e5',
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
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRightStyle: 'none',
    borderRadius: 0,
    color: 'inherit',
    '&:last-child': {
      borderRightStyle: 'solid',
      boxShadow: 'none !important',
    },
    '&$disabled': {
      backgroundColor: '#EFEFEF',
    },
    '&$disabled $label': {
      color: '#A2A2A2',
    },
  },
  colorPrimary: {
    '&$checked': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
      boxShadow: `inset -1px 0px 0px 0px ${theme.palette.primary.dark}`,
      '& $label': {
        color: theme.palette.primary.dark,
        fontWeight: 200,
      },
    },
  },
  label: {
    color: '#000',
  },
  checked: {},
  disabled: {},
  fullWidth: {},
});
