import React, { useState, useEffect, useRef } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import majorColoursLogo from "../assets/img/MAJOR COLOURS-LOGO.png";
import CommingSoonComponent from "./CommingSoonComponent";
import { useDispatch, useSelector } from "react-redux";
import { commingSoonActive, toggleCart } from "../store/activeSlices";
import { useNavigate } from "react-router-dom";
// Import normal rank icons
import spearIconNormal from "../assets/logo/Spear-icon-normal.svg";
import bidentIconNormal from "../assets/logo/Bident-icon-normal.svg";
import tridentIconNormal from "../assets/logo/Trident-icon-normal.svg";
import excaliburIconNormal from "../assets/logo/Excalibur-icon-normal.svg";

const NavbarComponent = () => {
    const navigate = useNavigate();
    const commingSoonStatus = useSelector((state) => state.active.commingSoonActive);
    const cartItems = useSelector((state) => state.active.cartItems);
    // Get current rank from Redux state
    const rankInfo = useSelector((state) => state.active.rankCretriaActiveState);
    // Get the currentRank string directly from the Redux store
    const currentRank = useSelector((state) => state.active.currentRank);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [needsScroll, setNeedsScroll] = useState(false);
    const sportsNavRef = useRef(null);
    const sportsContainerRef = useRef(null);
    const [userInfo, setUserInfo] = useState(null);
    
    // Extract fullName from localStorage
    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        
        if (userDataString) {
            try {
                const parsedData = JSON.parse(userDataString);
                
                // Extract fullName specifically
                if (parsedData && parsedData.user && parsedData.user.fullName) {
                    // Fullname found in user object
                } else if (parsedData && parsedData.fullName) {
                    // Fullname found in root object
                } else {
                    // fullName not found in userData data
                }
            } catch (error) {
                // Error parsing userData
            }
        } else {
            // No userData found in localStorage
        }
    }, []);
    
    // Calculate total items in cart
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Ref for the cart counter element to add animation when it changes
    const cartCounterRef = useRef(null);
    
    // Check if user is logged in
    useEffect(() => {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                if (userData.isLoggedIn) {
                    setUserInfo(userData.user);
                }
            } catch (error) {
                // Error parsing user data
            }
        }
    }, []);
    
    // Add animation effect when cart count changes
    useEffect(() => {
        if (cartCounterRef.current) {
            cartCounterRef.current.classList.add('scale-up-animation');
            const timeout = setTimeout(() => {
                if (cartCounterRef.current) {
                    cartCounterRef.current.classList.remove('scale-up-animation');
                }
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [cartItemCount]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateTo = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleCartClick = () => {
        dispatch(toggleCart(true));
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

    // Get the appropriate rank icon based on currentRank from redux store
    const getRankIcon = () => {
        // Use the currentRank value to determine which icon to show
        // Convert to lowercase and trim for case-insensitive comparison
        const rank = currentRank ? currentRank.toLowerCase().trim() : "spear";
        
        switch (rank) {
            case "bident":
                return bidentIconNormal;
            case "trident":
                return tridentIconNormal;
            case "excalibur":
                return excaliburIconNormal;
            default:
                return spearIconNormal; // Default to spear
        }
    };

    // Create navigation items based on auth status
    const getUserNavItems = () => {
        const baseItems = [
            { name: "Dressing Room", path: "/dressing-room" },
            { name: "Cart", path: "/cart", isCart: true }
        ];
        
        // Try to get fullName from localStorage
        let fullName = null;
        try {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                const parsedData = JSON.parse(userDataString);
                
                // Extract fullName specifically
                if (parsedData && parsedData.user && parsedData.user.fullName) {
                    fullName = parsedData.user.fullName;
                } else if (parsedData && parsedData.fullName) {
                    fullName = parsedData.fullName;
                }
            }
        } catch (error) {
            // Error checking localStorage for fullName
        }
        
        // Get rank icon using the helper function that now uses currentRank
        const rankIcon = getRankIcon();
        
        // If we found fullName in localStorage, use it instead of "Membership"
        if (fullName) {
            return [
                { 
                    name: fullName, 
                    path: "/profile", 
                    isUser: true,
                    rankIcon: rankIcon
                },
                ...baseItems
            ];
        }
        
        // If user is logged in through component state, use that
        if (userInfo) {
            return [
                { 
                    name: userInfo.name, 
                    path: "/profile", 
                    isUser: true,
                    rankIcon: rankIcon
                },
                ...baseItems
            ];
        }
        
        // Otherwise show regular "Membership" link
        return [
            { name: "Membership", path: "/login" },
            ...baseItems
        ];
    };
    
    const userNavItems = getUserNavItems();

    return(
        <div className="w-full bg-backgroundColor fixed top-0 left-0 z-20">
            {/* Add animation styles */}
            <style>
                {`
                .scale-up-animation {
                    animation: scaleUp 0.5s ease-out;
                }
                @keyframes scaleUp {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.5); }
                    100% { transform: scale(1); }
                }
                .cart-icon-container {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .cart-count {
                    position: absolute;
                    top: -9px;
                    right: -9px;
                    background-color: #ffffff;
                    color: #000000;
                    border-radius: 50%;
                    width: 16px;
                    height: 16px;
                    font-size: 10px;
                    line-height: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    z-index: 1;
                    padding: 0;
                    box-sizing: content-box;
                    border: 1px solid #ffffff;
                }
                .user-rank {
                    font-size: 0.7rem;
                    opacity: 0.7;
                    margin-left: 5px;
                }
                .user-profile {
                    display: flex;
                    align-items: center;
                }
                .rank-icon {
                    height: 26px;
                    margin-right: 8px;
                }
                `}
            </style>
            
            {/* Main Navbar */}
            <div className="w-full">
                <nav className="font-nunito mx-auto w-[90%] py-4 sm:py-0 sm:h-[99px] text-white flex flex-wrap justify-between items-center">
                    {/* Logo Section with onClick to navigate to homepage */}
                    <div className="logo text-2xl font-bold z-30 cursor-pointer" onClick={() => navigate('/')}>
                        <img className="w-[150px] sm:w-[180px] md:w-[219px]" src={majorColoursLogo} alt="MAJOR-COLOURS" />
                    </div>

                    <div className="flex items-center sm:hidden z-30">
                        {/* Mobile Cart Icon (visible below 600px) */}
                        <div 
                            className="text-white text-2xl p-2 mr-2 cursor-pointer"
                            onClick={handleCartClick}
                            aria-label="Cart"
                        >
                            <div className="cart-icon-container">
                                <FaCartPlus className="text-xl" />
                                {cartItemCount > 0 && (
                                    <span 
                                        className="cart-count" 
                                        ref={cartCounterRef}
                                    >
                                        {cartItemCount < 10 ? cartItemCount : '9+'}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Hamburger Menu Button (visible below 600px) */}
                        <button 
                            className="text-white text-2xl p-2 rounded"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

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
                                                        onClick={item.isCart ? handleCartClick : () => navigateTo(item.path)}
                                                        className="cursor-pointer hover:text-gray-300 text-textColor text-xl py-5 text-left pl-2"
                                                    >
                                                        {item.isCart ? (
                                                            <div className="flex items-center space-x-2">
                                                                <FaCartPlus className="text-2xl" />
                                                                <span 
                                                                    className="cart-count" 
                                                                    ref={cartItemCount > 0 ? cartCounterRef : null}
                                                                >
                                                                    {cartItemCount < 10 ? cartItemCount : '9+'}
                                                                </span>
                                                            </div>
                                                        ) : item.isUser ? (
                                                            <div className="user-profile">
                                                                {item.rankIcon && (
                                                                    <img 
                                                                        src={item.rankIcon} 
                                                                        alt="Rank" 
                                                                        className="rank-icon" 
                                                                    />
                                                                )}
                                                                <span>{item.name}</span>
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
                                    onClick={item.isCart ? handleCartClick : () => navigate(item.path)}
                                    className="cursor-pointer hover:text-gray-300 text-navbartextSize"
                                >
                                    {item.isCart ? (
                                        <div className="cart-icon-container">
                                            <FaCartPlus className="text-xl" />
                                            {cartItemCount > 0 && (
                                                <span 
                                                    className="cart-count"
                                                    ref={cartCounterRef}
                                                >
                                                    {cartItemCount < 10 ? cartItemCount : '9+'}
                                                </span>
                                            )}
                                        </div>
                                    ) : item.isUser ? (
                                        <div className="user-profile">
                                            {item.rankIcon && (
                                                <img 
                                                    src={item.rankIcon} 
                                                    alt="Rank" 
                                                    className="rank-icon" 
                                                />
                                            )}
                                            <span>{item.name}</span>
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