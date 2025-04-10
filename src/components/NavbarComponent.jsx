import React, { useState, useEffect, useRef } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import majorColoursLogo from "../assets/img/MAJOR COLOURS-LOGO.png";
import CommingSoonComponent from "./CommingSoonComponent";
import { useDispatch, useSelector } from "react-redux";
import { commingSoonActive } from "../store/activeSlices";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const commingSoonStatus = useSelector((state) => state.active.commingSoonActive);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [needsScroll, setNeedsScroll] = useState(false);
    const sportsNavRef = useRef(null);
    const sportsContainerRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateTo = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    // Check if scrolling is needed by comparing content width to container width
    useEffect(() => {
        const checkForScrolling = () => {
            if (sportsNavRef.current && sportsContainerRef.current) {
                const contentWidth = sportsNavRef.current.scrollWidth;
                const containerWidth = sportsContainerRef.current.clientWidth;
                setNeedsScroll(contentWidth > containerWidth);
            }
        };

        checkForScrolling();
        window.addEventListener('resize', checkForScrolling);
        
        return () => {
            window.removeEventListener('resize', checkForScrolling);
        };
    }, []);

    const sportsNavItems = [
        { name: "WEIGHTLIFTING", href: "#component1", active: true },
        { name: "CRICKET", href: "#component2", active: false },
        { name: "FOOTBALL", href: "#component3", active: false },
        { name: "BASKETBALL", href: "#component4", active: false }
    ];

    const userNavItems = [
        { name: "Membership", path: "/login" },
        { name: "Dressing Room", path: "/dressing-room" },
        { name: "Cart", path: "/cart", isCart: true }
    ];

    return(
        <div className="w-full bg-backgroundColor fixed top-0 left-0 z-20">
            {/* Main Navbar */}
            <div className="w-full">
                <nav className="font-nunito mx-auto w-[90%] py-4 sm:py-0 sm:h-[99px] text-white flex flex-wrap justify-between items-center">
                    {/* Logo Section with onClick to navigate to homepage */}
                    <div className="logo text-2xl font-bold z-30 cursor-pointer" onClick={() => navigate('/')}>
                        <img className="w-[150px] sm:w-[180px] md:w-[219px]" src={majorColoursLogo} alt="MAJOR-COLOURS" />
                    </div>

                    {/* Hamburger Menu Button (visible below 600px) */}
                    <button 
                        className="text-white text-2xl p-2 rounded sm:hidden z-30"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Mobile Menu (below 600px) - Coming from the right with 80% width */}
                    {isMenuOpen && (
                        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-80">
                            <div className="flex-1" onClick={() => setIsMenuOpen(false)}></div>
                            <div className="bg-black w-10/12 h-full z-50 overflow-y-auto">
                                <div className="flex justify-end p-4">
                                    <FaTimes
                                        className="h-8 w-8 text-white cursor-pointer"
                                        onClick={() => setIsMenuOpen(false)}
                                    />
                                </div>
                                <div className="pt-16">
                                    <div className="flex flex-col h-full items-start pl-4">
                                        <ul className="flex flex-col items-start w-full mt-2">
                                            {userNavItems.map((item, idx) => (
                                                <li 
                                                    key={idx}
                                                    className="w-full"
                                                >
                                                    <div 
                                                        onClick={() => navigateTo(item.path)}
                                                        className="cursor-pointer hover:text-gray-300 text-textColor text-xl py-5 text-left pl-2"
                                                    >
                                                        {item.isCart ? (
                                                            <div className="flex items-center space-x-2">
                                                                <FaCartPlus className="text-2xl" />
                                                                <span>Cart (0)</span>
                                                            </div>
                                                        ) : (
                                                            item.name
                                                        )}
                                                    </div>
                                                    {idx < userNavItems.length - 1 && (
                                                        <div className="border-t border-gray-700 w-full my-1"></div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Navigation (right side on desktop) */}
                    <div className="hidden sm:block">
                        <ul className="menu flex h-fit items-center text-textColor space-x-4 md:space-x-6">
                            {userNavItems.map((item, idx) => (
                                <li
                                    key={idx}
                                    onClick={() => navigate(item.path)}
                                    className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                                >
                                    {item.isCart ? (
                                        <div className="flex items-center space-x-2">
                                            <FaCartPlus className="text-xl" />
                                            <p>0</p>
                                        </div>
                                    ) : (
                                        item.name
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Sports Navigation (visible on all screen sizes) - Directly attached to the navbar */}
            <div className="w-full bg-backgroundColor relative">
                <div 
                    ref={sportsContainerRef}
                    className={`w-full md:px-0 ${needsScroll ? 'overflow-x-auto hide-scrollbar' : 'overflow-x-visible'}`}
                >
                    <div 
                        ref={sportsNavRef}
                        className="w-max md:w-[690px] h-[44px] mx-auto flex text-textColor pr-16 sm:pr-0"
                    >
                        {sportsNavItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                onMouseEnter={() => !item.active && dispatch(commingSoonActive(true))}
                                onMouseLeave={() => dispatch(commingSoonActive(false))}
                                className={`hover:text-gray-300 text-navbartextSize whitespace-nowrap px-6 md:px-0 md:w-[25%] text-center border-b-2 ${
                                    item.active 
                                    ? "text-white border-white font-bold" 
                                    : "border-y-gray-600"
                                }`}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
                {commingSoonStatus && (
                    <div className="absolute w-[300px] top-[44px] left-1/2 transform -translate-x-1/2 -mt-[1px]">
                        <CommingSoonComponent />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavbarComponent;

/* Add this to your CSS or tailwind.config.js to hide scrollbars */
/* .hide-scrollbar::-webkit-scrollbar {
    display: none;
} */
/* .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
} */