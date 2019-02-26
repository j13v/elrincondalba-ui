import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconFacebook from '../../assets/icons/facebook.svg';
import IconInstagram from '../../assets/icons/instagram.svg';
import styles from './Footer.style';


const useStyles = makeStyles(styles);
const Footer = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <Grid container spacing={40}>

          <Grid item xs={4} sm={4} md={4} className={classes.links}>
              Enlaces
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="catalogo">Catalogo</Link>
              </li>
              <li>
                <Link href="contacto">Contacto</Link>
              </li>
            </ul>
          </Grid>

          <Grid item xs={4} sm={4} md={4} className={classes.conditions}>
          Terminos y condiciones
            <ul>
              <li>
                <Link href="/">POLÍTICA DE PRIVACIDAD</Link>
              </li>
              <li>
                <Link href="/">CONDICIONES DE COMPRA</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
          Redes sociales
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={16}
            >
              <Grid item className={classes.icons}>
                <a href="https://www.instagram.com/elrincondalba/?hl=es" title="Instagram" className={classes.icon}>
                  <img src={IconInstagram} alt="Facebook" height="25" width="25" />
                </a>
                <a href="https://www.facebook.com/Elrincondealba2204/" title="Facebook" className={classes.icon}>
                  <img src={IconFacebook} alt="Instagram" height="25" width="25" />
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Grid item>© 2019 El rincón D'Alba</Grid>
          </Grid>
        </Grid>
      </div>
      <div className={classes.ending} />
    </div>
  );
};

export default Footer;
