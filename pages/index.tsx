import type { NextPage } from "next";
import Image from "next/image";
import { Landing } from "../components/Landing";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex  ">
        {/* <Image src='/gradient1.png' alt="gradient"  /> */}
        <div className="bglanding"></div>
        <div className="w-full">
          <Landing />
        </div>
      </div>
    </>
  );
};

export default Home;
