import { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import member, { addNewMember, removeMember } from "../features/member";
import { AdminSuccess } from "./AdminSuccess";
import {
  addAdminWallet,
  addCollabName,
  addDescription,
  addLeadName,
} from "../features/collabInfo";
export const Form = () => {
  const [form, setForm] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [Name, setMemberName] = useState<string>("");
  const [Role, setRole] = useState<string>("");
  const [WalletAddress, setWalletAddress] = useState<string>("");
  const [XpPercent, setMemberXP] = useState<number>(0);
  const Members = useAppSelector((state) => state.FormReducers.MemberArray);
  const memberCount = useAppSelector((state) => state.FormReducers.memberCount);

  const dispatch = useAppDispatch();
  const AddMember = () => {
    const a = { Name, Role, WalletAddress, XpPercent };
    dispatch(addNewMember(a));
    setDefault();
  };
  const RemoveMember = (address: string) => {
    dispatch(removeMember(address));
  };
  const setDefault = () => {
    setMemberName("");
    setWalletAddress("");
    setMemberXP(0);
    setRole("");
  };
  return (
    <>
      <section className="px-12 flex flex-col ">
        <h1 className="text-white py-5 text-2xl xl:text-3xl font-Outfit font-medium ">
          Create Collab
        </h1>
        <hr className=" border border-borderline" />
        <div className="flex flex-col justify-center space-y-3 pt-5">
          <h1 className=" text-[#C0C0C0] flex space-x-2 justify-start items-baseline">
            <span className="text-2xl">Title</span>
            <BsExclamationCircleFill />{" "}
          </h1>
          <input
            type="text"
            name="Collab Name"
            onChange={(e) => dispatch(addCollabName(e.target.value))}
            className="w-full rounded-xl h-14 bg-transparent text-[#939393]  outline outline-[#939393] px-4"
            placeholder="Write collab title"
          />
        </div>
        {/**********************/}
        <div className="flex flex-col justify-center space-y-3 pt-5">
          <h1 className=" text-[#C0C0C0] flex space-x-2 justify-start items-baseline">
            <span className="text-2xl">Lead name</span>
            <BsExclamationCircleFill />{" "}
          </h1>
          <input
            type="text"
            name="lead name"
            onChange={(e) => dispatch(addLeadName(e.target.value))}
            className="w-full rounded-xl h-14 bg-transparent text-[#939393]  outline outline-[#939393] px-4"
            placeholder="Write lead name"
          />
        </div>
        {/**************************/}
        <div className="flex flex-col justify-center space-y-3 py-6">
          <h1 className=" text-[#C0C0C0] flex space-x-2 justify-start items-baseline">
            <span className="text-2xl">Description</span>
            <BsExclamationCircleFill />{" "}
          </h1>
          <textarea
            rows={4}
            name="Description"
            onChange={(e) => dispatch(addDescription(e.target.value))}
            className="w-full rounded-xl pt-3  bg-transparent text-[#939393]  outline outline-[#939393] px-4 resize-none"
            placeholder="Write collab description"
          />
        </div>

        <div>
          {memberCount === 0 ? (
            <>
              <button
                onClick={() => setForm(true)}
                className="sus w-full rounded-xl my-2 h-14 bg-[#5439CE] font-Outfit font-normal text-xl text-white"
              >
                Add Member
              </button>
            </>
          ) : (
            <>
              <div className="flex space-x-2 items-center">
                <h1 className=" text-[#C0C0C0] flex space-x-2 justify-start items-baseline">
                  <span className="text-2xl">Added Members</span>
                  <BsExclamationCircleFill />{" "}
                </h1>
                <button
                  onClick={() => setForm(true)}
                  className="bg-[#6758E5FD] w-20 h-7 rounded-lg flex justify-center items-center font-normal text-white font-Outfit"
                >
                  + Add
                </button>
              </div>
            </>
          )}
          {Members.map(({ WalletAddress, Name, XpPercent }) => {
            return (
              <>
                <div
                  key={WalletAddress}
                  className="flex justify-between border-2 border-[#939393] px-3 py-2 rounded-xl my-3"
                >
                  <div>
                    <h1 className="text-lg flex space-x-1">
                      <span className="text-[#636363]">Name:</span>
                      <span className="text-white font-normal">{Name}</span>
                    </h1>
                    <h1 className="text-lg flex space-x-1">
                      <span className="text-[#636363]">Address:</span>
                      <span className="text-white font-normal">
                        {WalletAddress === ""
                          ? "N/A"
                          : WalletAddress.slice(0, 4) +
                            "...." +
                            WalletAddress.slice(
                              WalletAddress.length - 4,
                              WalletAddress.length
                            )}
                      </span>
                    </h1>
                    <h1 className="text-lg flex space-x-1">
                      <span className="text-[#636363]">XPs:</span>
                      <span className="text-white font-normal">
                        {XpPercent}
                      </span>
                    </h1>
                  </div>
                  <h1
                    onClick={() => RemoveMember(WalletAddress)}
                    className="text-[#F24848] text-lg cursor-pointer align-top "
                  >
                    Remove
                  </h1>
                </div>
              </>
            );
          })}
        </div>
        {memberCount != 0 && (
          <>
            <button
              onClick={() => setSuccess(true)}
              className="sus w-full rounded-xl my-2 h-14 bg-[#5439CE] font-Outfit font-normal text-xl text-white"
            >
              Submit
            </button>
          </>
        )}
        {success && <AdminSuccess />}
        {form && (
          <>
            <div className="z-40 fixed  transition-opacity w-full">
              <div className="w-full flex justify-center items-center">
                <div className="fixed inset-0 bg-light-black backdrop-blur-sm">
                  <div className="flex justify-center items-center min-h-screen">
                    <div className="h-[31rem] w-[28rem]  bg-[#0A1837] opacity-80 rounded-2xl px-10 formborder    ">
                      <h1 className="text-2xl text-white font-medium font-Outfit py-5">
                        Add a members
                      </h1>
                      <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-start items-center gap-x-2">
                            <h1 className="text-[#D7D7D7] text-lg font-Outfit font-normal">
                              Name
                            </h1>
                            <p className="text-xs text-white font-medium font-Outfit p-1 px-2 rounded-xl bg-[#6758E5FD]">
                              Required
                            </p>
                          </div>
                          <input
                            onChange={(e) => setMemberName(e.target.value)}
                            type="text"
                            placeholder="Enter name"
                            className="w-full rounded-xl h-10 bg-transparent text-[#939393]  outline-none outline-[#939393] px-4"
                          />
                        </div>
                        {/*  */}
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-start items-center gap-x-2">
                            <h1 className="text-[#D7D7D7] text-lg font-Outfit font-normal">
                              Role
                            </h1>
                            <p className="text-xs text-white font-medium font-Outfit p-1 px-2 rounded-xl bg-[#6758E5FD]">
                              Required
                            </p>
                          </div>
                          <input
                            type="text"
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Enter role"
                            className="w-full rounded-xl h-10 bg-transparent text-[#939393]  outline-none outline-[#939393] px-4"
                          />
                        </div>
                        {/*****/}
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-start items-center gap-x-2">
                            <h1 className="text-[#D7D7D7] text-lg font-Outfit font-normal">
                              Wallet Address
                            </h1>
                            <p className="text-xs text-white font-medium font-Outfit p-1 px-2 rounded-xl bg-[#6758E5FD]">
                              Required
                            </p>
                          </div>
                          <input
                            type="text"
                            onChange={(e) => setWalletAddress(e.target.value)}
                            placeholder="Enter wallet address "
                            className="w-full rounded-xl h-10 bg-transparent text-[#939393]  outline-none outline-[#939393] px-4"
                          />
                        </div>
                        {/************/}
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-start items-center gap-x-2">
                            <h1 className="text-[#D7D7D7] text-lg font-Outfit font-normal">
                              XPs
                            </h1>
                            <p className="text-xs text-white font-medium font-Outfit p-1 px-2 rounded-xl bg-[#6758E5FD]">
                              Required
                            </p>
                          </div>
                          <input
                            type="tel"
                            onChange={(e) =>
                              setMemberXP(parseInt(e.target.value))
                            }
                            placeholder="Enter XPs"
                            className="w-full rounded-xl h-10 bg-transparent text-[#939393]  outline-none outline-[#939393] px-4"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between py-5 space-x-4">
                        <button
                          onClick={() => setForm(false)}
                          className=" font-medium text-white font-Outfit p-2 border-2 w-full border-[#5439CE] rounded-3xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setForm(false);
                            AddMember();
                          }}
                          className="font-medium  font-Outfit text-white w-full bg-[#5439CE] p-2 rounded-3xl"
                        >
                          Add member +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};
