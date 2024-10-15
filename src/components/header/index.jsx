import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

import { FaAngleDown } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import Button from "../Button";
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";


import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useContractReads, useContractWrite } from "wagmi";


const Header = () => {

  
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();


  const navigate = useNavigate();

  const location = useLocation();
  const isActive = (route) => location.pathname.includes(route);

  const handleNavigate = (path, sectionId) => {
    navigate(path);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };
  const [scrollBackground, setScrollBackground] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollBackground(true);
      } else {
        setScrollBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav  className={`tw-top-0 tw-w-full  tw-z-50   ${
      scrollBackground ? "  tw-fixed tw-bg-black  sm:tw-bg-transparent" : ""
    } sm:tw-relative md:tw-sticky`}>
      <div className="tw-flex tw-items-center tw-font-medium tw-h-32 container tw-mx-auto tw-justify-between">
        <div className="">
          <img
            src={require("../../assets/images/logo.png")}
            className="tw-object-contain sm:tw-w-[80px] tw-w-16"
            alt="Logo"
          />
        </div>

        
        <div className="">
          <Button
            onClick={() => open()}
            Icons={<img src={require('../../assets/images/wallet.png')} />}
            label={isConnected? address.slice(0, 5) + "..." + address.slice(38, 42) : "Connect Wallet"}
          />
        </div>

    
      </div>
    </nav>
  );
};

export default Header;
