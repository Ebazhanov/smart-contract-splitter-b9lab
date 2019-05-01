pragma solidity >=0.4.21 <0.6.0;

import {Toggled} from "./Toggled.sol";
import "./SafeMath.sol";

contract Splitter is Toggled {

    using SafeMath for uint;
    mapping(address => uint) private balances;

    event LogEthSplitted(
        address indexed from,
        address indexed user1,
        address indexed user2,
        uint initialAmount
    );

    event LogEthWithdrawal(
        address indexed to,
        uint amount
    );

    function splitEth(address user1, address user2) public payable isActive {
        require(user1 != address(0), "Address of 'user1' cannot be empty");
        require(user2 != address(0), "Address of 'user2' cannot be empty");
        require(msg.value != 0, "Message value cannot be 0");
        require((msg.value % 2) == 0, "Message value must be even");
        uint amount = msg.value / 2;
        balances[user1] += amount;
        balances[user2] += amount;
        emit LogEthSplitted(msg.sender, user1, user2, msg.value);
    }

    function withdraw() public {
        uint amount = balances[msg.sender];
        require(amount > 0, "No balance available");
        balances[msg.sender] = 0;
        emit LogEthWithdrawal(msg.sender, amount);
        msg.sender.transfer(amount);
    }

    function() external {
        revert();
    }

}
