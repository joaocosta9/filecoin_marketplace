pragma solidity ^0.8.13;

contract Sale {
    struct Content {
        address creator;
        string uuid;
        uint256 price;
        bool exists;
    }

    // Mapping to store content by creator address and UUID
    mapping(address => mapping(string => Content)) public contents;

    // Array to store all content items for enumeration
    Content[] private allContents;

    // Mapping to store purchases: buyer => creator => uuid => bool
    mapping(address => mapping(address => mapping(string => bool))) public purchases;

    // Array to store purchased items for each buyer
    mapping(address => Content[]) private purchasedItems;

    event ContentCreated(address indexed creator, string uuid, uint256 price);

    event Sold(address indexed buyer, address indexed creator, string uuid, uint256 amount);

    constructor() {}

    /**
     * @dev Set content with UUID and price
     * @param uuid The unique identifier for the content
     * @param price The price in wei for purchasing this content
     */
    function setContent(string calldata uuid, uint256 price) external {
        require(price > 0, "Price must be greater than 0");
        require(bytes(uuid).length > 0, "UUID cannot be empty");

        Content memory newContent = Content({creator: msg.sender, uuid: uuid, price: price, exists: true});
        contents[msg.sender][uuid] = newContent;
        allContents.push(newContent);

        // Emit event
        emit ContentCreated(msg.sender, uuid, price);
    }

    /**
     * @dev Buy content by creator address and UUID
     * @param creator The creator's address
     * @param uuid The UUID of the content to purchase
     */
    function buy(address creator, string calldata uuid) external payable {
        require(creator != address(0), "Invalid creator address");
        require(bytes(uuid).length > 0, "UUID cannot be empty");

        Content storage content = contents[creator][uuid];
        require(content.exists, "Content does not exist");
        require(msg.value >= content.price, "Insufficient payment");

        payable(content.creator).transfer(msg.value);

        purchases[msg.sender][creator][uuid] = true;
        purchasedItems[msg.sender].push(content);

        emit Sold(msg.sender, creator, uuid, msg.value);
    }

    /**
     * @dev Get content information by creator address and UUID
     * @param creator The creator's address
     * @param uuid The UUID of the content
     */
    function getContent(address creator, string calldata uuid) external view returns (uint256 price, bool exists) {
        Content storage content = contents[creator][uuid];
        return (content.price, content.exists);
    }

    /**
     * @dev Get all stored contents
     * @return Array of all content items
     */
    function getAllContents() external view returns (Content[] memory) {
        return allContents;
    }

    /**
     * @dev Get all items purchased by a specific address
     * @param buyer The buyer's address
     * @return Array of content items purchased by the buyer
     */
    function getPurchasedItems(address buyer) external view returns (Content[] memory) {
        return purchasedItems[buyer];
    }
}
