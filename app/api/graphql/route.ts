import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import resolvers from './resolvers';

// Define GraphQL schema
const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  interface Entity {
    id: ID!
    name: String!
  }

  type Contact implements Entity {
    id: ID!
    name: String!
    email: String!
    phone: String
  }

  type Company implements Entity {
    id: ID!
    name: String!
    industry: String!
    contactEmail: String
  }

  input CreateEntityInput {
    entityType: EntityType!
    name: String!
    email: String
    phone: String
    industry: String
    contactEmail: String
  }

  input UpdateEntityInput {
    id: ID!
    entityType: EntityType!
    name: String
    email: String
    phone: String
    industry: String
    contactEmail: String
  }

  enum EntityType {
    CONTACT
    COMPANY
  }

  type Mutation {
    createEntity(input: CreateEntityInput): Entity
    updateEntity(input: UpdateEntityInput): Entity
  }

  type Query {
    getEntities: [Entity]
    getEntity(id: ID!): Entity
  }
`;

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start server and create Next.js handler

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
