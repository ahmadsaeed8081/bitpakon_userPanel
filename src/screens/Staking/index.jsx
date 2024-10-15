import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";


const Staking = (props) => {

  const [ROI, set_ROI] = useState(0);
  const [Expected_return, set_Expected_return] = useState(0);
  const [withdrawFee, set_withdrawFee] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const dropdownRef2 = useRef(null);


  const [isOpen3, setIsOpen3] = useState(false);
  const dropdownRef3 = useRef(null);



  const [isOpen4, setIsOpen4] = useState(false);
  const dropdownRef4 = useRef(null);



  



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsOpen2(false);
      }
      if (
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target)
      ) {
        setIsOpen3(false);
      }

      if (
        dropdownRef4.current &&
        !dropdownRef4.current.contains(event.target)
      ) {
        setIsOpen4(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  function cal_after_withdraw(_withdraw_Amount) 
  {
    ;
    
  }


  function find_Exp_earn(amount) {

    if (Number(amount) >= Number(props.minimum_investment) && amount < 100) {
      return (amount / 100) * 0.8 * 375;
    } else if (amount >= 100 && amount < 1000) {
      return (amount / 100) * 0.8 * 375;
    } else if (amount >= 1000 && amount < 10000) {
      return (amount / 100) * 0.8 * 375;
    } else if (amount >= 10000) {
      return (amount / 100) * 0.8 * 375;
    }
    return 0;

  }

  function find_Roi(amount) {
    if (Number(amount) >= Number(props.minimum_investment) && amount < 100) {
      // alert("amount "+ amount+"   "+"minim "+ minimum_investment)
      return  1.2;
    } else if (amount >= 100 && amount < 1000) {
      return 1.2 ;
    } else if (amount >= 1000 && amount < 10000) {
      return 1.2;
    } else if (amount >= 10000) {
      return 1.2 ;
    }
    return 0;
  }






  const defaultTab = "Invest";

  const tabData = [
    {
      title: "Invest",
      content: (
        <>
          <div className=" tw-bg-[#101012] tw-pt-4 tw-rounded-md">
            <div className="tw-flex sm:px-5 tw-px-3 tw-py-5 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
            <p className="tw-m-0  tw-text-white sm:tw-text-2xl tw-text-lg tw-font-bold">
                Stake Token & get upto  <span className=" tw-text-[#E5BE38]">300%</span> APY
              </p>
              <div>
              <img src={require("../../assets/images/c5.png")} />
              </div>
              
            </div>

          

            <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 sm:tw-p-6 tw-p-5  tw-py-10">
              <div className="tw-flex tw-flex-col tw-gap-4">
            
                <div>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-white">
                      Investment Amount
                    </p>
                  </div>
                  <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef2}
                  >
                    <button
                      
                      className=" tw-border-textColor tw-bg-white tw-flex tw-items-center tw-justify-between tw-border tw-w-full tw-text-black tw-py-3 tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      
                      <input
                        className=" tw-w-full  tw-text-textColor tw-font-poppins  placeholder:tw-text-textColor tw-bg-transparent  tw-outline-none"
                        type="number"
                        value={props.investment}
                        onChange={(e) => {
                          props.setInvestment(e.target.value);
                          set_ROI(find_Roi(e.target.value));
                          set_Expected_return(find_Exp_earn(e.target.value));
                        }}
                        placeholder="0"
                        min={props.minimum_investment}
                      />
                     
                    </button>
                   
                  </div>

                  <div className="tw-flex tw-pt-14 tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-white">
                      Plan Duration
                    </p>
                    <p className=" tw-text-white tw-font-poppins tw-text-sm">375 Days</p>
                  </div>
                  <div className="tw-flex  tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-white">
                      Expected Return
                    </p>
                    <p className=" tw-text-white tw-font-poppins tw-text-sm">{Expected_return} USDT</p>
                  </div>
                </div>
              </div>

              <div>
                <Button onClick={() => props.Invest()} label={"Invest"} className={"tw-w-full  tw-text-black   tw-font-medium tw-font-poppins"} />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Withdraw Earning",
      content:(
        <>
        <div className=" tw-bg-[#101012] tw-pt-4 tw-rounded-md">
            <div className="tw-flex sm:px-5 tw-px-3 tw-py-5 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
            <p className="tw-m-0  tw-text-white sm:tw-text-2xl tw-text-lg tw-font-bold">
                Withdraw  <span className=" tw-text-[#E5BE38]">Earning</span> Stake BPN Token
              </p>
              <div>
              <img src={require("../../assets/images/c5.png")} />
              </div>
              
            </div>

          

            <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 sm:tw-p-6 tw-p-5 tw-py-10">
              <div className="tw-flex tw-flex-col tw-gap-4">
            
                <div>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-white">
                      Withdraw Amount
                    </p>
                  </div>
                  <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef2}
                  >
                    <button
                      
                      className=" tw-border-textColor tw-bg-white tw-flex tw-items-center tw-justify-between tw-border tw-w-full tw-text-black tw-py-3 tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      
                      <input 
                      className=" tw-w-full  tw-text-textColor tw-font-poppins  placeholder:tw-text-textColor tw-bg-transparent  tw-outline-none" 
                      placeholder="" 
                      value={props.withdraw_Amount}
                      onChange={(e) => {
                        props.set_withdraw_Amount(e.target.value);
                        set_withdrawFee((Number(e.target.value) * Number(props.withdrawFee))/100);

                      }}
                      />
                     
                    </button>
                   
                  </div>

                  <div className="tw-flex tw-pt-14 tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-white">
                    Withdraw Fee (6%)

                    </p>
                    <p className=" tw-text-white tw-font-poppins tw-text-sm">{Number(withdrawFee)} DU</p>
                  </div>
                  <div className="tw-flex  tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-white">
                    Available balance

                    </p>
                    <p className=" tw-text-white tw-font-poppins tw-text-sm">{props.availBalance?Number(props.availBalance):0} BPN</p>
                  </div>
                  <div className="tw-flex  tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  tw-text-white">
                    Total Withdraw

                    </p>
                    <p className=" tw-text-white tw-font-poppins tw-text-sm">{props.total_withdraw_reaward?Number(props.total_withdraw_reaward)/10**18:0} BPN</p>
                  </div>
                  
                </div>
              </div>

              <div>
                <Button onClick={() => props.WithdrawReward()}  label={"withdraw"} className={"tw-w-full  tw-text-black   tw-font-medium tw-font-poppins"} />
              </div>
            </div>
          </div>
      </>
      ),
    },
   
  ];

  return (
    <div className="tw-bg-center  tw-relative  tw-bg-cover tw-w-full tw-h-auto">
      
      <div className="container md:tw-py-24 tw-py-3">
        <div className="row tw-items-center">
          <div className="col-lg-12 col-md-12 tw-mx-auto">
            <div className="mx-auto mt-8  mb-24">
              <Tabs tabs={tabData} defaultTab={defaultTab} />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Staking;
