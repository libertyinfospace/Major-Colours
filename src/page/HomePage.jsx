import HomeComponent from "../components/HomeComponent";
import RankCriteriaComponent from "../components/RankCriteriaComponent";

const HomePage = () => {
  return (
    <div className="w-[100%] bg-backgroundColor flex gap-10 flex-col justify-center items-center font-nunito">
        <HomeComponent/>
        <section className='w-[90%] relative top-[150px]  mx-auto'>
          <RankCriteriaComponent/>
        </section>
        <div className='w-[90%] relative top-[150px] border-b-2 border-textColor flex justify-center items-center py-[70px] mx-auto '>
            <button className="border-2 py-[15px] px-[80px] font-bold text-white text-2xl">
                JOIN 
            </button>
        </div>
    </div>
  );
}

export default HomePage;
// This code defines a HomePage.