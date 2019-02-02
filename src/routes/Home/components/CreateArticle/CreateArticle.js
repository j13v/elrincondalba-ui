import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// const ADD_TODO = gql`
//   mutation CreateArticle(
//     name: String!,
//     description: String,
//     price: Float!,
//     images: [String]!
//     category: String!
//     rating: Int!) {
//     create(type: $type, description) {
//       id
//       name
//       description
//       price
//       images
//       category
//       rating
//     }
//   }
// `;

const MUTATION_DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: String!) {
    delete(id: $id) {
      id
      name
      description
      price
      images
      category
      rating
    }
  }
`;

export const CreateArticle = (props) => {
  let input;
  return (
    <div>
      <form
        onSubmit={(e) => {
          // console.log(args, mutate, input.value);
          e.preventDefault();
          // mutate({ variables: {id: input.value} });
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};


// export default graphql(MUTATION_DELETE_ARTICLE)(CreateArticle);
export default CreateArticle;


// <Mutation mutation={MUTATION_DELETE_ARTICLE}>
//   {(mutate, ...args) => (
//
//   )}
// </Mutation>
