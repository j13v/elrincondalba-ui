import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ContactForm from '../ContactForm';

const CREATE_ORDER = gql`
mutation (
    $name: String!,
    $surname: String!,
    $email: String!,
    $address: String!,
    $phone: String!,
    $notes: String,
    $stock: String!,
  ) {
  createOrder(
    name: $name,
    surname: $surname,
    email: $email,
    address: $address,
    phone: $phone,
    notes: $notes,
    stock: $stock,
  ) {
    id
    state
    createdAt
    updatedAt
    stock {
      id
    }
    notes
    user {
      id
      name
    }
  }
}

`;
export const ContactView = ({createOrder}) => (
  <ContactForm onRequest={createOrder} stock="5c60366cc71df142684d8541" />
);
export default graphql(CREATE_ORDER, {
  props: ({mutate, ownProps}) => ({
    ...ownProps,
    createOrder: (evt, data) => mutate({
      variables: data,
    }),
  }),
})(ContactView);
