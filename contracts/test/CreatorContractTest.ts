import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("CreatorContract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function creatorContractTest() {

    // Contracts are deployed using the first signer/account by default
    const [owner] = await hre.ethers.getSigners();

    const CreatorContract = await hre.ethers.getContractFactory("CreatorContract");
    const creatorContract = await CreatorContract.deploy(owner);
  
    return {creatorContract, owner};

  }

  describe ("deployContractTest", function () {
        it("Should set the right owner", async function () {
      const { creatorContract, owner } = await loadFixture(creatorContractTest);

      expect(await creatorContract.owner()).to.equal(owner.address);
    });
  });
      

  describe ("listItemsFunction", function() {

    it('Should allow a user to list a new item', async function () {
      const {creatorContract, owner} = await loadFixture(creatorContractTest);

      const testName = 'My Test Item';
      const testPrice = hre.ethers.parseEther('1.0'); //Represents 1 ETH
      const testIpfsHash = 'Qm439858493testhash';
      
      await creatorContract.listItems(testName, testPrice, testIpfsHash);
      
      expect(await creatorContract.itemCount()).to.equal(1);
      const newItem = await creatorContract.all_items(1);
      expect(newItem.name).to.equal(testName);
      expect(newItem.price).to.equal(testPrice);
      expect(newItem.seller_address).to.equal(owner.address);
      expect(newItem.isSold).to.equal(false);
    });


    it('should revert if the price is 0', async function () {
      const {creatorContract, owner} = await loadFixture(creatorContractTest);

      const testName = 'My Test Item';
      const invalidPrice = 0;
      const testIpfsHash = 'Qm439858493testhash';
      
      await expect(creatorContract.listItems(testName, invalidPrice, testIpfsHash))
      .to.be.revertedWith('The price should be greater than zero');

    })
  });


  // It should transfer the correct finalPrice to the seller's address.


  describe('buyItem', function () { 
    it('Should allow the user to buy an Item', async function () {
      const {creatorContract, owner} = await loadFixture(creatorContractTest);

      // 1.  this is the arrange part
      const [seller, buyer] = await hre.ethers.getSigners();

      const itemPrice = hre.ethers.parseEther("2.0");
      const feePercent = 3n
      const platformFee = (itemPrice * feePercent) / 100n;
      const finalPrice =  itemPrice - platformFee;

      await creatorContract.connect(seller).listItems('Items to buy', itemPrice, "hash");

      // 2. this is the act part

      await expect(
        creatorContract.connect(buyer).buyItem(1, {value: itemPrice})).to.changeEtherBalances(
          [seller, buyer, creatorContract], 
          [finalPrice, -itemPrice, platformFee]);
    });

    // failure case 1
    it('Should revert if the payment is not the exact price', async function () {
      const {creatorContract, owner} = await loadFixture(creatorContractTest);

      const [seller, buyer] = await hre.ethers.getSigners();
      const itemPrice = hre.ethers.parseEther("2.0");
      const wrongPrice = hre.ethers.parseEther("1.0");

      await creatorContract.connect(seller).listItems('Items to buy', itemPrice, "hash");
      console.log("TEST SCRIPT IS SENDING THIS VALUE:", wrongPrice.toString());

      await expect(
        creatorContract.connect(buyer).buyItem(1, {value: wrongPrice})
      ).to.be.revertedWith('Please provide the exact price');
    });

    // failure case 2: It should revert if someone tries to buy an item that is already sold.

    it ('It should revert if someone tries to buy an item that is already sold', async function () {

      const {creatorContract, owner} = await loadFixture(creatorContractTest);
      await creatorContract.listItems('Items to buy', 2, "hash");
      const [seller, buyer1, buyer2] = await hre.ethers.getSigners();

      creatorContract.connect(buyer1).buyItem(1, {value: 2})
      await expect(
        creatorContract.connect(buyer2).buyItem(1, {value: 2})
      ).to.be.revertedWith('Item is already sold');

      // expect(newItem.isSold).to.equal(isSold)
    });

    it ("It should revert if someone tries to buy an item with an ID that doesn't exist", async function () {
      const {creatorContract, owner} = await loadFixture(creatorContractTest);
      const itemPrice = hre.ethers.parseEther("2.0")
      await creatorContract.listItems("Items", itemPrice, "hash");

      await expect(
        creatorContract.buyItem(2, {value: itemPrice})
      ).to.be.revertedWith("Item doesn't exists");

    })
  })

  describe('withdraw', function () { 
    it("It should allow the owner to withdraw the full balance and reset balance to zero", async function () {
      const {creatorContract, owner} = await loadFixture(creatorContractTest);
      const [seller, buyer] = await hre.ethers.getSigners();
      const itemPrice = hre.ethers.parseEther("2.0")
      await creatorContract.connect(seller).listItems("name", itemPrice, "hash");
      await creatorContract.connect(buyer).buyItem(1, {value: itemPrice});

      const collectedFee = await creatorContract.balance();

      await expect(creatorContract.connect(owner).withdraw).changeEtherBalance(owner, collectedFee);
      
      expect(await creatorContract.balance()).to.equal(0)
    });

    // Fail check 1
    it("Should revert if a non-owner tries to withdraw", async function (){
       const { creatorContract } = await loadFixture(creatorContractTest);
       const [owner, nonOwner] = await hre.ethers.getSigners();

        await expect(
         creatorContract.connect(nonOwner).withdraw()
             ).to.be.reverted;
    });

    // Fail check 2
    it("Should revert if the owner withdraws with zero balance", async function () {
      const { creatorContract, owner } = await loadFixture(creatorContractTest);

      expect(creatorContract.withdraw).to.be.revertedWith("You have no balance to withdraw");
    })
  })

}) // this is the ending clause of the main describe function

performance