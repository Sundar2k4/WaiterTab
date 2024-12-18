import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Requirement = () => {
  const navigate = useNavigate();
  const [dishname, setDish] = useState('');
  const [dishcost,setDishCost] = useState('');
  const [responses, setResponses] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (dishname) {
      try {
        const response = await axios.post('http://localhost:5000/disher', { dishname, dishcost });
        console.log('Dish added successfully:', response.data);
        navigate('/dash')
      } catch (error) {
        console.error('Error adding dish:', error);
        alert('Failed to add dish. Please try again.');
      }
    } else {
      alert('Please enter a dish');
    }
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get('http://localhost:5000/dash-get');
      setResponses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/dish-delete/${id}`);
      console.log("Dish successfully deleted", response.data);

      // Optionally, update state to remove the dish from UI without reloading
      setResponses((prevData) => prevData.filter((dish) => dish._id !== id));
    } catch (err) {
      console.log("Error deleting dish:", err.message);
    }
  };

  const gotodash = () =>{
    navigate('/dash')
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-sky-600 flex flex-col items-center justify-center p-6">
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md"
        onSubmit={handlesubmit}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add a New Dish</h1>
        <label htmlFor="dish" className="block text-gray-700 font-medium mb-2">
          Dish Name
        </label>
        <input
          type="text"
          placeholder="Enter dish name"
          id="dish"
          value={dishname}
          onChange={(e) => setDish(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />
        <input
          type="Number"
          placeholder="Enter Cost"
          id="dishcost"
          value={dishcost}
          onChange={(e) => setDishCost(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />
        <button
          type="submit"
          className="w-full bg-zinc-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Save
        </button>
      </form>

                <div>
                  <h1 onClick={gotodash} className='cursor-pointer bg-sky-100 rounded-md my-2 p-3 hover:scale-105 transform transition-all  duration-300 ease-in'>Al La Carte
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                 </h1>
                </div>

      <div className="mt-10 w-full max-w-2xl">
        {responses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {responses.map((dish, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 text-center hover:scale-105 transform transition-all duration-300 ease-in-out">
                <h1 className="text-xl font-bold text-gray-800">{dish.dishname}</h1>
                <h1 className='text-xl font-bold text-gray-800'> Price: ₹{dish.dishcost}</h1>
                <div onClick={() => handledelete(dish._id)} className="cursor-pointer text-red-500 mt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-center text-xl text-white font-semibold">No dishes available</h1>
        )}
      </div>
    </div>
  );
};

export default Requirement;
