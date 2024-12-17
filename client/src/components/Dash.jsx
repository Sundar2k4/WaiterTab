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
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-indigo-600 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6">Available Dishes</h1>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {data.map((dish, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {dish.dishname}
              </h2>
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
