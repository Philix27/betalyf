// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./dataType"
contract Minipay  { 
    address public owner;
    string public who;
    uint public invoiceCount = 0;
    bool locked;
    mapping(address => invoice[]) invoiceInventory;

  
    constructor (string memory _who) {
        owner = msg.sender;
        who = _who;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only the admin can use this!");
        _;
    } 

    modifier validateAddress(address _addr){
        require(_addr != address(0), "Not a valid address");
        _;
    } 

    modifier noReentrancy(){
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    } 



    function changeOwner(address newOwner) public  onlyOwner validateAddress(newOwner) noReentrancy {
        owner = newOwner;
    }

    function showClicker() public view returns(address) {
       return msg.sender;
    }

    // Invoice
    function addInvoice() public {
        invoiceCount = 1 + invoiceCount;
    }

    function removeInvoice() public {
        invoiceCount = invoiceCount - 1;
    }

    function getInvoiceCount() public view returns(uint) {
        return invoiceCount;
    }
    function getInvoiceList() public view returns(invoice[] memory) {
        return invoiceInventory[msg.sender];
    }

    // function addInvoice() public view returns(invoice memory) {
    //     return invoiceInventory[msg.sender];
    // }

}