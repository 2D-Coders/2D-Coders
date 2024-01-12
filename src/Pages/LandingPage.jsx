import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <section className="absolute z-20 w-screen h-screen flex justify-center items-center">
          <div className="loader"></div>
        </section>
      ) : null}

      <section className="w-screen h-screen">
        <Spline scene="https://prod.spline.design/oW-BJbwph2CfFLlH/scene.splinecode" />
      </section>
    </>
  );
};

export default LandingPage;
