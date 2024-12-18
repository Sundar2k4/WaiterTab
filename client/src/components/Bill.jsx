import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Bill = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data = [], Dishquantity = {} } = location.state || {};

  const calculateDishTotal = (dish) => {
    return dish.dishcost * (Dishquantity[dish._id] || 0);
  };

  const filteredDishes = (data || []).filter(dish => (Dishquantity[dish._id] || 0) > 0);

  const subtotal = filteredDishes.reduce((total, dish) => 
    total + calculateDishTotal(dish), 0);

  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Bill
        </h1>

        {filteredDishes.length > 0 ? (
          <>
            <div className="space-y-4 mb-6">
              {filteredDishes.map((dish) => (
                <div 
                  key={dish._id} 
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {dish.dishname}
                    </p>
                    <p className="text-sm text-gray-500">
                      {`₹${dish.dishcost.toFixed(2)} × ${Dishquantity[dish._id] || 0}`}
                    </p>
                  </div>
                  <p className="font-bold text-gray-700">
                    {`₹${calculateDishTotal(dish).toFixed(2)}`}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-bold">{`₹${subtotal.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (10%)</span>
                <span className="font-bold">{`₹${tax.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-purple-100 p-4 rounded-lg">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-purple-700">{`₹${total.toFixed(2)}`}</span>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            No items in the bill
          </div>
        )}

        <div className="mt-6 flex space-x-4">
          <button 
            onClick={() => navigate('/dash')} 
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Menu
          </button>
          <button 
            disabled={filteredDishes.length === 0}
            className={`w-full py-3 rounded-lg transition-colors ${
              filteredDishes.length > 0 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;