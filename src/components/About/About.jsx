import React from "react";
const About = ({withdrawList,Allinvestment}) => {
  return (
    <div id="aboutSection" className="  container  tw-py-20">
      <h1 className=" tw-pl-8 gradient-text tw-font-bold tw-text-center">
        History
      </h1>
      <div className="tw-overflow-x-auto tw-mt-6 tw-h-96 tw-overflow-y-auto">
        <table className="tw-min-w-full tw-mb-0 ">
          <thead className="text-center tw-border-b tw-border-[#456DA7] tw-rounded-tl-xl tw-bg-button-gradient2">
            <tr className="tw-rounded-tl-xl tw-whitespace-nowrap">
              <th
                scope="col"
                className=" tw-text-black   tw-font-poppins tw-px-6 tw-py-4"
              >
                Sr.No
              </th>
              <th
                scope="col"
                className="tw-text-black  tw-font-poppins  tw-px-6 tw-py-4"
              >
                ACTION
              </th>
              <th
                scope="col"
                className=" tw-text-black  tw-font-poppins  tw-px-6 tw-py-4"
              >
                AMOUNT
              </th>
              <th
                scope="col"
                className="tw-text-black  tw-font-poppins  tw-px-6 tw-py-4"
              >
                TIME
              </th>
              <th
                scope="col"
                className="tw-text-black  tw-font-poppins  tw-px-6 tw-py-4"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            <>
            {Allinvestment.map((item,index)=>{

              <tr className="tw-bg-[#101012] tw-rounded-md">
                <td className="tw-align-middle   tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-white tw-font-poppins">01</span>
                </td>
                <td className="tw-align-middle   tw-font-medium tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-white tw-font-poppins">
                    Invest
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-white tw-font-poppins">${Number(item[0])}</span>
                </td>
                <td className="tw-align-middle tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-white tw-font-poppins">
                  {item[2]}
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-white tw-font-poppins">
                    complete
                  </span>
                </td>
              </tr>

            })}

            {withdrawList.map((item,index)=>{

            <tr className="tw-bg-[#101012] tw-rounded-md">
              <td className="tw-align-middle   tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                <span className=" tw-text-white tw-font-poppins">01</span>
              </td>
              <td className="tw-align-middle   tw-font-medium tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                <span className=" tw-text-white tw-font-poppins">
                  withdraw
                </span>
              </td>
              <td className="tw-align-middle  tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                <span className=" tw-text-white tw-font-poppins">${Number(item[2])}</span>
              </td>
              <td className="tw-align-middle tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                <span className=" tw-text-white tw-font-poppins">
                {item[3]}
                </span>
              </td>
              <td className="tw-align-middle  tw-font-medium  tw-px-6 tw-py-5 tw-whitespace-nowrap tw-text-center">
                <span className=" tw-text-white tw-font-poppins">
                  {item[3]==true?("complete"):("Under Processing")}
                </span>
              </td>
            </tr>

            })}
              
            </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
