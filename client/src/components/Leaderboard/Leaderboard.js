import React from "react";
import defaultUser from "../../public/png/default-user.png";

const Leaderboard = props => {
  return (
    <section className="leaderboard">
      <div className="leaderboard__header">Leaderboard</div>
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
      <div className="leaderboard__board">
        <div className="leaderboard__nav--rank">1</div>
        <div className="leaderboard__nav--avatar">
          <div className="leaderboard__nav--image">
            <img src={defaultUser} alt="default user" />
          </div>
        </div>
        <div className="leaderboard__nav--username">mucahidyazar</div>
        <div className="leaderboard__nav--created">10</div>
        <div className="leaderboard__nav--completed">25</div>
        <div className="leaderboard__nav--solved">200</div>
        <div className="leaderboard__nav--true">156</div>
        <div className="leaderboard__nav--pass">20</div>
        <div className="leaderboard__nav--false">24</div>
        <div className="leaderboard__nav--total">2250</div>
      </div>
    </section>
  );
};

export default Leaderboard;
