// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Budget {
    uint id;
    bytes name;
    uint totalAmount;
    uint amountSpent;
}

struct Invoice {
    uint id;
    bytes name;
    uint amount;
    Status status;
}

enum Status {Pending, Paid, Rejected}

contract Peerie {
    address public owner;
    uint public invoiceIndex = 0;
    bool private locked;
    // mapping(address =>  Budget[]) public budgetsByAddress;
    mapping(address =>  Invoice) public invoiceList;
    mapping(address => Budget[]) public budgetsByUser;

    constructor(address _ownerAddress) {
        owner = _ownerAddress;
    }

    // Event declarations for logging changes
    event BudgetCreated(uint id, bytes name, uint totalAmount);
    event FundsAdded(uint id, uint amount);
    event ExpenseRecorded(uint id, uint amount);
    event ContractOwnerSwapped(address from, address to);
    event PayInvoice(uint256 userAmount, uint256 requestedAmount, string invoiceId);
    event SpendFromBudget(uint256 budgetId, uint256 amount, address spentBy);
    event AdminWithdrawl(uint256 amount, address who);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Modifier to prevent reentrancy
    modifier noReentrancy() {
        require(!locked, "Reentrant attempt");
        locked = true; 
        _; 
        locked = false;
    }

    modifier hasBudget() {
       require(budgetsByUser[msg.sender].length > 0, "No budget for this user");
        _;
    }

    // Budget
    function createBudget(bytes memory name, uint totalAmount) public noReentrancy {
        Budget memory newBudget = Budget({
            id: budgetsByUser[msg.sender].length,
            name: name,
            totalAmount: totalAmount,
            amountSpent: 0
        });
        
        budgetsByUser[msg.sender].push(newBudget);
        emit BudgetCreated(newBudget.id, name, totalAmount);
    }

    function spendFromBudget(uint budgetId, uint amount) public hasBudget noReentrancy {
        require(budgetsByUser[msg.sender].length > budgetId, "Budget does not exist");
        require(budgetsByUser[msg.sender][budgetId].totalAmount >= budgetsByUser[msg.sender][budgetId].amountSpent + amount, "Insufficient funds");
        budgetsByUser[msg.sender][budgetId].amountSpent += amount;
        emit SpendFromBudget(budgetId, amount, msg.sender);
    }

    function getBudgets() public view hasBudget returns (Budget[] memory)  {
        return budgetsByUser[msg.sender];
    }

    // Invoice
    function payInvoice(address payable recipient, uint256 amount, string memory invoiceId) public payable noReentrancy {
        require(amount > 0, "Amount must be greater than zero");
        require(msg.value == amount, "The sent Ether must exactly match the specified amount");
        recipient.transfer(msg.value);
        emit PayInvoice(msg.value, amount, invoiceId);
    }

    // Contract management
    function swapContractOwner(address newOwner) public onlyOwner {
        owner = newOwner;
        emit ContractOwnerSwapped(owner, newOwner);
    }

    function getContractBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }
    
    function adminWithdrawBalance() public onlyOwner noReentrancy payable {
        uint contractBalance = address(this).balance;
        payable(owner).transfer(contractBalance);
        emit AdminWithdrawl(contractBalance, msg.sender);
    }
    
    receive() external payable {}
}

