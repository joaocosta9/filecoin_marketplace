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

    function testGetAllContentsEmpty() public view {
        Sale.Content[] memory contents = contentPurchase.getAllContents();
        assertEq(contents.length, 0);
    }

    function testGetAllContentsSingle() public {
        vm.prank(creator);
        contentPurchase.setContent(uuid, price);

        Sale.Content[] memory contents = contentPurchase.getAllContents();
        assertEq(contents.length, 1);
        assertEq(contents[0].creator, creator);
        assertEq(contents[0].uuid, uuid);
        assertEq(contents[0].price, price);
        assertTrue(contents[0].exists);
    }

    function testGetAllContentsMultiple() public {
        address creator2 = makeAddr("creator2");
        string memory uuid2 = "test-uuid-456";
        uint256 price2 = 2 ether;
        
        string memory uuid3 = "test-uuid-789";
        uint256 price3 = 0.5 ether;

        vm.prank(creator);
        contentPurchase.setContent(uuid, price);
        
        vm.prank(creator2);
        contentPurchase.setContent(uuid2, price2);
        
        vm.prank(creator);
        contentPurchase.setContent(uuid3, price3);

        Sale.Content[] memory contents = contentPurchase.getAllContents();
        assertEq(contents.length, 3);
        
        // First content
        assertEq(contents[0].creator, creator);
        assertEq(contents[0].uuid, uuid);
        assertEq(contents[0].price, price);
        assertTrue(contents[0].exists);
        
        // Second content
        assertEq(contents[1].creator, creator2);
        assertEq(contents[1].uuid, uuid2);
        assertEq(contents[1].price, price2);
        assertTrue(contents[1].exists);
        
        // Third content
        assertEq(contents[2].creator, creator);
        assertEq(contents[2].uuid, uuid3);
        assertEq(contents[2].price, price3);
        assertTrue(contents[2].exists);
    }

    function testGetPurchasedItemsEmpty() public view {
        Sale.Content[] memory purchased = contentPurchase.getPurchasedItems(buyer);
        assertEq(purchased.length, 0);
    }

    function testGetPurchasedItemsSingle() public {
        vm.prank(creator);
        contentPurchase.setContent(uuid, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid);

        Sale.Content[] memory purchased = contentPurchase.getPurchasedItems(buyer);
        assertEq(purchased.length, 1);
        assertEq(purchased[0].creator, creator);
        assertEq(purchased[0].uuid, uuid);
        assertEq(purchased[0].price, price);
        assertTrue(purchased[0].exists);
    }

    function testGetPurchasedItemsMultiple() public {
        string memory uuid2 = "test-uuid-456";
        uint256 price2 = 2 ether;
        string memory uuid3 = "test-uuid-789";
        uint256 price3 = 0.5 ether;

        address creator2 = makeAddr("creator2");
        vm.deal(creator2, 0);

        vm.prank(creator);
        contentPurchase.setContent(uuid, price);
        vm.prank(creator);
        contentPurchase.setContent(uuid2, price2);
        vm.prank(creator2);
        contentPurchase.setContent(uuid3, price3);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid);
        vm.prank(buyer);
        contentPurchase.buy{value: price2}(creator, uuid2);
        vm.prank(buyer);
        contentPurchase.buy{value: price3}(creator2, uuid3);

        Sale.Content[] memory purchased = contentPurchase.getPurchasedItems(buyer);
        assertEq(purchased.length, 3);
        
        // First purchase
        assertEq(purchased[0].creator, creator);
        assertEq(purchased[0].uuid, uuid);
        assertEq(purchased[0].price, price);
        assertTrue(purchased[0].exists);
        
        // Second purchase
        assertEq(purchased[1].creator, creator);
        assertEq(purchased[1].uuid, uuid2);
        assertEq(purchased[1].price, price2);
        assertTrue(purchased[1].exists);
        
        // Third purchase
        assertEq(purchased[2].creator, creator2);
        assertEq(purchased[2].uuid, uuid3);
        assertEq(purchased[2].price, price3);
        assertTrue(purchased[2].exists);
    }

    function testGetPurchasedItemsDifferentBuyers() public {
        address buyer2 = makeAddr("buyer2");
        vm.deal(buyer2, 10 ether);
        
        string memory uuid2 = "test-uuid-456";

        vm.prank(creator);
        contentPurchase.setContent(uuid, price);
        vm.prank(creator);
        contentPurchase.setContent(uuid2, price);

        vm.prank(buyer);
        contentPurchase.buy{value: price}(creator, uuid);
        
        vm.prank(buyer2);
        contentPurchase.buy{value: price}(creator, uuid2);

        Sale.Content[] memory buyer1Purchased = contentPurchase.getPurchasedItems(buyer);
        Sale.Content[] memory buyer2Purchased = contentPurchase.getPurchasedItems(buyer2);
        
        assertEq(buyer1Purchased.length, 1);
        assertEq(buyer1Purchased[0].uuid, uuid);
        
        assertEq(buyer2Purchased.length, 1);
        assertEq(buyer2Purchased[0].uuid, uuid2);
    }
}
