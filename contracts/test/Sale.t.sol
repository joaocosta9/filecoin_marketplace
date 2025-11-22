pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Sale.sol";

contract SaleTest is Test {
    Sale public contentPurchase;

    address public creator = makeAddr("creator");
    address public buyer = makeAddr("buyer");

    string public uuid = "test-uuid-123";
    uint256 public price = 1 ether;

    event ContentCreated(address indexed creator, string uuid, uint256 price);
    event Sold(address indexed buyer, address indexed creator, string uuid, uint256 amount);

    function setUp() public {
        contentPurchase = new Sale();
        vm.deal(buyer, 10 ether);
        vm.deal(creator, 0);
    }

    function testSetContent() public {
        vm.prank(creator);
        contentPurchase.setContent(uuid, price);

        (uint256 storedPrice, bool exists) = contentPurchase.getContent(creator, uuid);
        assertEq(storedPrice, price);
        assertTrue(exists);
    }

    function testSetContentEmitsEvent() public {
        vm.prank(creator);
        vm.expectEmit(true, false, false, true);
        emit ContentCreated(creator, uuid, price);
        contentPurchase.setContent(uuid, price);
    }

    function testSetContentFailsWithZeroPrice() public {
        vm.prank(creator);
        vm.expectRevert("Price must be greater than 0");
        contentPurchase.setContent(uuid, 0);
    }

    function testSetContentFailsWithEmptyUUID() public {
        vm.prank(creator);
        vm.expectRevert("UUID cannot be empty");
        contentPurchase.setContent("", price);
    }

    function testBuyContent() public {
        vm.prank(creator);
        contentPurchase.setContent(uuid, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid);

        assertTrue(contentPurchase.purchases(buyer, creator, uuid));
    }

    function testBuyContentTransfersToCreator() public {
        vm.prank(creator);
        contentPurchase.setContent(uuid, price);

        uint256 creatorBalanceBefore = creator.balance;

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid);

        uint256 creatorBalanceAfter = creator.balance;
        assertEq(creatorBalanceAfter - creatorBalanceBefore, price);
    }

    function testBuyContentEmitsEvent() public {
        vm.prank(creator);
        contentPurchase.setContent(uuid, price);

        vm.prank(buyer);
        vm.expectEmit(true, true, false, true);
        emit Sold(buyer, creator, uuid, price);
        contentPurchase.buy{value: price}(creator, uuid);
    }

    function testBuyContentFailsIfContentDoesNotExist() public {
        vm.prank(buyer);
        vm.expectRevert("Content does not exist");
        contentPurchase.buy{value: price}(creator, uuid);
    }

    function testBuyContentFailsWithInsufficientPayment() public {
        vm.prank(creator);
        contentPurchase.setContent(uuid, price);

        vm.prank(buyer);
        vm.expectRevert("Insufficient payment");
        contentPurchase.buy{value: 0.5 ether}(creator, uuid);
    }

    function testBuyContentFailsWithInvalidCreatorAddress() public {
        vm.prank(buyer);
        vm.expectRevert("Invalid creator address");
        contentPurchase.buy{value: price}(address(0), uuid);
    }

    function testBuyContentFailsWithEmptyUUID() public {
        vm.prank(buyer);
        vm.expectRevert("UUID cannot be empty");
        contentPurchase.buy{value: price}(creator, "");
    }

    function testMultiplePurchases() public {
        string memory uuid2 = "test-uuid-456";

        vm.prank(creator);
        contentPurchase.setContent(uuid, price);
        vm.prank(creator);
        contentPurchase.setContent(uuid2, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid);
        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid2);

        assertTrue(contentPurchase.purchases(buyer, creator, uuid));
        assertTrue(contentPurchase.purchases(buyer, creator, uuid2));
    }

    function testMultipleCreators() public {
        address creator2 = address(0x3);
        string memory uuid2 = "test-uuid-456";

        vm.prank(creator);
        contentPurchase.setContent(uuid, price);
        vm.prank(creator2);
        contentPurchase.setContent(uuid2, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid);
        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator2, uuid2);

        assertTrue(contentPurchase.purchases(buyer, creator, uuid));
        assertTrue(contentPurchase.purchases(buyer, creator2, uuid2));
    }
}
