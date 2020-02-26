import React from "react";
import profileImage from "../../../public/img//profile-image.jpg";

export default function ProfileInfo(props) {
  return (
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
            <i className="fas fa-camera-retro"></i>
          </label>
        </div>
      </div>
      <div className="info__name">
        {props.user.username ? props.user.username : "Username"}
      </div>
      <span className="info__info">Registered on April 26(Add Last Login)</span>
      <div className="info__body">
        <div className="info__body--title">Profile Info</div>
        <div className="info__body--body">
          <div className="info__group">
            <div className="info__group--title">Firstname</div>
            <div className="info__group--item">
              {props.user.firstName ? props.user.firstName : "First Name"}
            </div>
          </div>
          <div className="info__group">
            <div className="info__group--title">Lastname</div>
            <div className="info__group--item">
              {props.user.lastName ? props.user.lastName : "Last Name"}
            </div>
          </div>
          <div className="info__group">
            <div className="info__group--title">Email</div>
            <div className="info__group--item">
              {props.user.email ? props.user.email : "Email"}
            </div>
          </div>
          <div className="info__group">
            <div className="info__group--title">Gender</div>
            <div className="info__group--item">
              {props.user.gender ? props.user.gender : "Male"}
            </div>
          </div>
          <div className="info__group">
            <div className="info__group--title">Birthday</div>
            <div className="info__group--item">
              {props.user.birthday ? props.user.birthday : "01.01.2000"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
