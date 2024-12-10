// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract bmCoffee {
    struct Coffee {
        address sender;
        string message;
        uint256 timestamp;
    }

    uint256 totalcoffee;
    address payable owner;

    event NewCofee(address sender, string message, uint256 timestamp);

    constructor(){
        owner = payable(msg.sender);
    }

    function bmc( string memory _message)
        public payable {
        require (msg.value >= 0.01 ether, "Greater than zero ser ");
        totalcoffee += 1;

        payable(owner).transfer(msg.value);
        emit NewCofee(msg.sender, _message, block.timestamp);
        
    }

    function getTotal() public view returns (uint256) {
        return totalcoffee;
    }
}