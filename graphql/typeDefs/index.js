import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
  }

  type Mutation {
    createCat(name: String!): Cat!
  }

  type Cat {
    id: ID!
    name: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    totalQuiz: Int!
    totalCompleted: Int!
    totalSolved: Int!
    totalTrue: Int!
    totalPass: Int!
    totalFalse: Int!
    totalPoint: Int!
  }
`;
