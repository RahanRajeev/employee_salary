import React, { useState } from "react";
import axios from 'axios';


const Addbudget = () => {
    const [budget, setBudget] = useState("");

  const handleAddBudget = async(e) => {
    const userId = sessionStorage.getItem("uid");
    e.preventDefault();
    const res=await axios.post("https://employee-salary-1.onrender.com/user/addbudget",{budget,uid:userId});

    if (!budget) {
      alert("Please enter a budget amount");
      return;
    }
    console.log("Budget added:", budget);
    setBudget(""); // Clear input after adding


    if(res.data.status==='ok'){
        alert('ok')
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556740714-a8395b3bf30f')",
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Set Your Budget
        </h1>
        <p className="text-gray-600 mb-6">
          Plan your expenses efficiently by setting your budget.
        </p>
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Enter budget amount"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddBudget}
            className="px-5 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Add Budget
          </button>
        </div>
      </div>
    </div>

  );
}

export default Addbudget