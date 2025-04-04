import { FaCartPlus } from "react-icons/fa6";
import majorColoursLogo from "../assets/img/MAJOR COLOURS-LOGO.png";
import CommingSoonComponent from "./CommingSoonComponent";
import { useDispatch, useSelector } from "react-redux";
import { commingSoonActive } from "../store/activeSlices";


const NavbarComponent = () => {
    
    const commingSoonStatus = useSelector((state) => state.active.commingSoonActive);
    const dispatch = useDispatch();
    console.log(commingSoonStatus)

    return(
        <header className="w-[100%] bg-backgroundColor  z-10 h-[153px] mx-auto  flex items-center fixed ">
            <nav className=" font-nunito mx-auto w-[90%] h-[99px]   text-white  flex justify-between">
                {/* First Part: Logo */}
                <div className="logo text-2xl font-bold">
                    <a href="/" className="hover:text-gray-300">
                      <img className="w-[219px]" src={majorColoursLogo} alt="MAJOR-COLOURS" />
                    </a>
                </div>

                {/* Middle Part: Anchor Tags */}
                <div className="relative">
                <div className=" fixed w-[690px] h-[45px] top-[93px] left-1/2 transform -translate-x-1/2 xl:flex hidden    text-textColor  ">
                    <a
                        
                        href="#component1"
                        
                        className="hover:text-gray-300 font-bold text-navbartextSize text-white  w-[25%] text-center border-b-2 border-white"
                    >
                        WEIGHTLIFTING
                    </a>
                    <a
                         onMouseEnter={() => dispatch(commingSoonActive(true))}
                         onMouseLeave={() => dispatch(commingSoonActive(false))}
                        href="#component2"
                       
                        className="hover:text-gray-300 text-navbartextSize  w-[25%] text-center border-b-2 border-y-gray-600"
                    >
                        CRICKET
                    </a>
                    <a
                         onMouseEnter={() => dispatch(commingSoonActive(true))}
                         onMouseLeave={() => dispatch(commingSoonActive(false))}
                        href="#component3"
                       
                        className="hover:text-gray-300 text-navbartextSize w-[25%] text-center border-b-2 border-y-gray-600"
                    >
                        FOOTBALL
                    </a>
                    <a
                         onMouseEnter={() => dispatch(commingSoonActive(true))}
                         onMouseLeave={() => dispatch(commingSoonActive(false))}
                        href="#component4"
                        
                        className="hover:text-gray-300 text-navbartextSize w-[25%] text-center border-b-2 border-y-gray-600"
                    >
                        BASKETBALL
                    </a>
                </div>
               {commingSoonStatus &&  <div className="fixed   w-[300px] top-[137px] left-1/2 transform -translate-x-1/2 h-[50px] ">
                    <CommingSoonComponent/>
                </div>}
                </div>

                {/* Third Part: List */}
                <ul className="menu flex h-fit items-center text-textColor space-x-6">
                    <li
                        onClick={() => navigateTo("Page 1")}
                        className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                    >
                       Membership
                    </li>
                    <li
                        onClick={() => navigateTo("Page 2")}
                        className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                    >
                        Dressing Room
                    </li>
                    <li
                        onClick={() => navigateTo("Page 3")}
                        className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                    >
                       <div className="flex items-center space-x-2 relative">
                            <FaCartPlus className="text-xl"/>
                            <p className=" ">0</p>
                       </div>
                    </li>
                </ul>
            </nav>
            {/* <hr  className="border-2 border-red-900"/> */}
        </header>
    )
}
export default NavbarComponent;
// This code defines a NavbarComponent that returns a navigation bar.