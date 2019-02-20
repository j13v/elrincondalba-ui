// Core
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Hooks
import {
  makeStyles,
} from '@global/hooks';
// Mui Components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import IconTrash from '@material-ui/icons/Delete';
// Styles
import styles from './ArticleStockList.styles';


export const useStyles = makeStyles(styles);

export const ArticleStockList = ({refs, ...restProps}) => {
  const classes = useStyles(restProps);
  const [checked, setChecked] = useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {refs.map(({id, state, order}, sidx) => (
        <ListItem key={id} classes={{container: classes.listItem}} role={undefined} dense button onClick={handleToggle(id)}>
          <Checkbox
            color="primary"
            checked={checked.indexOf(id) !== -1}
            tabIndex={-1}
            disableRipple />
          <ListItemText primary={`${id} ${state} ${order}`} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Borrar" className={classes.button}>
              <IconTrash />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ArticleStockList;
