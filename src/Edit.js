import React, { useContext, useState } from "react";
import TopBar from "./components/TopBar";
import AuthModal from "./components/AuthModal";
import { UserContext } from "./context/user";
import { useHistory } from "react-router-dom";

const Edit = () => {
  const history = useHistory();
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({ variables: { id: user?.id, displayName: name } });
    history.replace("/profile");
  };

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </>
  ) : null;
};

export default Edit;
