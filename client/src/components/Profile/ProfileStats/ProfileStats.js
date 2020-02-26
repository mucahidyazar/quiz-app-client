import React from "react";

export default function ProfileStats(props) {
  return (
    <div className="stats">
      <div className="stats__title">Stats</div>
      <div className="stats__body">
        <div className="stats__body--item">
          <span>{props.user.totalTrue ? props.user.totalTrue : "0"}</span>
          <span>True</span>
        </div>
        <div className="stats__body--item">
          <span>{props.user.totalQuiz ? props.user.totalQuiz : "0"}</span>
          <span>Quiz</span>
        </div>
        <div className="stats__body--item">
          <span>{props.user.totalSolved ? props.user.totalSolved : "0"}</span>
          <span>Solved</span>
        </div>
        <div className="stats__body--item">
          <span>{props.user.totalPoint ? props.user.totalPoint : "0"}</span>
          <span>Point</span>
        </div>
      </div>
    </div>
  );
}
