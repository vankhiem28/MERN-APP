import React from "react";

function Button({ onClick, children }) {
  return (
    <button
      className="text-white text-lg font-medium py-1 rounded-lg bg-orange-500 hover:bg-orange-400 transition-all w-full block mt-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
