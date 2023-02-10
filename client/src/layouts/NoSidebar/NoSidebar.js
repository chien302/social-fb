import React from "react";
import Header from "../../components/Header/Header";

const NoSidebar = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mt-[56px] bg-backGroundColor ">{children}</div>
    </div>
  );
};

export default NoSidebar;
