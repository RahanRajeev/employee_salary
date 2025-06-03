import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaUsers, FaList, FaPlus, FaChartLine, FaStar, FaKey } from "react-icons/fa";

const Admin = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <aside className={`bg-white shadow-md h-full p-5 transition-all ${sidebarOpen ? "w-72" : "w-20"} fixed top-0 left-0 overflow-hidden rounded-r-xl border-r border-gray-300`}>
                <h3 className={`text-2xl font-bold text-center mb-6 transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>Admin Panel</h3>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer transition">
                        <FaChartLine className="text-lg" /> {sidebarOpen && <Link to="/dashboard" className="text-lg">Dashboard</Link>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer transition">
                        <FaList className="text-lg" /> {sidebarOpen && <Link to="/viewcomplaint" className="text-lg">Complaints</Link>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer transition">
                        <FaPlus className="text-lg" /> {sidebarOpen && <Link to="/managecatagory" className="text-lg">Categories</Link>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer transition">
                        <FaList className="text-lg" /> {sidebarOpen && <Link to="/viewcategory" className="text-lg">View Category</Link>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer transition">
                        <FaUsers className="text-lg" /> {sidebarOpen && <Link to="/viewuser" className="text-lg">Users</Link>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer transition">
                        <FaStar className="text-lg" /> {sidebarOpen && <Link to="/viewreview" className="text-lg">Reviews</Link>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md cursor-pointer transition">
                        <FaKey className="text-lg" /> {sidebarOpen && <Link to="/adminchangepass" className="text-lg">Change Password</Link>}
                    </li>
                    <li onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-red-600 text-white bg-red-500 rounded-md cursor-pointer transition">
                        <FaSignOutAlt className="text-lg" /> {sidebarOpen && "Logout"}
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-20 md:ml-72 p-6">
                {/* Header */}
                <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6 border border-gray-300">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
                        <FaBars />
                    </button>
                    <h2 className="text-xl font-semibold">Admin Dashboard</h2>
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700">
                        Logout
                    </button>
                </header>

                {/* Dashboard Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-4 gap-6">
                    {[
                        { title: "Total Users", count: 120 },
                        { title: "Total Complaints", count: 45 },
                        { title: "Categories", count: 10 },
                        { title: "Pending Complaints", count: 12 },
                    ].map((card, index) => (
                        <div key={index} className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                            <h4 className="text-lg font-semibold">{card.title}</h4>
                            <p className="text-2xl font-bold text-blue-500">{card.count}</p>
                        </div>
                    ))}
                </section>

                {/* Complaint Management */}
                <section className="bg-white p-6 mt-6 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-lg font-semibold mb-4">Manage Complaints</h3>
                    <p>✅ View user complaints.</p>
                    <Link to="/viewcomplaint" className="text-blue-600 underline">Go to Complaints</Link>
                </section>

                {/* Category Management */}
                <section className="bg-white p-6 mt-6 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-lg font-semibold mb-4">Manage Categories</h3>
                    <p>✅ Add and update categories.</p>
                    <Link to="/managecatagory" className="text-blue-600 underline">Go to Categories</Link>
                </section>

                {/* Recent Activities */}
                <section className="bg-white p-6 mt-6 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <ul className="space-y-2">
                        <li className="text-gray-600">✅ User JohnDoe registered.</li>
                        <li className="text-gray-600">⚠️ Complaint received from user #24.</li>
                        <li className="text-gray-600">✅ New category "Transport" added.</li>
                        <li className="text-gray-600">❌ User #67 blocked for violation.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Admin;