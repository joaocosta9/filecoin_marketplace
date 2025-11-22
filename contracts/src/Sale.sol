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

    // Mapping to store purchases: buyer => creator => uuid => bool
    mapping(address => mapping(address => mapping(string => bool))) public purchases;

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

        contents[msg.sender][uuid] = Content({creator: msg.sender, uuid: uuid, price: price, exists: true});

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
}
