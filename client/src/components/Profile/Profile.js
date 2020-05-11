import React, { useEffect, useContext, useCallback } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileStats from "./ProfileStats/ProfileStats";
import ProfileBadges from "./ProfileBadges/ProfileBadges";
import ProfileQuizes from "./ProfileQuizes/ProfileQuizes";
import RegistrationContext from "../../context/registration/registrationContext";
import QuizesContext from "../../context/quizes/quizesContext";

export default function Profile() {
  const registrationContext = useContext(RegistrationContext);
  const { user, loadUser } = registrationContext;
  const quizesContext = useContext(QuizesContext);
  const { userQuizes, getUserQuizes } = quizesContext;

  return user ? (
    <div className="profile">
      <ProfileInfo user={user} />
      <ProfileStats user={user} />
      <ProfileBadges />
      <ProfileQuizes userQuizes={userQuizes} />
    </div>
  ) : null;
}

//Question Mark
//<i class="fas fa-question-circle"></i>
