import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bill from './Bill';
import { useNavigate } from 'react-router-dom';


const Dash = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [Dishquantity, setQuantity] = useState({});

  const dishes = async () => {
    try {
      const dish = await axios.get('http://localhost:5000/dash-get');
      setData(dish.data);
    } catch (err) {
      console.log('The error is', err.message);
    }
  };

  const handleplus = (dishId) => {
    setQuantity((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [dishId]: (prevQuantities[dishId] || 0) + 1
      };
      return updatedQuantities;
    });
  };

  const handleminus = (dishId) => {
    setQuantity((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [dishId]: Math.max((prevQuantities[dishId] || 0) - 1, 0)
      };
      return updatedQuantities;
    });
  };

  const navigateToBill = () => {
    navigate('/bill', { 
      state: { 
        data: data, 
        Dishquantity: Dishquantity 
      } 
    });
  };

  useEffect(() => {
    dishes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-10 tracking-wide drop-shadow-lg">
          Available Dishes
        </h1>
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {data.map((dish, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 truncate">
                  {dish.dishname}
                </h2>
                <p className="text-lg font-semibold text-gray-600 mb-4">
                  {`₹${(dish.dishcost * (Dishquantity[dish._id] || 0)).toFixed(2)}`}
                </p>
                <div className="flex justify-center items-center space-x-4 bg-gray-100 rounded-full p-2">
                  <button
                    onClick={() => handleminus(dish._id)}
                    className="bg-red-500 text-white p-2 rounded-full transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </button>
                  <span className="text-xl font-bold text-gray-700 w-10 text-center">
                    {Dishquantity[dish._id] || 0}
                  </span>
                  <button
                    onClick={() => handleplus(dish._id)}
                    className="bg-green-500 text-white p-2 rounded-full transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-2xl text-white text-center mt-10">No dishes available</h2>
        )}
      </div>
      <button onClick={navigateToBill}>Bill</button>
      <div className='hidden'>
      <Bill data = {data} Dishquantity = {Dishquantity}/>
      </div>
     
    </div>
  );
};

export default Dash;