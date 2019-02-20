export default theme => ({
  root: {
    position: 'relative',
    '&>div': {
      // position: 'absolute',
    },
  },
});

// $naviagtion-animation-affects: all;
// $naviagtion-animation-time-cross-page: 600ms;
// $naviagtion-animation-time-current-page: 300ms;
// $naviagtion-animation-function: cubic-bezier(0.22, 0.82, 0.63, 0.93);
//
// .navigation {
//   a {
//     margin: 0 5px;
//   }
// }
//
// #container {
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
// }
//
// .navigation-enter-ltr {
//   position: absolute;
//
//   opacity: .5;
//   transform: translate3d(-100%, 0, 0);
//
//   &.navigation-enter-active {
//     transform: translate3d(0, 0, 0);
//     opacity: 1;
//     transition: $naviagtion-animation-affects $naviagtion-animation-time-cross-page $naviagtion-animation-function;
//   }
// }
//
// .navigation-leave-ltr {
//   position: absolute;
//   opacity: 1;
//   transform: translate3d(0, 0, 0);
//
//
//   &.navigation-leave-active {
//     opacity: .5;
//     transform: translate3d(100%, 0, 0);
//     transition: $naviagtion-animation-affects $naviagtion-animation-time-cross-page $naviagtion-animation-function;
//   }
// }
//
//
// .navigation-enter-rtl {
//   position: absolute;
//   opacity: .5;
//   transform: translate3d(100%, 0, 0);
//
//   &.navigation-enter-active {
//     opacity: 1;
//     transform: translate3d(0, 0, 0);
//     transition: $naviagtion-animation-affects $naviagtion-animation-time-cross-page $naviagtion-animation-function;
//   }
// }
//
// .navigation-leave-rtl {
//   position: absolute;
//   opacity: 1;
//   transform: translate3d(0, 0, 0);
//
//   &.navigation-leave-active {
//     opacity: .5;
//     transform: translate3d(-100%, 0, 0);
//     transition: $naviagtion-animation-affects $naviagtion-animation-time-cross-page $naviagtion-animation-function;
//   }
// }
//
// .navigation-enter-fade {
//   position: absolute;
//   opacity: 0;
//
//   &.navigation-enter-active {
//     opacity: 1;
//     transition: $naviagtion-animation-affects $naviagtion-animation-time-current-page $naviagtion-animation-function;
//   }
// }
//
// .navigation-leave-fade {
//   position: absolute;
//   opacity: 1;
//
//   &.navigation-leave-active {
//     opacity: 0;
//     transition: $naviagtion-animation-affects $naviagtion-animation-time-current-page $naviagtion-animation-function;
//   }
// }
