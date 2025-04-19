import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeComponent from "../components/HomeComponent";
import RankCriteriaComponent from "../components/RankCriteriaComponent";

const HomePage = () => {
  const [buttonText, setButtonText] = useState("JOIN");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setButtonText("UPGRADE YOUR RANK");
    }
  }, []);

  return (
    <main className="w-full bg-backgroundColor flex flex-col justify-center items-center font-nunito pb-24">
        {/* Home Section */}
        <div className="w-full">
          <HomeComponent />
        </div>
        
        {/* Rank Criteria Section */}
        <section className='w-[90%] md:w-[85%] lg:w-[90%] relative top-[220px] mx-auto mb-20'>
          <RankCriteriaComponent />
        </section>
        
        {/* Join Button Section */}
        <section className='w-[90%] md:w-[85%] lg:w-[90%] relative top-[220px] border-b-2 border-textColor flex justify-center items-center py-[50px] sm:py-[70px] mx-auto'>
            <Link 
              to="/select-rank"
              className="w-full sm:w-auto border-2 py-[15px] sm:py-[18px] px-[70px] sm:px-[80px] font-bold text-white text-xl sm:text-2xl transition-all duration-300 hover:bg-white hover:text-backgroundColor focus:outline-none focus:ring-2 focus:ring-white inline-block text-center rounded-md"
              aria-label="Join now"
            >
                {buttonText}
            </Link>
        </section>
    </main>
  );
};

export default React.memo(HomePage);
// This code defines a HomePage.