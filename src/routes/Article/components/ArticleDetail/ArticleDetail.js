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
import ArticleInfo from '../ArticleInfo';
import OrderForm from '../OrderForm';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const useStyles = makeStyles(style);

const useKeyDown = (handler, elem = document) => useEffect(() => {
  elem.addEventListener('keydown', handler, false);
  return () => {
    elem.removeEventListener('keydown', handler, false);
  };
});


const getImageByMode = (mode, images, previews) => (mode === 'edit'
  ? previews
  : images.map(id => `/images/${id}`));


export const ArticleDetail = ({
  loading,
  mode,
  id,
  name,
  category,
  price,
  images,
  stock,
  rating,
  description,
  onCreate,
  ...restProps
}) => {
  if (loading) {
    return 'LOADING';
  }

  const classes = useStyles(restProps);
  const [state, setState] = useState({
    mode: 'view',
    previews: [],
    files: [],
    selected: 0,
  });
  // const authz = useAuthz();
  const authz = {can: () => true};

  // useEffect(() => () => {
  //   previews.forEach(preview => URL.revokeObjectURL(preview));
  // }, [previews]);


  const onDrop = (files) => {
    setState({
      ...state,
      selected: state.previews.length,
      previews: [...state.previews, ...files.map(file => URL.createObjectURL(file))],
      files,
    });
  };

  const setImageIndex = (index) => {
    setState({
      ...state,
      selected: (index + previews.length) % previews.length,
    });
  };

  const handleMode = (evt, mode) => {
    setState({
      ...state,
      mode,
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
  console.log(state.mode);
  return (
    <Grid container spacing={16}>
      <Grid item xs={1}>
        {getImageByMode(state.mode, images, state.previews).map((src, idx) => (
          <LoadableImage
            onClick={() => setState({...state, selected: idx})}
            key={idx}
            image={src}
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
          <LoadableImage image={getImageByMode(state.mode, images, state.previews)[state.selected]} />
          {state.mode === 'edit' && (
          <Dropzone onDrop={onDrop} multiple={false}>
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
          )}
        </div>
      </Grid>
      <Grid item xs={6}>
        {state.mode === 'request'
          ? <OrderForm onRequest={console.log} stock="asdadsasd" />
          : (
            <ArticleInfo
              stock={stock}
              loading={loading}
              name={name}
              category={category}
              price={price}
              rating={rating}
              description={description}
              onCreate={(evt, data) => onCreate(evt, {...data, images: state.files})}
              onEdit={handleMode}
              onUpdate={() => console.log('on update triggered in article detail')}
              onRequest={handleMode}
      />
          )
      }
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
