import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dash = () => {
  const [data, setData] = useState([]);

  const dishes = async () => {
    try {
      const dish = await axios.get('http://localhost:5000/dash-get');
      setData(dish.data);
    } catch (err) {
      console.log('The error is', err.message);
    }
  };

  useEffect(() => {
    dishes();
  }, []);

  return (
    <div className="min-h-screen bg-purple-400 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-white mb-8">Available Dishes</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
          {data.map((dish, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">{dish.dishname}</h2>
              <p className="text-lg font-medium text-gray-600 mb-4">{`₹${dish.dishcost.toFixed(2)}`}</p>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-2xl text-white mt-10">No dishes available</h2>
      )}
    </div>
  );
};

export default Dash;
