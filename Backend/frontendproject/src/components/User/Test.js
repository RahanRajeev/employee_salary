import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 600 },
    { name: "Mar", users: 800 },
    { name: "Apr", users: 500 },
    { name: "May", users: 70 },
  ];
  

const Test = () => {
  return (
    <>
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#007bff" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </>
  )
}

export default Test