import React, { useContext, useEffect } from "react";
import Quiz from "./Quiz/Quiz";
import QuizContext from "../../context/quiz/quizContext";
import Spinner from "../Spinner/Spinner";

const Quizes = () => {
  const quizContext = useContext(QuizContext);
  const { getQuizes, quizes, quizesLoading } = quizContext;

  useEffect(() => {
    if (!quizes) {
      getQuizes();
    }
  }, []);

  return (
    <section className="section__quizes">
      {quizes === null && quizesLoading ? (
        <Spinner />
      ) : (
        quizes.map((quiz, index) => (
          <Quiz key={index + 1} index={index} quiz={quiz} info={quiz[0]} />
        ))
      )}
    </section>
  );
};

export default Quizes;

//Category"Books Type:Multiple Difficult:Hard
