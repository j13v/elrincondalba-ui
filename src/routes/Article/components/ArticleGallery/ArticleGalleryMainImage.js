// Core
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Hooks
import { makeStyles } from '@material-ui/styles';
// Components
import Dropzone from 'react-dropzone';
import LoadableImage from '@global/components/LoadableImage';
import styles from './ArticleGalleryMainImage.styles';

export const useStyles = makeStyles(styles);

export const ArticleGalleryMainImage = ({
  edit,
  image,
  onDrop,
  ...restProps
}) => {
  const classes = useStyles(restProps);

  return (
    <div className={classes.root}>
      <LoadableImage image={image} />
      {edit && (
      <Dropzone onDrop={onDrop} multiple={false}>
        {({getRootProps, getInputProps, isDragActive}) => (
          <div
            {...getRootProps()}
            className={classNames(
              classes.dropzone, {
                [classes.dropzoneActive]:
                isDragActive,
              }
            )}
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
  );
};

ArticleGalleryMainImage.propTypes = {
  edit: PropTypes.bool,
  image: PropTypes.string,
};

ArticleGalleryMainImage.defaultProps = {
  edit: false,
  image: '', // TODO base64 default image
};

export default ArticleGalleryMainImage;
