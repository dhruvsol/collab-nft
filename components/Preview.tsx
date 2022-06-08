import { GoPrimitiveDot } from "react-icons/go";
import { useAppSelector } from "../store/hooks";

interface Props {
  LeadName: string;
  description: string;
  memberArray: Array<any>;
}
export const Preview = () => {
  const leadName = useAppSelector((state) => state.collabInfo.LeadName);
  const desc = useAppSelector((state) => state.collabInfo.Description);
  const memberArray = useAppSelector((state) => state.FormReducers.MemberArray);
  const memberCount = useAppSelector((state) => state.FormReducers.memberCount);
  return (
    <>
      <div className="flex justify-center items-center pt-10">
        <div className="w-[35rem] h-[40rem] bgnft aspect-square rounded-3xl flex flex-col items-center">
          <h1 className="uppercase text-4xl py-5 text-white font-Lexend font-extrabold ">
            Supercollabs
          </h1>
          <div className="w-3/4 h-0.5 bg-white"></div>
          <div className="max-w-md">
            <p className="flex justify-center items-center text-center text-white font-outfit font-normal py-3">
              {desc}
            </p>
            <h1 className="flex justify-center font-extrabold text-white font-Lexend text-xl pt-3">
              Lead- <span>{leadName}</span>
            </h1>
          </div>
          <div className="flex justify-start  w-full px-14">
            <ul className="list-outside list-disc flex flex-col space-y-5 font-Outfit pt-5 ">
              {memberCount != 0 &&
                memberArray.map((props) => {
                  const { Name, Role } = props;
                  return (
                    <>
                      <li className="flex justify-start items-start space-x-2">
                        <div className="pt-1 text-white ">
                          <GoPrimitiveDot />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl text-white font-semibold ">
                            {Name}
                          </span>
                          <span className="text-md text-[#CFCFCF]">{Role}</span>
                        </div>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
