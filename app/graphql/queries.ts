import { gql } from '@apollo/client';

export const GET_ENTITIES = gql`
  query GetEntities {
    getEntities {
      id
      name
      __typename
      ... on Company {
        industry
        contactEmail
      }
      ... on Contact {
        id
        name
        email
        phone
      }
    }
  }
`;
export const GET_ENTITY = gql`
  query GetEntity($id: ID!) {
    getEntity(id: $id) {
      id
      name
      __typename
      ... on Company {
        industry
        contactEmail
      }
      ... on Contact {
        email
        phone
      }
    }
  }
`;
export const UPDATE_ENTITY = gql`
  mutation UpdateEntity($input: UpdateEntityInput) {
    updateEntity(input: $input) {
      id
      name
      ... on Company {
        industry
        contactEmail
      }
      ... on Contact {
        email
        phone
      }
    }
  }
`;
export const CREATE_ENTITY = gql`
  mutation CreateEntity($input: CreateEntityInput) {
    createEntity(input: $input) {
      id
      name
      ... on Company {
        industry
        contactEmail
      }
      ... on Contact {
        email
        phone
      }
    }
  }
`;
