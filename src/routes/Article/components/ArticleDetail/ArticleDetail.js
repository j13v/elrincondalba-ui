import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Dropzone from 'react-dropzone';
import LoadableImage from '@global/components/LoadableImage';
import Button from '@material-ui/core/Button';
import { useAuthz } from '@global/hooks';

import style from './ArticleDetail.style';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const useStyles = makeStyles(style);

const useKeyDown = (handler, elem = document) => useEffect(() => {
  elem.addEventListener('keydown', handler, false);
  return () => {
    elem.removeEventListener('keydown', handler, false);
  };
});

export const ArticleDetail = ({
  loading,
  mode,
  id,
  name,
  category,
  price,
  images,
  stock,
  description,
  onCreate,
  ...restProps
}) => {
  if (loading) {
    return 'LOADING';
  }

  const classes = useStyles(restProps);
  const [state, setState] = useState({
    previews: [],
    files: [],
    selected: 0,
  });
  const authz = useAuthz();

  // useEffect(() => () => {
  //   previews.forEach(preview => URL.revokeObjectURL(preview));
  // }, [previews]);


  const onDrop = (files) => {
    setState({
      ...state,
      selected: previews.length,
      previews: [...previews, ...files.map(file => URL.createObjectURL(file))],
      files,
    });
  };

  const setImageIndex = (index) => {
    setState({
      ...state,
      selected: (index + previews.length) % previews.length,
    });
  };

  useKeyDown((evt) => {
    switch (evt.key) {
      case 'ArrowLeft':
        setImageIndex(selected - 1);
        break;
      case 'ArrowRight':
        setImageIndex(selected + 1);
        break;
      default:
        break;
    }
  });

  return (
    <Grid container spacing={16}>
      <Grid item xs={1}>
        {state.previews.map((preview, idx) => (
          <LoadableImage
            onClick={() => setState({...state, selected: idx})}
            key={idx}
            image={preview}
            style={{
              height: '100px',
              width: '100%',
              filter: idx === state.selected ? 'none' : 'brightness(50%)',
              cursor: 'pinter',
            }} />
        ))}
      </Grid>
      <Grid item xs={5}>
        <div className={classes.mediaContent}>
          <LoadableImage image={state.previews[state.selected]} />
          <Dropzone onDrop={onDrop}>
            {({getRootProps, getInputProps, isDragActive}) => (
              <div
                {...getRootProps()}
                className={classNames(classes.dropzone, {'dropzone--isActive': isDragActive})}
              >
                <input {...getInputProps()} />
                {
                  isDragActive
                    ? <p>Drop files here...</p>
                    : <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            )}
          </Dropzone>
        </div>
      </Grid>
      <Grid item xs={6}>
        <h2>
          {name}
        </h2>
        <small>
          {id}
        </small>
        <small>{category}</small>
        <p>
          {`${price}€`}
        </p>
        <p>Selecciona tu talla</p>
        <div>
          {sizes.map(($size, idx) => {
            const availableSize = stock.findIndex(({size}) => ($size === size)) !== -1;

            return (
              <span
                key={idx}
                style={{
                  border: 'solid 1px #e5e5e5',
                  padding: '0.5rem',
                  fontWeight: 100,
                  minWidth: '2em',
                  display: 'inline-block',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: availableSize ? 'inherit' : 'grey',
                }}>
                {$size}
              </span>
            );
          })}
        </div>
        <p>{description}</p>
        {authz.can('manage') && <Button onClick={evt => console.log('poquito a poco la voy editando')}>Edit</Button>}
        <Button onClick={evt => onCreate(evt, {images: files})}>Update</Button>
      </Grid>
    </Grid>
  );
};


ArticleDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  mode: PropTypes.oneOf(['edit', 'view']),
};

ArticleDetail.defaultProps = {
  images: [],
  mode: 'view',
};


export default ArticleDetail;

// <LoadableImage style={{height: '600px', width: '100%'}} />
