import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, updateCartItem, removeCartItem, addToCart } from '../store/activeSlices';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

// Import payment icons
import visaIcon from '../assets/logo/Payment Small Icon/Visa.svg';
import mastercardIcon from '../assets/logo/Payment Small Icon/mastercard.svg';
import amexIcon from '../assets/logo/Payment Small Icon/amex.svg';
import paypalIcon from '../assets/logo/Payment Small Icon/paypal.svg';
import applePayIcon from '../assets/logo/Payment Small Icon/apple-pay.svg';

// Import Spear product images
import spear1_1 from '../assets/img/Dressing Room Images/Spear-1-1.png';
import spear1_2 from '../assets/img/Dressing Room Images/Spear-1-2.png';
import spear1_3 from '../assets/img/Dressing Room Images/Spear-1-3.png';
import spear1_4 from '../assets/img/Dressing Room Images/Spear-1-4.png';
import spear1_5 from '../assets/img/Dressing Room Images/Spear-1-5.png';
import spear1_6 from '../assets/img/Dressing Room Images/Spear-1-6.png';
import spear1_7 from '../assets/img/Dressing Room Images/Spear-1-7.png';
import spear1_8 from '../assets/img/Dressing Room Images/Spear-1-8.png';
import spear1_9 from '../assets/img/Dressing Room Images/Spear-1-9.png';

// Import Bident product images
import bident1_1 from '../assets/img/Dressing Room Images/Bident-1-1.png';
import bident1_2 from '../assets/img/Dressing Room Images/Bident-1-2.png';
import bident1_3 from '../assets/img/Dressing Room Images/Bident-1-3.png';
import bident1_4 from '../assets/img/Dressing Room Images/Bident-1-4.png';
import bident1_5 from '../assets/img/Dressing Room Images/Bident-1-5.png';
import bident1_6 from '../assets/img/Dressing Room Images/Bident-1-6.png';
import bident1_7 from '../assets/img/Dressing Room Images/Bident-1-7.png';
import bident1_8 from '../assets/img/Dressing Room Images/Bident-1-8.png';
import bident1_9 from '../assets/img/Dressing Room Images/Bident-1-9.png';

// Import Trident product images
import trident1_1 from '../assets/img/Dressing Room Images/Trident-1-1.png';
import trident1_2 from '../assets/img/Dressing Room Images/Trident-1-2.png';
import trident1_3 from '../assets/img/Dressing Room Images/Trident-1-3.png';
import trident1_4 from '../assets/img/Dressing Room Images/Trident-1-4.png';
import trident1_5 from '../assets/img/Dressing Room Images/Trident-1-5.png';
import trident1_6 from '../assets/img/Dressing Room Images/Trident-1-6.png';

// Import Excalibur product images
import excalibur1_1 from '../assets/img/Dressing Room Images/Excalibur-1-1.png';
import excalibur1_2 from '../assets/img/Dressing Room Images/Excalibur-1-2.png';
import excalibur1_3 from '../assets/img/Dressing Room Images/Excalibur-1-3.png';
import excalibur1_4 from '../assets/img/Dressing Room Images/Excalibur-1-4.png';
import excalibur1_5 from '../assets/img/Dressing Room Images/Excalibur-1-5.png';
import excalibur1_6 from '../assets/img/Dressing Room Images/Excalibur-1-6.png';
import excalibur1_7 from '../assets/img/Dressing Room Images/Excalibur-1-7.png';
import excalibur1_8 from '../assets/img/Dressing Room Images/Excalibur-1-8.png';
import excalibur1_9 from '../assets/img/Dressing Room Images/Excalibur-1-9.png';

