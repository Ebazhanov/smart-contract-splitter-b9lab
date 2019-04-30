pragma solidity ^0.5.0;

contract Owned {

    address private owner;

    event LogOwnerChanged(
        address indexed oldOwner,
        address indexed newOwner
    );

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only executable by owner");
        _;
    }

    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0));
        owner = newOwner;
        emit LogOwnerChanged(msg.sender ,newOwner);
    }

    function getOwner() public view returns(address) {
        return owner;
    }
}
