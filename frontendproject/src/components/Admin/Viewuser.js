import axios from "axios";
import React, { useEffect, useState } from "react";

const Viewuser = () => {
    const [users, setUsers] = useState([]);

    // Fetch users from backend
    const getUsers = async () => {
        const res = await axios.get("https://employee-salary-1.onrender.com/admin/viewuser");
        setUsers(res.data.data);

        console.log(res.data.data);
    };


    // const toggleBlockUser = async (userId, isBlocked) => {
    //     await axios.put(`http://localhost:7000/admin/blockuser/${userId}`, {
    //         blocked: !isBlocked, // Toggle the blocked status
    //     });
    //     getUsers(); // Refresh the user list after updating
    // };

    useEffect(() => {
        getUsers();
    }, []);


    //   block
    const [appr, setappr] = useState(false);
    const blockuser = async (id) => {
        const res = await axios.get(`https://employee-salary-1.onrender.com/admin/block/${id}`)
        console.log(res.data);
        if (res.data.status === 'block') {
            // alert('blocked successfully')
            getUsers();
        }
        setappr(true)
    }

    // unblock

    
    const unblockuser = async (id) => {
        const res = await axios.get(`https://employee-salary-1.onrender.com/admin/unblock/${id}`)
        console.log(res.data);
        if (res.data.status === 'unblock') {
            // alert('unblocked successfully')
            getUsers();
        }
        setappr(true)
    }


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                User Profiles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user) => (
                    <div
                        key={user._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden p-5 transition transform hover:scale-105"
                    >
                        <img
                            src={`https://employee-salary-1.onrender.com/${user.image}`}
                            alt="User"
                            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-gray-200"
                        />
                        <div className="text-center mt-4">
                            <h3 className="text-xl font-bold text-gray-700">{user.name}</h3>
                            <p className="text-gray-500">{user.email}</p>
                            <p className="text-gray-600 mt-2">
                                <strong>Gender:</strong> {user.gender}
                            </p>
                            <p className="text-gray-600">
                                <strong>Phone:</strong> {user.phone}
                            </p>

                            {user.status === "blocked" ? (
                                <button
                                    onClick={() => unblockuser(user._id)}
                                    className="mt-4 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg"
                                >
                                    Unblock
                                </button>
                            ) : (
                                <button
                                    onClick={() => blockuser(user._id)}
                                    className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                                >
                                    Block
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Viewuser