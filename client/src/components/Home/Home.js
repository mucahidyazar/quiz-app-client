import React from "react";
import imgQuizTime from "../../public/img/quiz-time.jpg";

const Home = props => {
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
        <div className="section__right-button">Start</div>
      </div>
    </section>
  );
};

export default Home;

//Dark Mode Moon => <i class="fas fa-moon"></i>
