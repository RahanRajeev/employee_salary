import React from "react";

export default function Input({ type = "text", placeholder, value, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}