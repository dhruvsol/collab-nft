import { GoPrimitiveDot } from "react-icons/go";

interface Props {
  LeadName: string;
  description: string;
  memberArray: Array<any>;
}
export const Preview = () => {
  return (
    <>
      <div className="flex justify-center items-center pt-10">
        <div className="w-[35rem] h-[40rem] bgnft aspect-square rounded-3xl flex flex-col items-center">
          <h1 className="uppercase text-4xl py-5 nftheading font-Lexend font-extrabold ">
            Supercollabs
          </h1>
          <div className="w-3/4 h-0.5 nftLine"></div>
          <div>
            <h1 className="flex justify-center font-extrabold text-white font-Lexend text-xl pt-3">
              Lead- <span>Rajat</span>
            </h1>
            <p className="flex max-w-md text-center text-white font-outfit font-normal py-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
              voluptatum, itaque doloremque aliquid reprehenderit enim quis?
            </p>
          </div>
          <div className="flex justify-start  w-full px-14">
            <ul className="list-outside list-disc flex flex-col space-y-5 font-Outfit pt-5 ">
              <li className="flex justify-start items-start space-x-2">
                <div className="pt-1 text-white ">
                  <GoPrimitiveDot />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl text-white font-semibold ">
                    Tushar Rao
                  </span>
                  <span className="text-md text-[#CFCFCF]">Desginer</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
