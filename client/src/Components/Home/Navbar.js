import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const authData = useContext(AuthContext);

  const { LogoutUser, authState } = authData;

  const handleSignOut = () => {
    LogoutUser();
  };

  return (
    <header className="h-[50px] bg-slate-500 flex justify-between items-center px-3">
      <h1 className="text-white text-2xl">Dashboard</h1>
      <div className="flex items-center gap-3">
        <p className="text-white">{`Hello, ${
          authState.user.name ? authState.user.name : "Not user"
        } `}</p>
        <img
          src="https://images.unsplash.com/photo-1682589848125-dbff2da5dc8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="w-[30px] h-[30px] rounded-full border"
        />
        <button
          className="bg-green-600 p-2 text-white font-medium rounded-lg"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

export default Navbar;
