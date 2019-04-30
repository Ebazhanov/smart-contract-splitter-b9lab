pragma solidity ^0.5.0;

import {Owned} from "./Owned.sol";

contract Toggled is Owned {

    bool private active;

    event LogContractPaused(address indexed performedBy);
    event LogContractResumed(address indexed performedBy);

    constructor() internal {
        active = true;
    }

    modifier isActive() {
        require(active, "Contract is currently paused");
        _;
    }

    function pauseContract() public onlyOwner {
        require(active, "Contract is already paused");
        active = false;
        emit LogContractPaused(msg.sender);
    }

    function resumeContract() public onlyOwner {
        require(!active, "Contract is already active");
        active = true;
        emit LogContractResumed(msg.sender);
    }

    function getStatus() public view returns (bool) {
        return active;
    }
}
