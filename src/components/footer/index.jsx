import React from "react";
import { FaTelegram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="  tw-bg-[#111113]">
        <div className="container  tw-py-8">
          <div className="row">
            <div className="col-md-8 mx-auto">
            <div className=" tw-text-center">
           
              <h2 className=" tw-text-center tw-font-poppins tw-text-white">Don't miss out, Stay updated</h2>
             
            </div>
              <p className=" sm:tw-text-xl tw-text-sm tw-text-white tw-pt-6 tw-text-center">
                
              BitPakon is a decentralized platform built on the Du blockchain, designed to enable instant deposits and withdrawals of your earnings. With BitPakon, your investments are managed with a focus on minimizing risk and loss.
              </p>
              <ul className=" tw-pt-3 tw-p-0 tw-flex   tw-justify-center tw-gap-2 tw-items-center">
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/facebook.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/twitter.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/instagram.png")} />
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" tw-w-full tw-text-center  tw-bg-button-gradient2">
        <p className=" tw-py-2.5  tw-font-poppins tw-font-semibold tw-text-md tw-m-0 tw-text-black">
        Copyright © 2024 All rights reserved by BitPakon.
        </p>
      </div>
    </div>
  );
};

export default Footer;
