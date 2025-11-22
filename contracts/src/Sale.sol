pragma solidity ^0.8.13;

contract Sale {
    struct Content {
        address creator;
        string cid;
        uint256 price;
        bool exists;
    }

    // Mapping to store content by creator address and CID
    mapping(address => mapping(string => Content)) public contents;

    // Array to store all content items for enumeration
    Content[] private allContents;

    // Mapping to store purchases: buyer => creator => cid => bool
    mapping(address => mapping(address => mapping(string => bool))) public purchases;

    event ContentCreated(address indexed creator, string cid, uint256 price);

    event Sold(address indexed buyer, address indexed creator, string cid, uint256 amount);

    constructor() {}

    /**
     * @dev Set content with CID and price
     * @param cid The unique identifier for the content
     * @param price The price in wei for purchasing this content
     */
    function setContent(string calldata cid, uint256 price) external {
        require(price > 0, "Price must be greater than 0");
        require(bytes(cid).length > 0, "CID cannot be empty");

        Content memory newContent = Content({creator: msg.sender, cid: cid, price: price, exists: true});
        contents[msg.sender][cid] = newContent;
        allContents.push(newContent);

        // Emit event
        emit ContentCreated(msg.sender, cid, price);
    }

    /**
     * @dev Buy content by creator address and CID
     * @param creator The creator's address
     * @param cid The CID of the content to purchase
     */
    function buy(address creator, string calldata cid) external payable {
        require(creator != address(0), "Invalid creator address");
        require(bytes(cid).length > 0, "CID cannot be empty");

        Content storage content = contents[creator][cid];
        require(content.exists, "Content does not exist");
        require(msg.value >= content.price, "Insufficient payment");

        payable(content.creator).transfer(msg.value);

        purchases[msg.sender][creator][cid] = true;

        emit Sold(msg.sender, creator, cid, msg.value);
    }

    /**
     * @dev Get content information by creator address and CID
     * @param creator The creator's address
     * @param cid The CID of the content
     */
    function getContent(address creator, string calldata cid) external view returns (uint256 price, bool exists) {
        Content storage content = contents[creator][cid];
        return (content.price, content.exists);
    }

    /**
     * @dev Get all stored contents
     * @return Array of all content items
     */
    function getAllContents() external view returns (Content[] memory) {
        return allContents;
    }
}
