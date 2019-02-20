// Core
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Components
import Radio from '@material-ui/core/Radio';
// Hooks
import { makeStyles } from '@material-ui/styles';
// Styles
import styles from './ArticleSizeSelector.styles';


export const parseSizes = sizes => sizes.map(label => ({label, value: label.toLowerCase()}));
export const useStyles = makeStyles(styles);

export const ArticleSizeSelector = ({
  sizes,
  onChange,
  value: selected,
  ...restProps
}) => {

  const classes = useStyles(restProps);
  const seed = (~~(Math.random() * 0xFFFF)).toString(16);

  return (
    <div className={classes.root}>
      {sizes.map(({label, value, ...restRadioProps}, idx) => (
        <Radio
          key={idx}
          color="primary"
          checked={selected === value}
          classes={{
            root: classes.radio,
            colorPrimary: classes.colorPrimary,
            checked: classes.checked,
            disabled: classes.disabled,
          }}
          icon={<span className={classes.label}>{label}</span>}
          checkedIcon={<span className={classes.label}>{label}</span>}
          onChange={onChange}
          name={`article-size-selector-${seed}`}
          value={value}
          {...restProps}
          {...restRadioProps} />
      ))}
    </div>
  );
};

ArticleSizeSelector.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),
};

ArticleSizeSelector.defaultProps = {
  sizes: parseSizes(['XS', 'S', 'M', 'L', 'XL']),
};

export default ArticleSizeSelector;
