import React from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
const DefaultLayout = ({ children }) => {
  return (
    <div className="h-screen bg-backGroundColor">
      <Header />
      <div className="flex flex-row pr-[20px] mt-[56px] bg-backGroundColor">
        <Sidebar />
        <div className="ml-[500px] basis-3/4 pl-[30px] mt-[25px] w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
