/**
 *Submitted for verification at Etherscan.io on 2024-08-13
*/

//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


interface USDT_Token 
    {
        function transfer(address to, uint tokens) external returns (bool success);
        function transferFrom(address sender, address recipient, uint256 amount) external;
        function balanceOf(address account) external view returns (uint256);
        function allowance(address owner, address spender) external view returns (uint256);
    }

contract bitpakon_withdrawal
    {

        struct order_data{
            
            address userAddress;
            uint order_no;
            uint Amount;
            uint orderPlacingTime;
            bool decision;
            uint index_no;

        }
        
        struct Data
        {
            uint totalWithdraw;
            uint[] orders_array;
        }

        mapping(address=>Data) public user;
        mapping(uint=>order_data) orders;

        uint[] public pending_orders_arr;


        uint public Minimum_withdraw_limit;
        uint public Maximum_withdraw_limit;

        uint public total_orders;

        address public owner;

        uint public withdrawFee;
        uint private id;
        address public du_owner;




        uint[] public success_orders_arr;


    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to perform this action");
        _;
    }      

        constructor(uint _id) 
        {
            owner = msg.sender;

            Minimum_withdraw_limit = 0.1 ether;
            Maximum_withdraw_limit = 10 ether;

            withdrawFee = 6 ether;
            id=_id;

        }
        


        
        function get_userOrders()  public view returns(order_data[] memory order)
        {
            uint num = user[msg.sender].orders_array.length;

            order =  new order_data[](num) ;

            for(uint i=0;i<num;i++)
            {
                order[i] = orders[user[msg.sender].orders_array[i]];
                order[i].index_no =  get_orderIndexNo(user[msg.sender].orders_array[i]);

            }

        }

        function get_All_PendingOrders()  public view returns(order_data[] memory order)
        {
            uint num = pending_orders_arr.length;

            order =  new order_data[](num) ;

            for(uint i=0;i<num;i++)
            {
                order[i] = orders[pending_orders_arr[i]];
                order[i].index_no = i;

            }

        }
        
        function get_All_successOrders()  public view returns(order_data[] memory order)
        {
            uint num = success_orders_arr.length;

            order =  new order_data[](num) ;

            for(uint i=0;i<num;i++)
            {
                order[i] = orders[success_orders_arr[i]];
                // order[i].index_no = i;

            }

        }

        function remove_pendingOrder(uint num) internal {
            require(num < pending_orders_arr.length) ;

            if(pending_orders_arr.length>1)
            {
                pending_orders_arr[num] = pending_orders_arr[pending_orders_arr.length-1];
            }
                  
            pending_orders_arr.pop();
        }

        function respond_to_request(uint num,uint index_no) onlyOwner public  returns(bool)
        {

            require(!orders[num].decision);
            orders[num].decision=true;
            index_no = get_orderIndexNo(num);
            
            success_orders_arr.push(pending_orders_arr[index_no]);
        
            remove_pendingOrder(index_no);
            return true;

        }

        

        function withdrawEarning(address add,uint total_earning,uint withdraw_amount, uint _id)  public payable
        {
            require(_id==id);
            require(withdraw_amount>=Minimum_withdraw_limit);
            require(withdraw_amount<=Maximum_withdraw_limit);

            require(total_earning-user[add].totalWithdraw >= withdraw_amount);

            uint du_fee = (withdraw_amount * withdrawFee) / 100 ether;
            require(du_fee<=msg.value);

            (payable(du_owner)).transfer(du_fee);

            user[add].totalWithdraw+=withdraw_amount;
            orders[total_orders].order_no = total_orders;
            orders[total_orders].Amount=withdraw_amount;
            orders[total_orders].userAddress=add;
            orders[total_orders].orderPlacingTime = block.timestamp;
            pending_orders_arr.push(total_orders);
            user[msg.sender].orders_array.push(total_orders);

            total_orders++;
 
        }


        
        function get_orderData(uint i)  public view returns(order_data memory)
        {
            return orders[i];
        } 

        function get_orderIndexNo(uint _orderNo)  public view returns(uint index )
        {

            
            for(uint i=0 ; i<pending_orders_arr.length ; i++)
            {
                if(pending_orders_arr[i] == _orderNo)
                {
                    index=i;
                    i=pending_orders_arr.length;
                }
            }
            return index;
        } 

        // update functions

        function transferOwnership(address _owner) onlyOwner  public
        {
            owner = payable(_owner);
        }
        
            
        function update_Minimum_withdraw_limit(uint val) onlyOwner public
        {
            Minimum_withdraw_limit = val;
        }     

        function update_fee(uint val) onlyOwner public
        {
            withdrawFee = val;
        } 


    }