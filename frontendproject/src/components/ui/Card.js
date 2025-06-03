import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};
