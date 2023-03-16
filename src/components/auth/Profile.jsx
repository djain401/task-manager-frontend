import React from "react";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {
  const user = React.useContext(UserContext);

  return (
    <>
      <span>Hi {user.name}! </span>
    </>
  );
};

export default Profile;
