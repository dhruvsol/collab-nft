import Image from "next/image";
import React from "react";

export const Test = () => {
  return (
    <>
      <div className="bgLanding grid grid-cols-2 ">
        <div></div>
        <main className="  flex flex-col justify-center items-center space-y-20 min-h-screen  ">
          <h1 className="text-3xl xl:text-6xl font-extrabold uppercase super font-Lexend ">
            Supercollabs
          </h1>
          <div className="flex flex-col justify-center text-center">
            <p className="text-transparent bg-clip-text text-xl xl:text-2xl font-medium capitalize superdes font-Lexend">
              Reward Your Team With A Proof Of
            </p>
            <p className="text-transparent bg-clip-text text-xl xl:text-2xl font-medium capitalize superdes font-Lexend">
              Collaboration As An NFT 🏆
            </p>
          </div>
          <button className="bg-phan p-5 h-12 w-72 gap-x-4 relative flex justify-center items-center rounded-2xl font-medium text-lg font-Outfit text-white ">
            <Image
              src="/phantomicon.svg"
              alt="phantom icons"
              width={20}
              height={20}
            />
            Connect Wallet
          </button>
        </main>
      </div>
    </>
  );
};
