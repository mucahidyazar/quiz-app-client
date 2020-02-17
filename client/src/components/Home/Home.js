import React, { useContext, useEffect } from "react";
import imgQuizTime from "../../public/img/quiz-time.jpg";
import QuizesContext from "../../context/quizes/quizesContext";
import { Link } from "react-router-dom";

const Home = props => {
  const quizesContext = useContext(QuizesContext);
  const { traviasQuizes, getTraviasQuizes } = quizesContext;

  useEffect(() => {
    getTraviasQuizes();
  }, []);

  const randomQuizLink = () => {
    if (traviasQuizes) {
      return `/quiz/${Math.floor(Math.random() * traviasQuizes.length)}`;
    } else {
      return "!#";
    }
  };

  return (
    <section className="section__main">
      <div className="section__left">
        <h2 className="section__left-header">Hey I'm Travia Quiz App</h2>
        <p className="section__left-paragraph">
          I am a full stack app. You can solve some quiz with me. And you can
          create new quizes with me soon. I was designed with React and NodeJS.
          And I am pulling some examples from www.opentdb.com.
        </p>
      </div>
      <div className="section__right">
        <div className="section__right-img">
          <img src={imgQuizTime} alt="Quiz Time" />
        </div>
        <div className="section__right-header">Random Quiz</div>
        <div className="section__right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, dicta?
        </div>
        <div className="section__right-button">
          <Link to={randomQuizLink}>Start</Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

//Dark Mode Moon => <i class="fas fa-moon"></i>
