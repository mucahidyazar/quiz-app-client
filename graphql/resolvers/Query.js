import User from "../../models/User";
import Quizes from "../../models/Quizes";

export const Query = {
  hello: () => "This is my first Query",
  users: () => User.find(),
  quizes: () => Quizes.find(),
};
