// Core
import React, {useState} from 'react';
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

export const ArticleSizeSelector = ({sizes, ...restProps}) => {

  const classes = useStyles(restProps);
  const [selected, setSelected] = useState();
  const seed = (~~(Math.random() * 0xFFFF)).toString(16);

  function handleChange(event) {
    setSelected(event.target.value);
  }

  return (
    <div className={classes.root}>
      {sizes.map(({label, disabled, value}, idx) => (
        <Radio
          key={idx}
          color="primary"
          checked={selected === value}
          icon={<span className={classes.label}>{label}</span>}
          checkedIcon={<span className={classes.label}>{label}</span>}
          onChange={handleChange}
          name={`article-size-selector-${seed}`}
          className={classes.radio}
          value={value} />
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
