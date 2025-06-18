import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
} from "recharts";

const Viewexpense = () => {
    const [expenses, setExpenses] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [warnings, setWarnings] = useState([]);

    const getCurrentMonth = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uid = sessionStorage.getItem("uid");
                const res = await axios.get("https://employee-salary-1.onrender.com/user/viewexpense", { params: { uid } });

                if (res.data) {
                    setExpenses(res.data.data || []);
                    setBudgets(res.data.budgets || []);
                } else {
                    setExpenses([]);
                    setBudgets([]);
                }

                setLoading(false);
            } catch (err) {
                setError("Error fetching data.");
                setExpenses([]);
                setBudgets([]);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const availableMonths = useMemo(() => {
        if (!budgets || budgets.length === 0) return [];
        return [...new Set(budgets.map(budget => budget.date.substring(0, 7)).filter(Boolean))];
    }, [budgets]);

    useEffect(() => {
        if (!selectedMonth && availableMonths.length > 0) {
            const currentMonth = getCurrentMonth();
            setSelectedMonth(availableMonths.includes(currentMonth) ? currentMonth : availableMonths[availableMonths.length - 1]);
        }
    }, [availableMonths, selectedMonth]);

    const filteredExpenses = useMemo(() => {
        return selectedMonth ? expenses.filter(expense => expense.date.startsWith(selectedMonth)) : [];
    }, [expenses, selectedMonth]);

    const filteredBudgets = useMemo(() => {
        return selectedMonth ? budgets.filter(budget => budget.date.startsWith(selectedMonth)) : [];
    }, [budgets, selectedMonth]);

    const totalBudget = useMemo(() => {
        return filteredBudgets.reduce((sum, budget) => sum + parseFloat(budget.budget || 0), 0);
    }, [filteredBudgets]);

    const totalExpense = useMemo(() => {
        return filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.expense || 0), 0);
    }, [filteredExpenses]);

    useEffect(() => {
        if (totalExpense > totalBudget) {
            setWarnings([`⚠️ Warning: Expenses (₹${totalExpense}) exceed budget (₹${totalBudget}) for ${selectedMonth}.`]);
        } else {
            setWarnings([]);
        }
    }, [totalExpense, totalBudget, selectedMonth]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Expense & Budget Overview</h2>

            {loading && <p className="text-center text-blue-500">Loading data...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Month Selection */}
            <div className="mb-6 text-center">
                <label className="mr-2 font-semibold text-lg">Select Month:</label>
                <select
                    className="px-3 py-2 border rounded-md text-lg"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {availableMonths.length > 0 ? (
                        availableMonths.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))
                    ) : (
                        <option disabled>No months available</option>
                    )}
                </select>
            </div>

            {/* Show warning messages */}
            {warnings.length > 0 && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-lg">
                    {warnings.map((msg, index) => (
                        <p key={index} className="mb-2">{msg}</p>
                    ))}
                </div>
            )}

            {/* Layout: Graph on Left, Table on Right */}
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Expense vs Budget Chart */}
                <div className="lg:w-2/3 bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Expense vs Budget</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={[{ budget: totalBudget, expense: totalExpense }]} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="expense" fill="#E53E3E" barSize={40} name="Expense" />
                            <Bar dataKey="budget" fill="#3182CE" barSize={40} name="Budget" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Expenses Table (Smaller) */}
                <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Expenses</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="p-2 text-left">Category</th>
                                    <th className="p-2 text-left">Expense (₹)</th>
                                    <th className="p-2 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.length > 0 ? (
                                    filteredExpenses.map(expense => (
                                        <tr key={expense._id} className="border-b hover:bg-gray-100">
                                            <td className="p-2">{expense.categoryid?.category || "Unknown"}</td>
                                            <td className="p-2 text-red-600 font-bold">₹{expense.expense}</td>
                                            <td className="p-2">{expense.date}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="p-2 text-center text-gray-500">
                                            No expenses for this month.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Viewexpense;
