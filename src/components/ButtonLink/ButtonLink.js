import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '../Link';


export default ({children, ...restProps}) => (
  <Button component={Link} {...restProps}>
    {children}
  </Button>
);
