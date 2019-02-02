import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


export const CreateArticle = ({deleteArticle}) => {
  let input;
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        deleteArticle({
          variables: {
            id: input.value,
          },
        }).then(data => console.log(input.value, data));
      }}>
        <input ref={node => input = node} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

const MUTATION_DELETE_ARTICLE = gql`
  mutation deleteArticle($id: String!) {
    deleteArticle(id: $id) {
      id
      name
    }
  }
`;

export default graphql(MUTATION_DELETE_ARTICLE, {
  name: 'deleteArticle',
})(CreateArticle);
// export default CreateArticle;


// <Mutation mutation={MUTATION_DELETE_ARTICLE}>
//   {(mutate, ...args) => (
//
//   )}
// </Mutation>


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
