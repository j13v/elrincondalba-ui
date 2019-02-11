// Core
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Map from '@global/components/Map';
import ContactForm from '../ContactForm';

export const ContactView = ({createOrder}) => (
  <Grid container spacing={32}>
    <Grid item xs={6}>
      <h2>Contacta con nosotros</h2>
      <ContactForm onRequest={console.log} stock="5c60366cc71df142684d8541" />
    </Grid>
    <Grid item xs={6}><Map /></Grid>
  </Grid>
);


export default ContactView;
