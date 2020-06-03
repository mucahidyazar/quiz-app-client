import gql from "graphql-tag";

export const GET_QUIZES = gql`
  query {
    quizes {
      id
      quizQuestions {
        question
        correnct_answer
        incorrect_answer
        correct
      }
      quizScoreboard
      imageInformation {
        fieldname
        originalname
        encoding
        mimetype
        destination
        filename
        path
        size
      }
      quizTitle
      quizDescription
      quizCategory
      quizType
      quizDifficulty
      quizDate
      quizAuthor
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
      email
      password
      totalQuiz
      totalCompleted
      totalSolved
      totalTrue
      totalPass
      totalFalse
      totalPoint
    }
  }
`;
