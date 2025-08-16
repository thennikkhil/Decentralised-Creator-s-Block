// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuardTransient} from "@openzeppelin/contracts/utils/ReentrancyGuardTransient.sol";
import "hardhat/console.sol";

contract CreatorContract is Ownable, ReentrancyGuardTransient {
    struct Item {
        uint id;
        string name;
        uint price;
        address payable seller_address;
        string ipfs_hash;
        bool isSold;
    }

    mapping(uint => Item) public all_items;
    uint platformFeePercent;
    uint256 public balance;
    uint public itemCount = 0;

    event Itemlisted(
        uint _id, 
        string name, 
        uint price, 
        address seller_address);

    event ItemSold(
        uint _id,
        address buyer_address
    );

    function listItems (string memory _name, uint _price, string memory _ipfs_hash) public {
        require(_price > 0, 'The price should be greater than zero');
        itemCount++;
        Item memory newItem = Item(itemCount, _name,  _price, payable(msg.sender), _ipfs_hash, false);

        all_items[itemCount] = newItem;
        emit Itemlisted(itemCount, _name, _price, msg.sender);

    }

    function buyItem (uint256 _id) public payable nonReentrant() {
        require(_id <= itemCount, "Item doesn't exists");
        require(msg.value == all_items[_id].price, 'Please provide the exact price');
        require(all_items[_id].isSold == false, "Item is already sold");

        Item storage thisItem = all_items[_id];
        uint256 platformFee = (thisItem.price * platformFeePercent/100);
        balance += platformFee;
        uint256 finalPrice = (thisItem.price - platformFee);

        thisItem.seller_address.transfer(finalPrice);

        thisItem.isSold = true;
        
        emit ItemSold(_id, msg.sender);
    }

    function withdraw () public onlyOwner{
        require(balance > 0, "You have no balance to withdraw");
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Withdrawal failed");
        balance = 0;
    }

    constructor(address initialOwner) Ownable(initialOwner) {
        platformFeePercent = 3;
    }
}