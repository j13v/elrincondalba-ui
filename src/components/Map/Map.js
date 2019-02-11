import React from 'react';
import { compose, withProps } from 'recompose';
import { useTheme } from '@material-ui/styles';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
// Styles
import styles from './Map.styles';


const useStyles = () => styles(useTheme());
const latLng = { lat: 40.287560, lng: -4.013650 };
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`;

const Map = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{
      height: '100%',
    }} />,
    containerElement: <div style={{
      height: '680px',
      marginTop: '85px',
    }} />,
    mapElement: <div style={{
      height: '100%',
    }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultOptions={{
      gestureHandling: 'none',
      zoomControl: true,
      disableDefaultUI: true,
      styles: useStyles(),
    }}
    defaultZoom={12}
    defaultCenter={latLng}>
    <Marker position={latLng} />
  </GoogleMap>
));


export default Map;
