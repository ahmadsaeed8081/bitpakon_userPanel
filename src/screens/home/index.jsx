import React, { useState, useEffect } from "react";
import Hero from '../../components/hero';
import Brands from '../../components/Brands';
import Footer from '../../components/footer';
import About from '../../components/About/About';


import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  poly_cont_address,
  du_cont_address,

  poly_cont_abi,
  du_cont_abi,

  tokenABI,
  usdt_address
  
} from "../../../src/components/config";
import Web3 from "web3";
import { useLocation } from "react-router-dom";

// import { CopyIcon, RocketIcon2 } from "../../assets/Icons";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction, usePublicClient } from 'wagmi'
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'


const Home = () => {

  const { address, isConnecting ,isDisconnected} = useAccount()
  const { chain } = useNetwork()


  const [loader, setLoader] = useState(false);
  const [investment, setInvestment] = useState("");
  const [curr_time, set_curr_time] = useState(0);
  const [total_withdraw_reaward, set_total_withdraw_reaward] = useState(0);
  const [withdraw_Amount, set_withdraw_Amount] = useState("0");



  const [totlaInvestment, setTotalInvestment] = useState(0);
  const [totalEarning, set_totalEarning] = useState(0);
  const [levelEarning, set_levelEarning] = useState([]);
  const [refCount, set_refCount] = useState([]);

  const [directs, set_directs] = useState("0");
  const [RoiEarning, set_RoiEarning] = useState(0);
  const [pol_balance, setBalance] = useState(0);
  const [du_balance, set_DUBalance] = useState(0);

  const [usdt_balance, set_usdtBalance] = useState(0);

  const [minimum_investment, set_minimum_investment] = useState(0);
  const [minWithdraw, set_minWithdraw] = useState(0);
  const [withdrawFee, set_withdrawFee] = useState(0);

  const [maxWithdraw, set_maxWithdraw] = useState(0);

  const [Allinvestment, set_Allinvestment] = useState([]);
  const [withdrawList, setwithdrawList] = useState([]);
  const [availBalance, set_availBalance] = useState(0);

  const [totalbusiness, setbusiness] = useState("0");
  const [totalReferralsEarning, settotalReferralsEarning] = useState(0);

  const [referral, setReferral] = useState("0x0000000000000000000000000000000000000000");


  const [state, setState] = useState({
    days: 0,
    minutes: 0,
    hours: 0,
    seconds: 0,
    time_up: "",
    // bid_time: selectedAmount,
  });

  const poly_CHAIN_ID = "137";
  const du_CHAIN_ID = "10523";



  useEffect(() => {
    if(address)
    {
      mount();

    }
  }, [ address]);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("ref");

  const count = (_deadline) => {
    console.log("here is deadine "+_deadline)
    var now = new Date().getTime();
    _deadline = Number(_deadline) * 1000;
    var t;
    if ( Number(now) <  Number(_deadline)) {
      t = Number(_deadline) - Number(now);
      console.log(" its count " + _deadline + "   " + now + "   " + t);
      // console.log(deadline)
      var dd = Math.floor(t / (1000 * 60 * 60 * 24));
      var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var ss = Math.floor((t % (1000 * 60)) / 1000);

      var days = dd < 10 ? "0" + dd : dd;
      var hours = hh < 10 ? "0" + hh : hh;
      var minutes = mm < 10 ? "0" + mm : mm;
      var seconds = ss < 10 ? "0" + ss : ss;


      if (days > 0) {
        return Number(days)+1 + " days";
      } else if (hours > 0) {
        return Number(hours)+1 + " hours";
      } else if (minutes > 0) {
        return Number(minutes)+1 + " minutes";
      } else {
        return Number(seconds)+1 + " seconds";
      }
    } else {
      return "Expired";
    }
  };


const {
  data: stakeResult,
  isLoading: isLoading_stake,
  isSuccess: stakeSuccess,
  write: Investing,
} = useContractWrite({
  address: poly_cont_address,
  abi: poly_cont_abi,
  functionName: 'invest',
  args: [Number(investment)*10**6,referral],
  onSuccess(data) {
    mount();
    console.log('Success', data)
  },
});






const { config: usdtConfig } = usePrepareContractWrite({
  address: usdt_address,
  abi: tokenABI,
  functionName: "approve",
  args: [poly_cont_address,Number(investment*10**6)],
});







const {
  data: data_usdt,
  isLoading: isLoading_usdt,
  isSuccess: isSuccess_usdt,
  write: usdt_approval,
} = useContractWrite(usdtConfig);

const { config:claimRewardConfig } = usePrepareContractWrite({
  address: du_cont_address,
  abi: du_cont_abi,
  functionName: 'withdrawEarning',
  args: [address,Convert_To_Wei(Number(totalEarning)/10**6),Convert_To_Wei(Number(withdraw_Amount)),"12345"],
  value: Convert_To_Wei((Number(withdraw_Amount) * Number(withdrawFee))/100)
})
const { data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdraw } = useContractWrite(claimRewardConfig)




const { chains, error, isLoading, pendingChainId, switchNetwork:reward_switch } =
useSwitchNetwork({
  chainId: du_CHAIN_ID,
  onSuccess(){

    withdraw?.()
  }

})

const {switchNetwork:stake_switch } =
useSwitchNetwork({
  chainId: poly_CHAIN_ID,
  onSuccess(){

    usdt_approval?.();

  }

})



  const waitForTransaction = useWaitForTransaction({
    hash: data_usdt?.hash,
    onSuccess(data) {
      Investing?.();
      console.log("Success", data);
    },
  });




const waitForTransaction3 = useWaitForTransaction({
  hash: stakeResult?.hash,
  onSuccess(data) {
    mount();
    console.log("Success", data);
  },
});

const waitForTransaction2 = useWaitForTransaction({
  hash: stakeResult_withdrawReward?.hash,
  onSuccess(data) {
    mount();
    console.log("Success", data);
  },
});



  function Convert_To_Wei(val) {
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-bor-rpc.publicnode.com"));
  
    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }
  async function mount() {
    if (isDisconnected) {
      return;
    }
    try {
      // setLoader(true)

      //polygon contract data
      let web3= new Web3(new Web3.providers.HttpProvider("https://polygon-bor-rpc.publicnode.com	"));
      const pol_balance = await web3.eth.getBalance(address);

      const contract = new web3.eth.Contract(poly_cont_abi, poly_cont_address);
      const contract_usdt = new web3.eth.Contract(tokenABI, usdt_address);

      let usdt_balance = await contract_usdt.methods.balanceOf(address).call();
      let arr = await contract.methods.get_totalEarning(address).call();

      let Level_count = await contract.methods.Level_count(address).call();
      const business = await contract.methods.totalbusiness().call();
      const user = await contract.methods.user(address).call();
      const allInvestments = await contract.methods.getAllinvestments().call({ from: address.toString() });
      let minimum_investment = await contract.methods.minimum_investment().call(); 
      const curr_time = await contract.methods.get_currTime().call(); 



      console.log("pol done" );

      //DU contract data

      web3= new Web3(new Web3.providers.HttpProvider("https://mainnet-rpc.dscscan.com/"));

      const du_balance = await web3.eth.getBalance(address);
      const contract1 = new web3.eth.Contract(du_cont_abi, du_cont_address);
      const user1 = await contract1.methods.user(address).call();
      const Minimum_withdraw_limit = await contract1.methods.Minimum_withdraw_limit().call();
      const Maximum_withdraw_limit = await contract1.methods.Maximum_withdraw_limit().call();

      const withdrawFee = await contract1.methods.withdrawFee().call();

      const OrdersList = await contract1.methods.get_userOrders().call();

      if (id != null) {

        setReferral(id);

      }
      set_DUBalance(du_balance)
      setBalance(pol_balance);
      set_usdtBalance(usdt_balance);
      setTotalInvestment(user[2])
      set_curr_time(curr_time);
      set_availBalance((Number(arr.total_earning)/10**6) - (Number(user1)/10**18));
      set_minimum_investment(minimum_investment);
      set_total_withdraw_reaward(user1);
      setbusiness(business);
      settotalReferralsEarning(user[7])
      set_directs(user[6])
      set_totalEarning(Number(arr.total_earning))
      set_levelEarning(arr.levelEarning);
      set_RoiEarning(Number(arr.roi_earning))
      set_refCount(Level_count);
      set_minWithdraw(Minimum_withdraw_limit)
      set_maxWithdraw(Maximum_withdraw_limit)
      set_withdrawFee(Number(withdrawFee)/10**18)
      setwithdrawList(OrdersList)
      set_Allinvestment(allInvestments)
      console.log("du done");




    } catch (error) {
      // Catch any errors for any of the above operations.

      console.error(error);
    }
  }




  

  async function Invest() {
    if (isDisconnected) {
      alert("kindly connect your wallet");
      return

    }
    if (investment <= 0 || investment == "") {
      alert("please write amount ");
      return
    }

    if (Number(usdt_balance) < Number(investment)*10**6) {
      alert("you dont have enough usdt to invest");
      return;
    } 

    if (Number(investment*10**6) < Number(minimum_investment)) 
    {
      alert("you can't stake less than " + Number(minimum_investment)/10**6 + " USDT");
      return;
    }

    if (chain.id != poly_CHAIN_ID) {
      stake_switch?.();
    } else {

      usdt_approval?.()
    }





  }

  async function WithdrawReward() {

        if (isDisconnected) {
          alert("kindly connect your wallet");
          return;
    
        }
        if (Number(withdraw_Amount) <= 0 || Number(withdraw_Amount) == "") {
          alert("please write amount ");
          return
        }
        if (Number(withdraw_Amount) < Number(minWithdraw)/10**18) {
          alert("You can't withdraw less than "+Number(minWithdraw)/10**18);
          return
        }
        if (Number(withdraw_Amount) > Number(maxWithdraw)/10**18) {
          alert("You can't withdraw more than "+Number(maxWithdraw)/10**18);
          return
        }
        if (Number(totalEarning)==0) {
          alert("You don't have earning to withdraw");
          return;
        }
        if (Number(withdraw_Amount) > Number(availBalance)) {
          alert("you cant withdraw more than your current balance");
          return;
        }
        if ((Number(withdraw_Amount) * Number(withdrawFee)/100) > Number(du_balance)/10**18) {
          alert("you Dont have enough du to pay withdraw fee ");
          return;
        }
        

        if (chain.id != du_CHAIN_ID) {
          reward_switch?.();
        } else {
          console.log("object withdraw "+withdraw_Amount);

          withdraw?.()
        }

  }




  return (
    <div className=' tw-overflow-x-hidden'>
      <Hero withdrawFee={withdrawFee} availBalance={availBalance} du_balance={du_balance} RoiEarning={RoiEarning} directs={directs} levelEarning={levelEarning} total_withdraw_reaward={total_withdraw_reaward} totalReferralsEarning={totalReferralsEarning} withdraw_Amount={withdraw_Amount} setInvestment={setInvestment}  minimum_investment={minimum_investment}  Invest={Invest} set_withdraw_Amount={set_withdraw_Amount}  WithdrawReward={WithdrawReward} investment={investment} totlaInvestment={totlaInvestment} totalEarning={totalEarning} address={address}/>
      
        <div className='   tw-z-30 tw-px-5 tw-relative'>
        <div  className=' tw-text-center'>
          <h1 className=" tw-pl-8 gradient-text tw-font-bold tw-text-center">
            Level Reward
          </h1>
        </div>

      <Brands refCount={refCount} levelEarning={levelEarning} />

      <div className=" tw-absolute tw-left-0  tw-bottom-[30%]">
        <img src={require("../../assets/images/WhiteBluePinkLeft.png")} className=" sm:tw-w-44 tw-w-36" alt="" />
      </div>

      <div className=" tw-absolute tw-left-20 tw-bottom-[100%] ">
        <img
          src={require("../../assets/images/heroLeft.png")}
          className="  tw-w-36"
          alt=""
        />
        
      </div>
    </div>
      
      <About Allinvestment={Allinvestment} withdrawList={withdrawList} />
      <Footer/>
    </div>
  );
};

export default Home;