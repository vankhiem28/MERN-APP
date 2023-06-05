import React from "react";

function Page({ page, children, onClick }) {
  return (
    <div className="flex">
      <button
        className={`px-2 border border-red-400 ${
          page === children ? "bg-blue-500 text-white" : ""
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Page;
