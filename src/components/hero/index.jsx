import React, { useState } from "react";
import Header from "../header";
import Staking from "../../screens/Staking";
import { GoCopy } from "react-icons/go";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Hero = (props) => {
// refCount={refCount} availBalance={availBalance} du_balance={du_balance} RoiEarning={RoiEarning} directs={directs} levelEarning={levelEarning} total_withdraw_reaward={total_withdraw_reaward} totalReferralsEarning={totalReferralsEarning} withdraw_Amount={withdraw_Amount} setInvestment={setInvestment}  minimum_investment={minimum_investment}  Invest={Invest} set_withdraw_Amount={set_withdraw_Amount}  WithdrawReward={WithdrawReward} investment={investment} totlaInvestment={totlaInvestment} totalEarning={totalEarning} address={address}
  return (
    <div className="   tw-bg-cover tw-relative tw-bg-center tw-w-full tw-h-auto">
      <Header />

      <div className="container tw-relative  tw-pb-44 sm:tw-pt-20 tw-pt-5">
        
        <div className="row tw-items-center">
          <div className="col-lg-6">
           <div className=" row">
            <div className=" col-md-12 tw-mx-auto">
            <Staking withdrawFee={props.withdrawFee} set_withdraw_Amount={props.set_withdraw_Amount} availBalance={props.availBalance} withdraw_Amount={props.withdraw_Amount} setInvestment={props.setInvestment}  minimum_investment={props.minimum_investment} Invest={props.Invest}  total_withdraw_reaward={props.total_withdraw_reaward} WithdrawReward={props.WithdrawReward} investment={props.investment} address={props.address}
/>
            </div>
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className=" row  g-4">
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-[#EFF3A1] tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="   tw-text-white tw-font-poppins">
                    Total Investment
                  </h6>
                  <span className="  tw-text-white tw-font-poppins tw-text-lg">
                    {" "}
                    {Number(props.totlaInvestment)/10**6}
                  </span>
                </div>
              </div>
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-[#EFF3A1] tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-white  tw-font-poppins">
                    Total Earning
                  </h6>
                  <span className="  tw-text-white tw-font-poppins tw-text-lg">
                    {" "}
                    {Number(props.totalEarning)/10**6}

                  </span>
                </div>
              </div>
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-[#EFF3A1] tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-white  tw-font-poppins">
                    ROI Earning
                  </h6>
                  <span className="  tw-text-white tw-font-poppins tw-text-lg">
                    {" "}
                    {Number(props.RoiEarning)/10**6}
                    {/* {Number(props.availBalance)} */}

                  </span>
                </div>
              </div>
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-[#EFF3A1] tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="   tw-text-white tw-font-poppins">
                    Total Direct Income
                  </h6>
                  <span className="  tw-text-white tw-font-poppins tw-text-lg">
                    {" "}
                    {Number(props.totalReferralsEarning)/10**6}
                  </span>
                </div>
              </div>
              <div className=" col-md-12">
                <div className=" tw-border  tw-border-[#EFF3A1] tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-white  tw-font-poppins tw-flex tw-gap-3 tw-items-center">
                    My Link 
                    
                    <CopyToClipboard text={`${window.location.host}?ref=${props.address}`} >
                    <GoCopy size={23} color="#fff" />
                    </CopyToClipboard> 
                  </h6>
                  <span className="  tw-text-[#EFF3A1] tw-font-poppins tw-text-lg">
                    {window.location.host} /?ref={props.address == null
                        ? "..."
                        : props.address.toString().slice(0, 4) + "..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" tw-absolute tw-right-0 tw-z-10  tw-top-0">
        <img src={require("../../assets/images/WhiteBluePink.png")} alt=""  className=" tw-w-[500px]" />
      </div>



      <div className=" tw-absolute  tw-hidden  md:tw-block tw-right-20 tw-top-44">
        <img
          src={require("../../assets/images/hero_right.png")}
          className="   tw-w-40"
          alt=""
        />
      </div>




     
     
    </div>
  );
};

export default Hero;
