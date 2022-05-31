import React from "react";

export const Navbar = () => {
  return (
    <>
      <div className="flex justify-between px-10 h-20 items-center border-b border-[#8BD1D2] ">
        <h1 className="uppercase super text-3xl font-Lexend font-extrabold tracking-tight ">
          SuperCollabs
        </h1>
        <button className="bg-phan p-5 h-10 w-48 gap-x-4 relative flex justify-center items-center rounded-2xl font-medium text-lg font-Outfit text-white">
          Connect Wallet
        </button>
      </div>
    </>
  );
};
