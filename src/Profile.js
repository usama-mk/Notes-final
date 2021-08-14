import React, { useContext } from "react";
import TopBar from "./components/TopBar";
import AuthModal from "./components/AuthModal";
import { UserContext } from "./context/user";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <>
      <AuthModal />
      <div style={{ position: "fixed", top: 0, width: "100%" }}>
        <TopBar />
      </div>

      <div
        style={{
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "15%",
        }}
      >
        <p>id: {user.id}</p>
        <p>email: {user.email}</p>
        <p>name: {user.name}</p>
        <Link to={`/edit/${user.id}`}>Edit</Link>
      </div>
    </>
  ) : null;
};

export default Profile;
