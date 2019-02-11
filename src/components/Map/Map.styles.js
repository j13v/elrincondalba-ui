
export default theme => [{
  stylers: [{saturation: -100}],
}, {
  featureType: 'poi',
  elementType: 'all',
  stylers: [{visibility: 'off'}],
}, {
  featureType: 'transit',
  elementType: 'labels.icon',
  stylers: [{visibility: 'off'}],
}, {
  featureType: 'road.highway',
  elementType: 'geometry.fill',
  stylers: [{
    color: theme.palette.primary.light,
  }],
}, {
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{
    color: theme.palette.primary.dark,
  }],
}];
