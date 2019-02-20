// Core
import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Switch } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group';
// Hooks
import { makeStyles } from '../../hooks';
// Styles
import styles from './SwitchAnimated.styles';

/*
https://github.com/reactjs/react-transition-group/blob/master/src/TransitionGroup.js
https://github.com/maisano/react-router-transition/blob/master/src/AnimatedSwitch.js
https://github.com/eko24ive/react-router-transitions/blob/master/src/index.js
https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Collapse/Collapse.js
*/

const useStyles = makeStyles(styles);

const SwitchAnimated = ({children, ...restProps}) => {
  const classes = useStyles(restProps);
  // console.log(CSSTransitionGroup);
  return (
  // <TransitionGroup
  //   className={classes.root}
  //   component="div"
  //   transitionName={getAnimation()}
  //   transitionEnterTimeout={600}
  //   transitionLeaveTimeout={300}>
    <Switch>{children}</Switch>
  // </TransitionGroup>
  );
};


export default SwitchAnimated;


// function getAnimation() {
//   const direction = 'rtl';
//   const calculatedAnimations = {};
//   const animationPrefix = 'navigation';
//
//   if (direction === 'rtl') {
//     calculatedAnimations.enter = `${animationPrefix}-enter-rtl`;
//     calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
//     calculatedAnimations.leave = `${animationPrefix}-leave-rtl`;
//     calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
//   } else if (direction === 'ltr') {
//     calculatedAnimations.enter = `${animationPrefix}-enter-ltr`;
//     calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
//     calculatedAnimations.leave = `${animationPrefix}-leave-ltr`;
//     calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
//   } else {
//     calculatedAnimations.enter = `${animationPrefix}-enter-fade`;
//     calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
//     calculatedAnimations.leave = `${animationPrefix}-leave-fade`;
//     calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
//   }
//
//   return calculatedAnimations;
// }


// const getAnimation = () => {
//   const direction = 'rtl';
//   const calculatedAnimations = {};
//   const animationPrefix = 'navigation';
//
//   if (direction === 'rtl') {
//     calculatedAnimations.enter = `${animationPrefix}-enter-rtl`;
//     calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
//     calculatedAnimations.leave = `${animationPrefix}-leave-rtl`;
//     calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
//   } else if (direction === 'ltr') {
//     calculatedAnimations.enter = `${animationPrefix}-enter-ltr`;
//     calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
//     calculatedAnimations.leave = `${animationPrefix}-leave-ltr`;
//     calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
//   } else {
//     calculatedAnimations.enter = `${animationPrefix}-enter-fade`;
//     calculatedAnimations.enterActive = `${animationPrefix}-enter-active`;
//     calculatedAnimations.leave = `${animationPrefix}-leave-fade`;
//     calculatedAnimations.leaveActive = `${animationPrefix}-leave-active`;
//   }
//
//   return calculatedAnimations;
// };
