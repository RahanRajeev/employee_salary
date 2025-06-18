import React, { useState, useEffect } from "react";
import axios from "axios";

const Addexpense = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [amount, setAmount] = useState("");


    const viewcat = async () => {
            
        const res = await axios.get("http://localhost:7000/user/expense");
        setCategories(res.data.data);
        console.log(res.data.data);
    

    };

    useEffect(() => {
        
        viewcat();
    }, []);

    const handleAddExpense = () => {
        const userId = sessionStorage.getItem("uid");
        if (!selectedCategory || !amount) {
            alert("Please select a category and enter an amount.");
            return;
        }

       

        const res=axios.post("http://localhost:7000/user/addexpense", { category: selectedCategory,uid: userId, amount })
            .then(response => {
                alert("Expense added successfully!");
                setSelectedCategory("");
                setAmount("");
            })
            .catch(error => console.error("Error adding expense:", error));


           
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#fff" }}>
            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Add Expense</h2>
            <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "14px", marginBottom: "5px" }}>Category</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.category}</option>
                    ))}
                </select>
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", fontSize: "14px", marginBottom: "5px" }}>Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }} />
            </div>
            <button onClick={handleAddExpense} style={{ width: "100%", padding: "10px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add Expense</button>
        </div>
    
    );
  };

export default Addexpense