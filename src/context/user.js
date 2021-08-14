import { createContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER, LOGIN_USER, UPDATE_USER } from "../graphql/mutation";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    const localData =
      localStorage.getItem("notes_app_user") &&
      JSON.parse(localStorage.getItem("notes_app_user"));

    if (localData !== null) {
      setUser(localData);
    }
  }, []);

  const [register] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log("register user", result.data);
    },
  });

  const [login] = useMutation(LOGIN_USER, {
    update(_, result) {
      localStorage.setItem("notes_app_token", result.data.login.authToken);
      localStorage.setItem(
        "notes_app_user",
        JSON.stringify(result.data.login.user)
      );
      setUser(user);
      window.location.reload();
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update(_, result) {
      localStorage.removeItem("notes_app_user");
      localStorage.setItem(
        "notes_app_user",
        JSON.stringify(result.data.updateUser.user)
      );
      setUser(result.data.updateUser.user);
    },
  });

  const logout = () => {
    localStorage.removeItem("notes_app_token");
    localStorage.removeItem("notes_app_user");
    localStorage.removeItem("notes_app_notes");
    setUser();
    history.replace("/");
  };

  return (
    <UserContext.Provider value={{ register, login, logout, user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
