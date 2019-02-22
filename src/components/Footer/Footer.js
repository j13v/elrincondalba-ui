import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Typography from '../../routes/Home/components/ArticleGallery/ArticleGalleryTypography';
import styles from './Footer.style';


const useStyles = makeStyles(styles);

const Footer = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.main}>&nbsp;</div>
      <div className={classes.ending}>
&nbsp;
        <Typography variant="caption">
          <Link href="https://www.instagram.com/elrincondalba/?hl=es" title="Instagram">
                Instagram
          </Link>
          {' '}
          <Link href="https://www.facebook.com/Elrincondealba2204/" title="Facebook">
                Facebook
          </Link>
        </Typography>

      </div>

    </div>
  );
};

export default Footer;
