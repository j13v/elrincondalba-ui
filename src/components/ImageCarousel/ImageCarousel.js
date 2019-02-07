import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import virtualize from 'react-swipeable-views-utils/lib/virtualize';
import bindKeyboard from 'react-swipeable-views-utils/lib/bindKeyboard';
import SwipeableViews from 'react-swipeable-views';
// import { modulo } from './util';
export const modulo = (a, n) => ((a % n) + n) % n;
const VirtualizeSwipeViews = bindKeyboard(virtualize(SwipeableViews));

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

const carouselSlideRenderer = children => ({index, key}) => React.cloneElement(children[modulo(index, children.length)], {key});

export default function Carousel({
  children, index, onChange, ...restProps
}) {
  const classes = useStyles();
  const theme = useTheme();

  const slideRenderer = carouselSlideRenderer(React.Children.toArray(children));
  return (
    <VirtualizeSwipeViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={index}
      onChangeIndex={onChange}
      {...restProps}
      slideRenderer={slideRenderer}
    />
  );
}
