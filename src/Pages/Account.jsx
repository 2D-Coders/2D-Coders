import axios from "axios";
import React, { useEffect, useState } from "react";
import CitySceneBG from "../components/CitySceneBG";
import NavBar from "../components/NavBar";
import LoadScreen from "../components/LoadScreen";
import AccountHS from "../components/AccountHS";
import CurrentUser from "../components/CurrentUser";

const AccountTest = () => {
  return (
    <>
      <LoadScreen />
      <NavBar />
      <section className="absolute z-20 w-screen h-screen flex flex-col justify-center items-center">
        <div className="bg-white bg-opacity-50 p-20 rounded-lg items-center justify-center flex flex-col">
          <div className="flex justify-center items-center bg-black p-4 mb-8 w-[24rem] rounded-lg">
            <CurrentUser />
          </div>
          <div className=" flex gap-20">
            <AccountHS gameName="Flappy Bird" gameId={1} />
            <AccountHS gameName="Doodle Jump" gameId={2} />
            <AccountHS gameName="Chrome Dino" gameId={3} />
          </div>
        </div>
      </section>
      <div className="blur-lg">
        <CitySceneBG />
      </div>
    </>
  );
};

export default AccountTest;
