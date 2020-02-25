import React from "react";
import profileImage from "../../public/img//profile-image.jpg";

export default function Profile() {
  return (
    <div className="profile">
      <div className="info">
        <div className="info__photo">
          <img src={profileImage} alt="Profile Photo" />
          <div className="info__photo--upload">
            <input
              type="file"
              className="info__photo--file"
              id="info__photo--file"
            />
            <label htmlFor="info__photo--file">
              <i class="fas fa-camera-retro"></i>
            </label>
          </div>
        </div>
        <div className="info__name">Mucahid</div>
        <span className="info__info">
          Registered on April 26(Add Last Login)
        </span>
        <div className="info__body">
          <div className="info__body--title">Profile Info</div>
          <div className="info__body--body">
            <div className="info__group">
              <div className="info__group--title">Firstname</div>
              <div className="info__group--item">Mucahid</div>
            </div>
            <div className="info__group">
              <div className="info__group--title">Lastname</div>
              <div className="info__group--item">Yazar</div>
            </div>
            <div className="info__group">
              <div className="info__group--title">Email</div>
              <div className="info__group--item">test@test.com</div>
            </div>
            <div className="info__group">
              <div className="info__group--title">Gender</div>
              <div className="info__group--item">Male</div>
            </div>
            <div className="info__group">
              <div className="info__group--title">Birthday</div>
              <div className="info__group--item">31.10.1991</div>
            </div>
          </div>
        </div>
      </div>
      <div className="stats">
        <div className="stats__title">Stats</div>
        <div className="stats__body">
          <div className="stats__body--item">
            <span>200</span>
            <span>True</span>
          </div>
          <div className="stats__body--item">
            <span>200</span>
            <span>Quiz</span>
          </div>
          <div className="stats__body--item">
            <span>200</span>
            <span>Solved</span>
          </div>
          <div className="stats__body--item">
            <span>200</span>
            <span>Point</span>
          </div>
        </div>
      </div>
      <div className="badges">
        <div className="badges__title">Badges</div>
        <div className="badges__body">
          <div className="badges__body--item">
            <i class="fas fa-ribbon"></i>
            <span>Ribbon Hunter</span>
          </div>
          <div className="badges__body--item">
            <i class="fas fa-allergies"></i>
            <span>Allergy Man</span>
          </div>
          <div className="badges__body--item">
            <i class="fab fa-angellist"></i>
            <span>Angellist</span>
          </div>
          <div className="badges__body--item">
            <i class="far fa-angry"></i>
            <span>Angry Quizer</span>
          </div>
          <div className="badges__body--item">
            <i class="fas fa-at"></i>
            <span>Postman</span>
          </div>
          <div className="badges__body--item">
            <i class="fas fa-baby-carriage"></i>
            <span>Baby Baby</span>
          </div>
          <div className="badges__body--item">
            <i class="fas fa-binoculars"></i>
            <span>Scoper</span>
          </div>
          <div className="badges__body--item">
            <i class="fab fa-black-tie"></i>
            <span>Gentlemen</span>
          </div>
        </div>
      </div>
      <div className="profile-quizes">
        <div className="profile-quizes__title">Quizes</div>
        <div className="profile-quizes__body">
          <div className="profile-quizes__body--item">
            <div>What is ES6?</div>
            <div>Programing</div>
            <div>10</div>
          </div>
          <div className="profile-quizes__body--item">
            <div>What is ES6?</div>
            <div>Programing</div>
            <div>10</div>
          </div>
        </div>
      </div>
    </div>
  );
}

//Question Mark
//<i class="fas fa-question-circle"></i>
