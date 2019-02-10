import React from 'react';
import PropTypes from 'prop-types';
import MuiBreadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';


export const Breadcrumbs = () => {
  console.log('pepe');
  return (
    <MuiBreadcrumbs arial-label="Breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
      Material-UI
      </Link>
      <Link color="inherit" href="/lab/about/" onClick={handleClick}>
      Lab
      </Link>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </MuiBreadcrumbs>
  );
};


export default Breadcrumbs;