const SlideInCart = () => {
  const isOpen = useSelector(state => state.active.isCartOpen);
  const cartItems = useSelector(state => state.active.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Product data organized by categories
  const productCategories = {
    'SPEAR': [
      {
        id: 's1',
        title: "Spear Comfort Hoodie",
        price: 150,
        images: [spear1_1, spear1_4, spear1_7],
        modelInfo: "Model is 175cm and 68kg Wearing Size S",
        inStock: true
      },
      {
        id: 's2',
        title: "Spear Classic Tee",
        price: 75,
        images: [spear1_2, spear1_5, spear1_8],
        modelInfo: "Model is 180cm and 70kg Wearing Size M",
        inStock: true
      },
      {
        id: 's3',
        title: "Spear Vintage Jacket",
        price: 220,
        images: [spear1_3, spear1_6, spear1_9],
        modelInfo: "Model is 182cm and 72kg Wearing Size L",
        inStock: false
      }
    ],
    'BIDENT': [
      {
        id: 'b1',
        title: "Bident Premium Hoodie",
        price: 180,
        images: [bident1_1, bident1_4, bident1_7],
        modelInfo: "Model is 178cm and 72kg Wearing Size M",
        inStock: true
      },
      {
        id: 'b2',
        title: "Bident Performance Tee",
        price: 95,
        images: [bident1_2, bident1_5, bident1_8],
        modelInfo: "Model is 183cm and 75kg Wearing Size L",
        inStock: true
      },
      {
        id: 'b3',
        title: "Bident Urban Jacket",
        price: 250,
        images: [bident1_3, bident1_6, bident1_9],
        modelInfo: "Model is 185cm and 77kg Wearing Size XL",
        inStock: true
      }
    ],
    'TRIDENT': [
      {
        id: 't1',
        title: "Trident Elite Hoodie",
        price: 220,
        images: [trident1_1, trident1_4],
        modelInfo: "Model is 181cm and 74kg Wearing Size M",
        inStock: true
      },
      {
        id: 't2',
        title: "Trident Signature Tee",
        price: 115,
        images: [trident1_2, trident1_5],
        modelInfo: "Model is 179cm and 73kg Wearing Size M",
        inStock: false
      },
      {
        id: 't3',
        title: "Trident Technical Jacket",
        price: 290,
        images: [trident1_3, trident1_6],
        modelInfo: "Model is 184cm and 76kg Wearing Size L",
        inStock: true
      }
    ],
    'EXCALIBUR': [
      {
        id: 'e1',
        title: "Excalibur Luxury Hoodie",
        price: 300,
        images: [excalibur1_1, excalibur1_4, excalibur1_7],
        modelInfo: "Model is 187cm and 76kg Wearing Size M",
        inStock: true
      },
      {
        id: 'e2',
        title: "Excalibur Premium Tee",
        price: 150,
        images: [excalibur1_2, excalibur1_5, excalibur1_8],
        modelInfo: "Model is 186cm and 78kg Wearing Size L",
        inStock: true
      },
      {
        id: 'e3',
        title: "Excalibur Designer Jacket",
        price: 450,
        images: [excalibur1_3, excalibur1_6, excalibur1_9],
        modelInfo: "Model is 188cm and 80kg Wearing Size XL",
        inStock: true
      }
    ]
  };

  // Get cart item rank information - infer from product name
  const getItemRank = (productName) => {
    if (productName.startsWith('Spear')) return 'SPEAR';
    if (productName.startsWith('Bident')) return 'BIDENT';
    if (productName.startsWith('Trident')) return 'TRIDENT';
    if (productName.startsWith('Excalibur')) return 'EXCALIBUR';
    return 'SPEAR'; // Default to SPEAR if unknown
  };

  // Get recommended products based on items in cart
  const getSimilarProducts = () => {
    if (cartItems.length === 0) return [];
    
    // Get unique ranks of items in the cart
    const ranks = [...new Set(cartItems.map(item => getItemRank(item.name)))];
    
    // Get product IDs already in cart to exclude them from recommendations
    const cartProductTitles = cartItems.map(item => item.name);
    
    // Get random products from each rank present in the cart, excluding ones already in cart
    let recommendations = [];
    
    ranks.forEach(rank => {
      const rankProducts = productCategories[rank] || [];
      const availableProducts = rankProducts.filter(product => 
        !cartProductTitles.includes(product.title)
      );
      
      // Randomly select up to 2 products from this rank
      if (availableProducts.length > 0) {
        // Shuffle the available products
        const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
        // Take up to 2 products
        const selected = shuffled.slice(0, 2);
        recommendations = [...recommendations, ...selected];
      }
    });
    
    // Shuffle all recommendations and ensure we only return at most 2 products
    return recommendations.sort(() => 0.5 - Math.random()).slice(0, 2);
  };
  
  const recommendedProducts = getSimilarProducts();

  // Handle body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    dispatch(toggleCart(false));
  };
  
  const handleQuantityChange = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      dispatch(updateCartItem({ id, quantity: item.quantity + change }));
    }
  };
  
  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();

  // Handle adding recommended product to cart
  const handleAddRecommended = (product) => {
    const productToAdd = {
      id: Date.now(), // Use Date.now() for id (doesn't matter since we check for duplicates by name+size)
      name: product.title,
      price: product.price,
      size: 'M', // Default size
      quantity: 1,
      image: product.images[0]
    };
    
    dispatch(addToCart(productToAdd));
  };

  return (
    <>
      {isOpen && (
        <div className="relative">
          {/* Cart Sidebar */}
          <div 
            id="cart-sidebar"
            className="fixed inset-y-0 right-0 w-full md:w-96 bg-black text-white shadow-lg transform z-[1500] translate-x-0 overflow-y-auto"
            data-cart-toggle="true"
          >
            <div className="flex flex-col h-full">
              {/* Header Section */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-medium text-center w-full">YOUR CART</h2>
                  <button 
                    onClick={handleClose}
                    className="text-white hover:text-gray-300 transition"
                    aria-label="Close cart"
                    data-cart-toggle="true"
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <>
                  {/* Empty State Message */}
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-400 font-medium text-lg">YOUR CART IS EMPTY.</p>
                  </div>

                  {/* Browse Products Button */}
                  <div className="p-4">
                    <button 
                      className="w-full py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-200"
                      onClick={() => {
                        dispatch(toggleCart(false));
                        navigate('/dressing-room');
                      }}
                    >
                      BROWSE PRODUCTS
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="p-4 overflow-y-auto">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex py-4 border-b border-gray-700">
                        <div className="w-24 h-24 bg-gray-800 mr-4 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="font-medium">${item.price}</p>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{item.size}</p>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center">
                              <button 
                                onClick={() => handleQuantityChange(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-600 text-lg"
                              >
                                –
                              </button>
                              <span className="mx-2">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-600 text-lg"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-gray-400 hover:text-white text-sm underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Recommended Products */}
                  <div className="p-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium mb-3">YOU MIGHT ALSO LIKE</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {recommendedProducts.map(product => (
                        <div key={product.id} className="bg-gray-900 rounded shadow-md p-2">
                          <div className="w-full h-28 bg-gray-800 mb-2">
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="font-medium">${product.price}</p>
                            <button 
                              onClick={() => handleAddRecommended(product)}
                              className="w-6 h-6 flex items-center justify-center bg-white text-black rounded-full"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                      {recommendedProducts.length === 0 && cartItems.length > 0 && (
                        <div className="col-span-2 bg-gray-900 rounded shadow-md p-6 flex justify-center items-center">
                          <p className="text-gray-400 text-center">NO MORE PRODUCTS LEFT FOR THIS RANK</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Cart Summary */}
                  <div className="p-4 border-t border-gray-700">
                    <div className="flex justify-between mb-2">
                      <p>Subtotal</p>
                      <p>${subtotal}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>Shipping</p>
                      <p className="text-green-500">FREE</p>
                    </div>
                    <div className="flex justify-between text-lg font-medium mt-3 mb-3">
                      <p>CART TOTAL</p>
                      <p>${subtotal}</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Gift cards & promotional codes applied at checkout</p>
                    <button 
                      className="w-full py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
                      onClick={() => {
                        dispatch(toggleCart(false));
                        navigate('/login');
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      SECURE CHECKOUT
                    </button>
                    <div className="flex justify-center mt-4 space-x-2">
                      {/* Payment method icons */}
                      <img src={visaIcon} alt="Visa" className="h-5 object-contain" />
                      <img src={mastercardIcon} alt="Mastercard" className="h-5 object-contain" />
                      <img src={amexIcon} alt="American Express" className="h-5 object-contain" />
                      <img src={paypalIcon} alt="PayPal" className="h-5 object-contain" />
                      <img src={applePayIcon} alt="Apple Pay" className="h-5 object-contain" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Backdrop overlay when cart is open */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[1499]" 
            onClick={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default SlideInCart; 