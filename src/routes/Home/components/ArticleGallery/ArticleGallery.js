import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '@global/components/Link';
import Typography from './ArticleGalleryTypography';

const LayoutBody = ({children}) => children;
const styles = theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ArticleGallery(props) {
  const { classes } = props;

  const images = [
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/e654fcba4edf0afd5ef465b1beb2fc53/5D215242/t51.2885-15/e35/49759350_2210075629230653_7917598251271262349_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Zapatos',
      width: '40%',
      href: 'catalogo?categorias=zapatos',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/430a62764d1d2e42c3966161fa0bc01a/5D0C692A/t51.2885-15/e35/51518238_2054116344891416_2525790445819923623_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Conjuntos',
      width: '20%',
      href: 'catalogo?categorias=conjuntos',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/47a4502414beac904f5efe56c62091bb/5D0B253A/t51.2885-15/e35/46848678_842281679441984_3594095275529921691_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Chaquetas',
      width: '40%',
      href: 'catalogo?categorias=chaquetas',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/29ba73d37424f8be6dc7eff7c6c403d1/5D1F47C7/t51.2885-15/sh0.08/e35/p750x750/44626715_356236835149483_3407600073304698707_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Blusas',
      width: '38%',
      href: 'catalogo?categorias=blusas',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/f71be2050a1f4f79d2c648d709e52859/5D029150/t51.2885-15/e35/27881004_541810322854393_2350485878540861440_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Catálogo',
      width: '38%',
      href: 'catalogo',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/e6649238726bbb218eddafc31f527fd0/5D245C85/t51.2885-15/e35/37906449_471765419901706_2684274484629733376_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Complementos',
      width: '24%',
      href: 'catalogo?categorias=complementos',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/2d3ae29b2eb791cc557a86a6f55e7e09/5CE78DC7/t51.2885-15/e35/51171012_159463131716097_870583974506750431_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Temporada',
      width: '40%',
      href: 'catalogo?filtro=[temporada]',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/3028378680fb04bf79cad5e6e0899e5e/5D044E8B/t51.2885-15/e35/27881159_585411765142749_6726679888100589568_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: ' Nueva colección',
      width: '20%',
      href: 'catalogo?filtro=[nuevaColeccion]',
    },
    {
      url:
        'https://instagram.fmad10-1.fna.fbcdn.net/vp/f13e2badf38f8d2ad610bc449180cccd/5CF599D3/t51.2885-15/e35/25025175_2031110043573556_3126835920628613120_n.jpg?_nc_ht=instagram.fmad10-1.fna.fbcdn.net',
      title: 'Jerseys',
      width: '40%',
      href: 'catalogo?categorias=jerseys',
    },
  ];

  return (
    <LayoutBody className={classes.root} component="section" width="large">
      <Typography variant="h4" marked="center" align="center" component="h2" />
      <div className={classes.images}>
        {images.map(image => (
          <Link
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
            to={image.href}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </LayoutBody>
  );
}

ArticleGallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleGallery);
