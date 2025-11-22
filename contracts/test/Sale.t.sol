pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Sale.sol";

contract SaleTest is Test {
    Sale public contentPurchase;

    address public creator = makeAddr("creator");
    address public buyer = makeAddr("buyer");

    string public cid = "test-cid-123";
    uint256 public price = 1 ether;

    event ContentCreated(address indexed creator, string cid, uint256 price);
    event Sold(address indexed buyer, address indexed creator, string cid, uint256 amount);

    function setUp() public {
        contentPurchase = new Sale();
        vm.deal(buyer, 10 ether);
        vm.deal(creator, 0);
    }

    function testSetContent() public {
        vm.prank(creator);
        contentPurchase.setContent(cid, price);

        (uint256 storedPrice, bool exists) = contentPurchase.getContent(creator, cid);
        assertEq(storedPrice, price);
        assertTrue(exists);
    }

    function testSetContentEmitsEvent() public {
        vm.prank(creator);
        vm.expectEmit(true, false, false, true);
        emit ContentCreated(creator, cid, price);
        contentPurchase.setContent(cid, price);
    }

    function testSetContentFailsWithZeroPrice() public {
        vm.prank(creator);
        vm.expectRevert("Price must be greater than 0");
        contentPurchase.setContent(cid, 0);
    }

    function testSetContentFailsWithEmptyCID() public {
        vm.prank(creator);
        vm.expectRevert("CID cannot be empty");
        contentPurchase.setContent("", price);
    }

    function testBuyContent() public {
        vm.prank(creator);
        contentPurchase.setContent(cid, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, cid);

        assertTrue(contentPurchase.purchases(buyer, creator, cid));
    }

    function testBuyContentTransfersToCreator() public {
        vm.prank(creator);
        contentPurchase.setContent(cid, price);

        uint256 creatorBalanceBefore = creator.balance;

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, cid);

        uint256 creatorBalanceAfter = creator.balance;
        assertEq(creatorBalanceAfter - creatorBalanceBefore, price);
    }

    function testBuyContentEmitsEvent() public {
        vm.prank(creator);
        contentPurchase.setContent(cid, price);

        vm.prank(buyer);
        vm.expectEmit(true, true, false, true);
        emit Sold(buyer, creator, cid, price);
        contentPurchase.buy{value: price}(creator, cid);
    }

    function testBuyContentFailsIfContentDoesNotExist() public {
        vm.prank(buyer);
        vm.expectRevert("Content does not exist");
        contentPurchase.buy{value: price}(creator, cid);
    }

    function testBuyContentFailsWithInsufficientPayment() public {
        vm.prank(creator);
        contentPurchase.setContent(cid, price);

        vm.prank(buyer);
        vm.expectRevert("Insufficient payment");
        contentPurchase.buy{value: 0.5 ether}(creator, cid);
    }

    function testBuyContentFailsWithInvalidCreatorAddress() public {
        vm.prank(buyer);
        vm.expectRevert("Invalid creator address");
        contentPurchase.buy{value: price}(address(0), cid);
    }

    function testBuyContentFailsWithEmptyCID() public {
        vm.prank(buyer);
        vm.expectRevert("CID cannot be empty");
        contentPurchase.buy{value: price}(creator, "");
    }

    function testMultiplePurchases() public {
        string memory cid2 = "test-cid-456";

        vm.prank(creator);
        contentPurchase.setContent(cid, price);
        vm.prank(creator);
        contentPurchase.setContent(cid2, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, cid);
        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, cid2);

        assertTrue(contentPurchase.purchases(buyer, creator, cid));
        assertTrue(contentPurchase.purchases(buyer, creator, cid2));
    }

    function testMultipleCreators() public {
        address creator2 = address(0x3);
        string memory cid2 = "test-cid-456";

        vm.prank(creator);
        contentPurchase.setContent(cid, price);
        vm.prank(creator2);
        contentPurchase.setContent(cid2, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, cid);
        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator2, cid2);

        assertTrue(contentPurchase.purchases(buyer, creator, cid));
        assertTrue(contentPurchase.purchases(buyer, creator2, cid2));
    }
}
