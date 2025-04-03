import { FaCartPlus } from "react-icons/fa6";
import majorColoursLogo from "../assets/img/MAJOR COLOURS-LOGO.png";


const NavbarComponent = () => {
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
                <div className=" fixed w-[690px] h-[45px] top-[93px] left-[375px] flex    text-textColor border-b-2 border-textColor  ">
                    <a
                        href="#component1"
                        onClick={() => loadComponent("Component 1")}
                        className="hover:text-gray-300 text-navbartextSize text-white  w-[25%] text-center "
                    >
                        WEIGHTLIFTING
                    </a>
                    <a
                        href="#component2"
                        onClick={() => loadComponent("Component 2")}
                        className="hover:text-gray-300 text-navbartextSize  w-[25%] text-center "
                    >
                        CRICKET
                    </a>
                    <a
                        href="#component3"
                        onClick={() => loadComponent("Component 3")}
                        className="hover:text-gray-300 text-navbartextSize w-[25%] text-center "
                    >
                        FOOTBALL
                    </a>
                    <a
                        href="#component4"
                        onClick={() => loadComponent("Component 4")}
                        className="hover:text-gray-300 text-navbartextSize w-[25%] text-center "
                    >
                        BASKETBALL
                    </a>
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