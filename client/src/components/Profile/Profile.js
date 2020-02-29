import React, { useContext } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileStats from "./ProfileStats/ProfileStats";
import ProfileBadges from "./ProfileBadges/ProfileBadges";
import ProfileQuizes from "./ProfileQuizes/ProfileQuizes";
import RegistrationContext from "../../context/registration/registrationContext";
import QuizesContext from "../../context/quizes/quizesContext";
import { useEffect } from "react";

export default function Profile() {
  const registrationContext = useContext(RegistrationContext);
  const { user, loadUser } = registrationContext;
  const quizesContext = useContext(QuizesContext);
  const { userQuizes, getUserQuizes } = quizesContext;

  useEffect(() => {
    if (user) {
      getUserQuizes(user._id);
    }

    loadUser();
    // eslint-disable-next-line
  }, [user]);

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
