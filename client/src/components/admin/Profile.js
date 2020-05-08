import React from "react";

const Profile = (props) => {
  return (
    <div>
      <h1>Welcome back {props.user.firstname}</h1>
    </div>
  );
};
export default Profile;
