import React, { useContext, useEffect } from "react";
import defaultUser from "../../public/png/default-user.png";
import UserContext from "../../context/user/userContext";
import quizImage from "../../public/img/quiz-time.jpg";

const Leaderboard = props => {
  const userContext = useContext(UserContext);
  const { users, getUsers } = userContext;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="leaderboard">
      <div className="leaderboard__header">
        <div className="leaderboard__header--search">
          <input type="text" placeholder="Search" />

          <div className="header__quiz">
            <img
              src={quizImage}
              className={`header__quiz--image header__quiz--easy`}
              alt=""
            />
            <div className="header__quiz--title">Title</div>
          </div>
        </div>
      </div>
      <div className="leaderboard__title">Leaderboard</div>
      <div className="leaderboard__nav">
        <div className="leaderboard__nav--rank">#</div>
        <div className="leaderboard__nav--avatar">Avatar</div>
        <div className="leaderboard__nav--username">Username</div>
        <div className="leaderboard__nav--created">Created</div>
        <div className="leaderboard__nav--completed">Completed</div>
        <div className="leaderboard__nav--solved">Solved</div>
        <div className="leaderboard__nav--true">True</div>
        <div className="leaderboard__nav--pass">Pass</div>
        <div className="leaderboard__nav--false">False</div>
        <div className="leaderboard__nav--total">Total</div>
      </div>
      {users
        ? users.map((user, index) => (
            <div className="leaderboard__board">
              <div className="leaderboard__nav--rank">{index + 1}</div>
              <div className="leaderboard__nav--avatar">
                <div className="leaderboard__nav--image">
                  <img src={defaultUser} alt="default user" />
                </div>
              </div>
              <div className="leaderboard__nav--username">{user.username}</div>
              <div className="leaderboard__nav--created">{user.totalQuiz}</div>
              <div className="leaderboard__nav--completed">
                {user.totalCompleted}
              </div>
              <div className="leaderboard__nav--solved">{user.totalSolved}</div>
              <div className="leaderboard__nav--true">{user.totalTrue}</div>
              <div className="leaderboard__nav--pass">{user.totalPass}</div>
              <div className="leaderboard__nav--false">{user.totalFalse}</div>
              <div className="leaderboard__nav--total">{user.totalPoint}</div>
            </div>
          ))
        : null}
    </section>
  );
};

export default Leaderboard;
