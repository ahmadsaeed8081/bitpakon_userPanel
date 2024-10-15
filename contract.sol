//SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface USDT{
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    }
contract Bitpakon
    {

        struct allInvestments{

            uint investedAmount;
            uint expire_Time;
            uint DepositTime;  
            uint investmentNum;
            uint category;
            uint roi;


        }
        struct ref_data
        {

            uint reward;
            uint count;     
            bool is_unlocked;
            uint unlock_time;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        }

        struct daily_data
        {

            uint max_roi;
            uint directIncome;
            uint[] investmentNo_arr;

        }

        struct Data{

            mapping(uint=>allInvestments) investment;
            mapping(uint=>ref_data) referralLevel;
            mapping(uint=>daily_data) day;

            address[] myReferrals;
            address referralFrom;
            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
            uint curr_activeLevel;
            uint total_directs;
            uint total_directIncome;
            uint total_roi;


        }
        
        uint public minimum_investment=20000000;
        address public usdt_address=0x341343568948459e5b7017eDDb05110cfA3EF699;


        address owner;
        uint public totalbusiness; 
        uint public investmentPeriod=375 days;
        uint public time_divider = 1 minutes;

        uint public launch_date;
        uint public totalusers;

        uint public perday_RewPercentage;
        mapping(uint=>address) public All_investors;
        mapping(address=>Data) public user;

        uint[10] public levelpercentage=[10,7,5,3,2,1,1,1,1,2];


    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to perform this action");
        _;
    }      

     constructor()
     {
        owner=msg.sender;
        launch_date=block.timestamp;
        perday_RewPercentage=800000;
    
    }

       function invest(uint _investedamount,address _referral) external  returns(bool)
       {
            require(_investedamount>=minimum_investment,"you cant invest less than minimumum investment");

            uint num = user[msg.sender].noOfInvestment;
            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].category = perday_RewPercentage;
            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].expire_Time=block.timestamp + investmentPeriod ;  // 60 days
            user[msg.sender].day[get_curr_day()].max_roi += _investedamount*10/100;
            user[msg.sender].investment[num].investmentNum=num;
            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;
            user[msg.sender].total_roi+=_investedamount*10/100;
            user[msg.sender].investment[num].roi = user[msg.sender].total_roi;

            address temp;
            USDT(usdt_address).transferFrom(msg.sender,owner,_investedamount);

            if(user[msg.sender].investBefore == false)
            {  

                All_investors[totalusers]=msg.sender;
                totalusers++;   

                if(_referral==address(0) || _referral==msg.sender)                                         
                {

                    user[msg.sender].referralFrom = address(0);
                }
                else
                {

                    user[msg.sender].referralFrom = _referral;
                    user[_referral].myReferrals.push(msg.sender);
                    
                    user[_referral].total_directs++;

                    temp = user[msg.sender].referralFrom;
                    (uint totalEarning,,) = get_totalEarning( temp );

                    if((totalEarning + ((_investedamount * 7) / 100) ) > user[temp].total_roi)
                    {
                        uint direct =  user[temp].total_roi - totalEarning;
                        user[temp].day[get_curr_day()].directIncome+= direct;
                        user[temp].total_directIncome += direct;
                    }
                    else
                    {
                        user[temp].day[get_curr_day()].directIncome += ((_investedamount * 7) / 100);
                        user[temp].total_directIncome += ((_investedamount * 7) / 100);
                    }

                    if(user[_referral].total_directs%2 ==0 && user[_referral].curr_activeLevel<12)
                    {
                        user[_referral].referralLevel[user[_referral].curr_activeLevel].is_unlocked = true;
                        user[_referral].referralLevel[user[_referral].curr_activeLevel].unlock_time = block.timestamp;

                        user[_referral].curr_activeLevel++;

                    }
                    
                }
                user[msg.sender].investBefore=true;

            }

            temp = user[msg.sender].referralFrom;

            for(uint k=0;k<10;k++)
            {

                if(temp!=address(0))
                {
                    user[temp].referralLevel[k].count++;
                    temp = user[temp].referralFrom;
                }
                else
                {
                    break;
                }
                
            }
            return true;
        }



        function getReward_perday(uint i,address add) view public returns(uint){ 
            uint rew;

                rew  = ((user[add].investment[i].investedAmount) * perday_RewPercentage)/100000000;
                return rew;
        }


        function Level_earning(address inv,uint day_no) public view returns( uint[10] memory arr1 )
        { 

            uint[10] memory levelRewards;

            uint calc_rew; 
            address[] memory direct_members = user[inv].myReferrals;
            uint next_member_count;

                for(uint j=0; j < 10;j++) //levels
                {
                    if(user[inv].referralLevel[j].is_unlocked)
                    {
                        for( uint k = 0;k < direct_members.length;k++) //members
                        {   

                            next_member_count+=user[direct_members[k]].myReferrals.length;
                            uint temp_amount = get_givenDay_roi( direct_members[k], day_no);
                            calc_rew +=  ((temp_amount * (levelpercentage[j]) ) / (100) );

                        }
                        levelRewards[j]=calc_rew;
                        calc_rew=0;

                        address[] memory next_members=new address[](next_member_count) ;

                        for( uint m = 0;m < direct_members.length;m++) //members
                        {   
                            for( uint n = 0; n < user[direct_members[m]].myReferrals.length; n++) //members
                            {   
                                next_members[calc_rew]= user[direct_members[m]].myReferrals[n];
                                calc_rew++;
                            }
                        }
                        direct_members=next_members; 
                        next_member_count=0;
                        calc_rew=0;


                    }
                    else
                    {
                        break;
                    }
                    
                }
            

                

            return levelRewards;
        }
        function get_givenDay_roi(address _add,uint day_no) public view  returns (uint roi_earning)
        {
            if(user[_add].investment[0].DepositTime>0)
            {

                uint start = (user[_add].investment[0].DepositTime - launch_date)/ time_divider;
                uint direct_earning;
                uint temp_roi_earning;
                uint max_roi;
                uint total_earning;

                for(uint i=start;i<=day_no;i++)
                {
                    
                    temp_roi_earning = 0;
                    direct_earning=0;
                    max_roi = get_max_roi( _add, i);
                    direct_earning += user[_add].day[i].directIncome;

                    if(total_earning + direct_earning > max_roi)
                    {
                        total_earning +=  (max_roi - total_earning);
                    }
                    else
                    {
                        total_earning += direct_earning;
                    }
                    if(i!=0)
                    {
                        for(uint j=0;j<user[_add].noOfInvestment;j++) // find ROI Earning
                        {
                            if(user[_add].investment[j].roi > total_earning)
                            {
                                uint inv_day=( user[_add].investment[j].DepositTime - launch_date) / time_divider;

                                if(inv_day<=i)
                                {
                                    temp_roi_earning += getReward_perday( j,_add);
                                }
                            }


                        }

                        if(total_earning + temp_roi_earning > max_roi)
                        {
                            uint temp=(max_roi - total_earning);
                            total_earning +=  temp;
                            roi_earning += temp;

                        }
                        else
                        {
                            total_earning+=temp_roi_earning;
                            roi_earning+=temp_roi_earning;
                        }

                        uint[10] memory temp_levelEarning = Level_earning(_add,i);

                        for(uint k=0;k<10;k++)
                        {
                                if(total_earning + temp_levelEarning[k] > max_roi)
                                {
                                    uint temp = max_roi - total_earning;
                                    total_earning +=  temp;

                                }
                                else
                                {
                                    total_earning+=temp_levelEarning[k];
                                }
                                
                        }

                    }
                    

                }

            }
            

        }

        function get_totalEarning(address _add) public view  returns (uint total_earning,uint[10] memory levelEarning,uint roi_earning)
        {
            if(user[_add].investment[0].DepositTime>0)
            {
                uint start = (user[_add].investment[0].DepositTime - launch_date)/ time_divider;
            
            uint end = (block.timestamp - launch_date)/ time_divider;
            uint direct_earning;
            uint temp_roi_earning;
            uint max_roi;
            
            for(uint i=start;i<=end;i++)
            {
                
                temp_roi_earning = 0;
                direct_earning=0;
                max_roi = get_max_roi( _add, i);
                direct_earning += user[_add].day[i].directIncome;

                if(total_earning + direct_earning > max_roi)
                {
                    total_earning +=  (max_roi - total_earning);
                }
                else
                {
                    total_earning += direct_earning;
                }
                if(i!=0)
                {
                    for(uint j=0;j<user[_add].noOfInvestment;j++) // find ROI Earning
                    {
                        if(user[_add].investment[j].roi > total_earning)
                        {
                            uint inv_day=( user[_add].investment[j].DepositTime - launch_date) / time_divider;

                            if(inv_day<=i)
                            {
                                temp_roi_earning += getReward_perday( j,_add);
                            }
                        }

                    }

                    if(total_earning + temp_roi_earning > max_roi)
                    {
                        uint temp=(max_roi - total_earning);
                        total_earning +=  temp;
                        roi_earning += temp;

                    }
                    else
                    {
                        total_earning+=temp_roi_earning;
                        roi_earning+=temp_roi_earning;
                    }

                    uint[10] memory temp_levelEarning = Level_earning(_add,i);

                    for(uint k=0;k<10;k++)
                    {
                            if(total_earning + temp_levelEarning[k]   > max_roi)
                            {
                                uint temp = max_roi - total_earning;
                                total_earning +=  temp;
                                levelEarning[k]+= temp;

                            }
                            else
                            {
                                total_earning+=temp_levelEarning[k];
                                levelEarning[k]+=temp_levelEarning[k];
                            }
                            
                    }

                }
                

            }

            }
            

        }

        function update_withdrawReward(uint _amount) onlyOwner external returns (bool success){

            user[msg.sender].totalWithdraw_reward+=_amount;
            return true;

        }

       function change_minimum_investment(uint _inv) onlyOwner external returns(bool)
       {
            require(msg.sender==owner,"only owner");
            require(_inv > 0);
            minimum_investment=_inv; 
            return true;

        }


        function change_investmentPeriod(uint _period) external returns(bool){
           require(_period > 0);
           investmentPeriod=_period * time_divider;
           return true;

        } 

        function getAllinvestments() public view returns (allInvestments[] memory hello) { 
            uint num = user[msg.sender].noOfInvestment;
            uint temp;
            uint currentIndex;
             
            for(uint i=0;i<num;i++)
            {
              if( user[msg.sender].investment[i].investedAmount > 0  ){
                  temp++;
              }

            }
         
            allInvestments[] memory Invested =  new allInvestments[](temp) ;

            for(uint i=0;i<num;i++)
            {
              if( user[msg.sender].investment[i].investedAmount > 0 ){
                  Invested[currentIndex]=user[msg.sender].investment[i];
                  currentIndex++;
              }

            }
            return Invested;

        }



        function Level_count(address add) public view returns( uint[] memory _arr )
        {
            uint[] memory referralLevels_count=new uint[](12);

            for(uint i=0;i<10;i++)
            {
                referralLevels_count[i] = user[add].referralLevel[i].count;
            }
            return referralLevels_count ;


        }

        // function TotalReferrals_inside(address investor) internal view returns(uint){ 
        //     return (user[investor].hisReferrals).length;
        // }

        function ReferralsList() public view returns(address[] memory){
           return user[msg.sender].myReferrals;
        }
  
        function transferOwnership(address _owner) onlyOwner public
        {
            owner = _owner;
        }


        function get_currTime() public view returns(uint)
        {
            return block.timestamp;
        }
        function withdrawFunds(uint _amount) onlyOwner public
        {
            uint bal = USDT(usdt_address).balanceOf(address(this));
            require(bal>=_amount,"you dont have funds");
            USDT(usdt_address).transfer(owner,_amount); 
        }

        function get_InvExp_Date(uint _num) public view returns(uint)
        {
            return user[msg.sender].investment[_num].expire_Time;
        }



        function get_curr_day() view public returns(uint curr_month)
        {
            curr_month = (block.timestamp - launch_date) / time_divider;

            return curr_month;

        }

        function get_max_roi(address _add,uint day_no) view public returns(uint)
        {
            uint start = (user[_add].investment[0].DepositTime - launch_date) / time_divider;
            
            uint roi;

            for(uint i=start;i<=day_no;i++)
            {
                roi+=user[_add].day[i].max_roi;
            }
            return roi;

        }

        function user_dayData(address add, uint day_no) public view returns(daily_data memory)
        {
            return user[add].day[day_no];

        }
        function test() public pure returns(uint )
        {
            return((100000000 * 7) / 100);

        }

        function user_investment(address add, uint i) public view returns(allInvestments memory )
        {
            return user[add].investment[i];

        }
    } 