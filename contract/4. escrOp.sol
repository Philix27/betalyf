// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract MultiUserEscrow is Ownable {
    using SafeMath for uint256;
    using Address for address payable;

    struct Escrow {
        address payable buyer;
        address payable seller;
        address arbiter;
        uint256 amount;
        uint256 depositTime;
        bool isBuyerDeposited;
        bool isSellerDeposited;
        bool isComplete;
    }

    uint256 public timeLimit = 15 minutes;
    mapping(uint256 => Escrow) public escrows;
    uint256 public escrowCount;

    // Events
    event EscrowCreated(uint256 escrowId, address indexed seller, address indexed buyer, address arbiter, uint256 amount);
    event SellerDeposited(uint256 escrowId, address indexed seller, uint256 amount);
    event BuyerDeposited(uint256 escrowId, address indexed buyer);
    event PaymentCompleted(uint256 escrowId, address indexed buyer, address indexed seller, uint256 amount);
    event Refunded(uint256 escrowId, address indexed seller, uint256 amount);

    // Function to create a new escrow
    function createEscrow(address payable _buyer, address payable _seller, address _arbiter) external onlyOwner returns (uint256) {
        escrowCount++;
        escrows[escrowCount] = Escrow({
            buyer: _buyer,
            seller: _seller,
            arbiter: _arbiter,
            amount: 0,
            depositTime: 0,
            isBuyerDeposited: false,
            isSellerDeposited: false,
            isComplete: false
        });

        emit EscrowCreated(escrowCount, _seller, _buyer, _arbiter, 0);
        return escrowCount;
    }

    // Modifier to check if the caller is the seller
    modifier onlySeller(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].seller, "Only seller can call this function");
        _;
    }

    // Modifier to check if the caller is the buyer
    modifier onlyBuyer(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].buyer, "Only buyer can call this function");
        _;
    }

    // Modifier to check if the caller is the arbiter
    modifier onlyArbiter(uint256 _escrowId) {
        require(msg.sender == escrows[_escrowId].arbiter, "Only arbiter can call this function");
        _;
    }

    // Function for the seller to deposit the cryptocurrency
    function sellerDeposit(uint256 _escrowId) external payable onlySeller(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(!escrow.isSellerDeposited, "Seller has already deposited");
        require(msg.value > 0, "Deposit amount must be greater than zero");

        escrow.amount = msg.value;
        escrow.isSellerDeposited = true;
        escrow.depositTime = block.timestamp;

        emit SellerDeposited(_escrowId, msg.sender, msg.value);
    }

    // Function for the buyer to confirm the payment
    function buyerDeposit(uint256 _escrowId) external onlyBuyer(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.isSellerDeposited, "Seller has not deposited yet");
        require(!escrow.isBuyerDeposited, "Buyer has already deposited");

        escrow.isBuyerDeposited = true;

        emit BuyerDeposited(_escrowId, msg.sender);
    }

    // Function to complete the transaction and release the funds to the buyer
    function releaseFunds(uint256 _escrowId) external onlyBuyer(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.isSellerDeposited, "Seller has not deposited yet");
        require(escrow.isBuyerDeposited, "Buyer has not deposited yet");
        require(!escrow.isComplete, "Transaction is already complete");

        escrow.isComplete = true;
        escrow.buyer.sendValue(escrow.amount);

        emit PaymentCompleted(_escrowId, escrow.buyer, escrow.seller, escrow.amount);
    }

    // Function to refund the seller if the transaction is cancelled or time limit exceeded
    function refundSeller(uint256 _escrowId) public {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.isSellerDeposited, "Seller has not deposited yet");
        require(!escrow.isComplete, "Transaction is already complete");
        require(block.timestamp > escrow.depositTime + timeLimit, "Time limit has not been reached");

        escrow.isComplete = true;
        escrow.seller.sendValue(escrow.amount);

        emit Refunded(_escrowId, escrow.seller, escrow.amount);
    }

    // Function to allow the arbiter to refund the seller
    function arbiterRefund(uint256 _escrowId) external onlyArbiter(_escrowId) {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.isSellerDeposited, "Seller has not deposited yet");
        require(!escrow.isComplete, "Transaction is already complete");

        escrow.isComplete = true;
        escrow.seller.sendValue(escrow.amount);

        emit Refunded(_escrowId, escrow.seller, escrow.amount);
    }
}
