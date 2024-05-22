// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public buyer;
    address public seller;
    address public arbiter;
    uint256 public amount;
    bool public isBuyerDeposited;
    bool public isSellerDeposited;
    bool public isComplete;
    uint256 public depositTime;
    uint256 public timeLimit = 15 minutes;

    // Events
    event SellerDeposited(address indexed seller, uint256 amount);
    event BuyerDeposited(address indexed buyer, uint256 amount);
    event PaymentCompleted(address indexed buyer, address indexed seller, uint256 amount);
    event Refunded(address indexed seller, uint256 amount);

    // Constructor to initialize the contract
    constructor(address _buyer, address _seller, address _arbiter) {
        buyer = _buyer;
        seller = _seller;
        arbiter = _arbiter;
    }

    // Modifier to check if the caller is the seller
    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this function");
        _;
    }

    // Modifier to check if the caller is the buyer
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this function");
        _;
    }

    // Modifier to check if the caller is the arbiter
    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this function");
        _;
    }

    // Function for the seller to deposit the cryptocurrency
    function sellerDeposit() external payable onlySeller {
        require(!isSellerDeposited, "Seller has already deposited");
        require(msg.value > 0, "Deposit amount must be greater than zero");

        amount = msg.value;
        isSellerDeposited = true;
        depositTime = block.timestamp;

        emit SellerDeposited(seller, msg.value);
    }

    // Function for the buyer to confirm the payment
    function buyerDeposit() external onlyBuyer {
        require(isSellerDeposited, "Seller has not deposited yet");
        require(!isBuyerDeposited, "Buyer has already deposited");
        
        isBuyerDeposited = true;

        emit BuyerDeposited(buyer, amount);
    }

    // Function to complete the transaction and release the funds to the buyer
    function releaseFunds() external onlyBuyer {
        require(isSellerDeposited, "Seller has not deposited yet");
        require(isBuyerDeposited, "Buyer has not deposited yet");
        require(!isComplete, "Transaction is already complete");

        isComplete = true;
        payable(buyer).transfer(amount);

        emit PaymentCompleted(buyer, seller, amount);
    }

    // Function to refund the seller if the transaction is cancelled or time limit exceeded
    function refundSeller() public {
        require(isSellerDeposited, "Seller has not deposited yet");
        require(!isComplete, "Transaction is already complete");
        require(block.timestamp > depositTime + timeLimit, "Time limit has not been reached");

        isComplete = true;
        payable(seller).transfer(amount);

        emit Refunded(seller, amount);
    }

    // Function to allow the arbiter to refund the seller
    function arbiterRefund() external onlyArbiter {
        require(isSellerDeposited, "Seller has not deposited yet");
        require(!isComplete, "Transaction is already complete");

        isComplete = true;
        payable(seller).transfer(amount);

        emit Refunded(seller, amount);
    }
}
