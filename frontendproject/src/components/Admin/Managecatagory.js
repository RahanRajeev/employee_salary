import React from 'react'
import { useState } from "react";

import { Trash2 } from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Managecatagory = () => {
    const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const nav=useNavigate()

  const addCategory =async (e) => {
    e.preventDefault();
    const res=await axios.post("https://employee-salary-1.onrender.com/admin/addcategory",{category});
    if (category.trim() && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory("");
    }

    console.log(res.data.status)
    if(res.data.status==='ok'){
        alert('ok')
        nav('/managecatagory')
    }
  };


  const removeCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };



//   const[category,setCategory]=useState('')
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        <form onSubmit={addCategory}>
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button  className="bg-blue-500 text-white px-4 py-2 rounded-lg" type='submit'>
          Add
        </button>
      </div>
      <div className="space-y-2">
        {categories.map((cat, index) => (
          <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-md">
            <span>{cat}</span>
            <button
              onClick={() => removeCategory(cat)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        
      </div>
      </form>
      
     </div>
   
  )
}

export default Managecatagory