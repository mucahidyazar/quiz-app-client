import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
    quizes: [Quizes!]!
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

  type Quizes {
    id: ID!
    quizQuestions: [QuizQuestion!]!
    quizScoreboard: [String]
    imageInformation: ImageInformation!
    quizTitle: String!
    quizDescription: String!
    quizCategory: String!
    quizType: String!
    quizDifficulty: String!
    quizDate: String!
    quizAuthor: ID!
  }

  type QuizQuestion {
    question: String
    correnct_answer: String
    incorrect_answer: [String]
    correct: Int
  }

  type ImageInformation {
    fieldname: String!
    originalname: String!
    encoding: String!
    mimetype: String!
    destination: String!
    filename: String!
    path: String!
    size: Int!
  }
`;
