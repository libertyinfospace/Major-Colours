import React, { useState } from 'react';

const DressingRoomComponent = () => {
  // Set purchases as default section and ensure it's selected on initial load
  const [hasPurchases, setHasPurchases] = useState(false);
  const [activeSection, setActiveSection] = useState('purchases');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  
  // Mock purchase history data
  const purchases = [
    {
      id: 1,
      name: 'BLACK SUIT',
      date: '2023-11-15',
      price: '$799.99',
      image: 'https://placehold.co/120x120/333/white?text=SUIT'
    },
    {
      id: 2,
      name: 'LUXURY WATCH',
      date: '2023-12-03',
      price: '$1,299.99',
      image: 'https://placehold.co/120x120/333/white?text=WATCH'
    },
    {
      id: 3,
      name: 'LEATHER SHOES',
      date: '2024-01-20',
      price: '$349.99',
      image: 'https://placehold.co/120x120/333/white?text=SHOES'
    },
    {
      id: 4,
      name: 'Timeless Comfort Hoodie',
      date: '2024-11-11',
      deliveryDate: '2024-11-21',
      price: '$300',
      image: 'https://placehold.co/400x400/333/white?text=MAJOR+COLOURS'
    }
  ];

  // Toggle function for demo purposes
  const togglePurchases = () => {
    setHasPurchases(!hasPurchases);
  };
  
  // Function to view order details
  const viewOrderDetails = (purchaseId) => {
    setShowOrderSummary(true);
  };
  
  // Function to go back to purchases list
  const backToPurchases = () => {
    setShowOrderSummary(false);
  };

  // Product Order Summary Component
  const OrderSummaryComponent = () => {
    const product = purchases[3]; // Using the hoodie from our mock data
    
    return (
      <div className="w-full min-h-[60vh] bg-black">
        <button 
          onClick={backToPurchases} 
          className="text-white mb-6 flex items-center hover:underline"
        >
          ← Back to purchases
        </button>
        
        <div className="flex flex-col md:flex-row w-full">
          {/* Left Section - Text Content */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-8">
              {product.name}
            </h1>
            
            <div className="space-y-6">
              <div className="py-4 border-b border-[#666666]">
                <div className="flex justify-between">
                  <span className="text-[#999999]">Purchase Date</span>
                  <span className="text-white font-medium">11-11-2024</span>
                </div>
              </div>
              
              <div className="py-4 border-b border-[#666666]">
                <div className="flex justify-between">
                  <span className="text-[#999999]">Delivery Date</span>
                  <span className="text-white font-medium">21-11-2024</span>
                </div>
              </div>
              
              <div className="py-4 border-b border-[#666666]">
                <div className="flex justify-between">
                  <span className="text-[#999999]">Price</span>
                  <span className="text-white font-medium">{product.price}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <button className="bg-[#A39D9D] text-white py-3 px-6 flex items-center justify-center rounded-sm hover:bg-[#8d8686] transition-colors w-full md:w-auto">
                <span className="mr-2">⦿</span> RETURN
              </button>
            </div>
          </div>
          
          {/* Right Section - Product Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-[60vh] font-['Inter','Roboto',sans-serif] flex">
      {/* Section 1: Navigation buttons - now on the left side */}
      <div className="w-1/4 min-w-[180px] pt-8 px-6">
        <div className="mb-8">
          <button 
            onClick={() => {
              setActiveSection('purchases');
              setShowOrderSummary(false);
            }}
            className={`text-xl font-bold ${activeSection === 'purchases' ? 'text-white' : 'text-[#999999]'} hover:text-white transition-colors`}
          >
            PURCHASES
          </button>
        </div>
        <div className="mb-8">
          <button 
            onClick={() => setActiveSection('returns')}
            className={`text-xl font-bold ${activeSection === 'returns' ? 'text-white' : 'text-[#999999]'} hover:text-white transition-colors`}
          >
            RETURN
          </button>
        </div>
        
        {/* For demo purposes only */}
        <div className="mt-16">
          <button 
            onClick={togglePurchases} 
            className="text-[#999999] hover:text-white text-xs border border-[#555] px-3 py-1 rounded-sm"
          >
            TOGGLE DEMO
          </button>
          <button 
            onClick={() => setShowOrderSummary(!showOrderSummary)} 
            className="text-[#999999] hover:text-white text-xs border border-[#555] px-3 py-1 rounded-sm mt-2"
          >
            {showOrderSummary ? 'SHOW LIST' : 'SHOW SUMMARY'}
          </button>
        </div>
      </div>

      {/* Section 2: Content area - now on the right side */}
      <div className="flex-1 p-8">
        {activeSection === 'purchases' ? (
          // Purchases content
          showOrderSummary ? (
            <OrderSummaryComponent />
          ) : hasPurchases ? (
            /* Purchase history section */
            <div className="w-full">
              <div className="grid grid-cols-1 gap-6">
                {purchases.map(purchase => (
                  <div key={purchase.id} className="bg-[#111] p-4 rounded-sm flex items-center border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="w-24 h-24 mr-4 overflow-hidden rounded-sm">
                      <img src={purchase.image} alt={purchase.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white font-bold">{purchase.name}</h3>
                      <p className="text-[#999999] text-sm mt-1">Purchased on {new Date(purchase.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{purchase.price}</p>
                      <button 
                        className="text-[#999999] text-xs hover:text-white mt-2 border border-[#555] px-2 py-1 rounded-sm"
                        onClick={() => viewOrderDetails(purchase.id)}
                      >
                        DETAILS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty state message for purchases */
            <div className="h-full flex items-center justify-center">
              <h2 className="text-[#999999] text-xl md:text-2xl lg:text-3xl font-bold text-center">
                LOOKS LIKE YOU HAVEN'T PLACED AN ORDER
              </h2>
            </div>
          )
        ) : (
          /* Returns section - updated message */
          <div className="h-full flex items-center justify-center">
            <h2 className="text-[#999999] text-xl md:text-2xl lg:text-3xl font-bold text-center">
              NO ITEMS TO BE RETURNED
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DressingRoomComponent;
