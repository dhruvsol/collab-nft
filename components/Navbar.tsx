import { useAppSelector } from "../store/hooks";

export const Navbar = () => {
  const AddminWallet = useAppSelector((state) => state.collabInfo.AdminWallet);
  return (
    <>
      <div className="flex justify-between px-10 h-20 items-center border-b border-[#8BD1D2] ">
        <h1 className="uppercase super text-3xl font-Lexend font-extrabold tracking-tight ">
          SuperCollabs
        </h1>
        <button className="bg-phan p-5 h-10 w-48 gap-x-4 relative flex justify-center items-center rounded-2xl font-medium text-lg font-Outfit text-white">
          {AddminWallet.slice(0, 4) +
            "...." +
            AddminWallet.slice(AddminWallet.length - 4, AddminWallet.length)}
        </button>
      </div>
    </>
  );
};
