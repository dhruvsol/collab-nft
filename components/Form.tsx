import { BsExclamationCircleFill } from "react-icons/bs";
export const Form = () => {
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
            className="w-full rounded-xl pt-3  bg-transparent text-[#939393]  outline outline-[#939393] px-4 resize-none"
            placeholder="Write collab description"
          />
        </div>
        <button className="w-full rounded-xl h-14 bg-[#5439CE] font-Outfit font-normal text-xl text-white">
          + Add Member
        </button>
      </section>
    </>
  );
};
