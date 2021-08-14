import React from "react";
import TopBar from "./components/TopBar";
import NotesContainer from "./components/NotesContainer";
import AuthModal from "./components/AuthModal";

const Home = () => {
  return (
    <>
      <AuthModal />
      <div style={{ position: "fixed", top: 0, width: "100%" }}>
        <TopBar />
      </div>

      <div
        style={{
          paddingLeft: "5%",
          paddingRight: "5%", 
          paddingTop: "5%",
        }}
      >
        <NotesContainer />
      </div>
    </>
  );
};

export default Home;
