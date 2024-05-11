import React from "react";
// import { BiCart3, BiCreditCard, BiPerson, BiPeople } from "react-icons/bi";

const DashboardComponent = () => {
  return (
    <>
      <div className="flex flex-wrap flex-row">
        <div className="flex-shrink max-w-full px-4 w-full">
          <p className="text-xl font-bold mt-3 mb-5">Ecommerce</p>
        </div>
        <div className="flex-shrink max-w-full px-4 w-full sm:w-1/2 lg:w-1/4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full">
            <div className="pt-6 px-6 relative text-sm font-semibold">
              Total Orders
              <div className="ltr:float-right rtl:float-left text-green-500">
                +12%
                <div className="absolute top-auto bottom-full mb-3" style={{display: "none"}}>
                                <div className="z-40 w-32 p-2 -mb-1 text-sm leading-tight text-white bg-black rounded-lg shadow-lg text-center">
                                Since last month
                                </div>
                <div className="absolute transform -rotate-45 p-1 w-1 bg-black bottom-0 -mb-2 ltr:ml-6 rtl:mr-6"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between px-6 py-4">
            {/* <div className="self-center w-14 h-14 rounded-full text-pink-500 bg-pink-100 dark:bg-pink-900 dark:bg-opacity-40 relative text-center">
              <BiCart3 />
            </div> */}
            <h2 className="self-center text-3xl">421</h2>
          </div>
          <div className="px-6 pb-6">
            <a className="hover:text-indigo-500 text-sm" href="#">
              View more...
            </a>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default DashboardComponent;
