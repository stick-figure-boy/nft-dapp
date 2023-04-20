// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

struct ProductStruct {
    uint id;
    address seller;
    uint sellerID;
    string name;
    string imageURL;
    string description;
    uint8 price; // TODO: float
    bool isDeleted;
    uint timestamp;
}

struct CreateProductRequest {
    uint sellerID;
    string name;
    string imageURL;
    string description;
    uint8 price;
}

struct UpdateProductRequest {
    uint id;
    string name;
    string imageURL;
    string description;
    uint8 price;
}

struct ProductResponse {
    uint id;
    uint sellerID;
    string name;
    string imageURL;
    string description;
    uint8 price;
    uint timestamp;
}

contract Product {
    address public owner;
    uint public fee;
    ProductStruct[] products;

    constructor(uint _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    // == mapping ==
    mapping(uint => address) public produtOwnerOf;
    mapping(uint => bool) productExist;

    // == modifier ==
    modifier onlyProductOwner() {
        require(msg.sender == owner, "Unauthorize Personal");
        _;
    }

    modifier validateCreate(CreateProductRequest memory _req) {
        require(msg.value >= fee, "Insufficient fund");
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(
            bytes(_req.description).length > 0,
            "description cannot be empty"
        );
        // TODO: URL check
        require(bytes(_req.imageURL).length > 0, "image URL cannot be empty");
        require(_req.price > 0, "price cannot be zero");
        _;
    }

    modifier validateUpdate(UpdateProductRequest memory _req) {
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(
            bytes(_req.description).length > 0,
            "description cannot be empty"
        );
        // TODO: URL check
        require(bytes(_req.imageURL).length > 0, "image URL cannot be empty");
        require(_req.price > 0, "price cannot be zero");
        _;
    }

    // == method ==
    function getProducts() public view returns (ProductResponse[] memory) {
        uint activeProducts = 0;
        for (uint i = 0; i < products.length; i++) {
            if (!products[i].isDeleted) {
                activeProducts += 1;
            }
        }
        ProductResponse[] memory results = new ProductResponse[](
            activeProducts
        );

        uint counter = 0;
        for (uint i = 0; i < products.length; i++) {
            if (!products[i].isDeleted) {
                ProductStruct memory product = products[i];
                ProductResponse memory p = _parseProductResponse(i, product);
                results[counter] = p;
                counter++;
            }
        }

        return results;
    }

    function getProductsBySeller(
        uint _sellerID
    ) public view returns (ProductResponse[] memory) {
        uint activeProducts = 0;
        for (uint i = 0; i < products.length; i++) {
            if (products[i].sellerID == _sellerID && !products[i].isDeleted) {
                activeProducts += 1;
            }
        }
        ProductResponse[] memory results = new ProductResponse[](
            activeProducts
        );

        uint counter = 0;
        for (uint i = 0; i < products.length; i++) {
            if (products[i].sellerID == _sellerID && !products[i].isDeleted) {
                ProductStruct memory product = products[i];
                ProductResponse memory p = _parseProductResponse(i, product);
                results[counter] = p;
                counter++;
            }
        }

        return results;
    }

    function getProduct(uint _id) public view returns (ProductResponse memory) {
        require(productExist[_id], "Product not found");

        ProductStruct memory p = products[_id];
        require(!p.isDeleted, "Product has been deleted");

        ProductResponse memory res = _parseProductResponse(_id, p);

        return res;
    }

    // TODO
    function getRecommendProducts()
        public
        view
        returns (ProductResponse[] memory)
    {
        uint limit = 10;
        if (products.length < 10) {
            limit = products.length;
        }
        ProductResponse[] memory results = new ProductResponse[](limit);

        uint counter = 0;
        for (uint i = 0; i < limit; i++) {
            if (!products[i].isDeleted) {
                ProductStruct memory product = products[i];
                ProductResponse memory p;
                p.id = i;
                p.sellerID = product.sellerID;
                p.name = product.name;
                p.imageURL = product.imageURL;
                p.description = product.description;
                p.price = product.price;
                p.timestamp = product.timestamp;
                results[counter] = p;
                counter++;
            }
        }

        return results;
    }

    function createProduct(
        CreateProductRequest memory _req
    ) public payable validateCreate(_req) returns (bool) {
        ProductStruct memory product;
        uint _id = products.length;

        product.id = _id;
        product.seller = msg.sender;
        product.sellerID = _req.sellerID;
        product.name = _req.name;
        product.imageURL = _req.imageURL;
        product.description = _req.description;
        product.price = _req.price;
        product.isDeleted = false;
        product.timestamp = block.timestamp;
        products.push(product);

        productExist[_id] = true;
        produtOwnerOf[_id] = msg.sender;

        return true;
    }

    function updateProduct(
        UpdateProductRequest memory _req
    ) public onlyProductOwner validateUpdate(_req) returns (bool) {
        ProductStruct memory product;
        product.name = _req.name;
        product.imageURL = _req.imageURL;
        product.description = _req.description;
        product.price = _req.price;
        products[_req.id] = product;

        return true;
    }

    function deleteProduct(uint _id) public onlyProductOwner returns (bool) {
        require(productExist[_id], "Product has been deleted");

        ProductStruct memory product = products[_id];
        product.isDeleted = true;
        products[_id] = product;

        return true;
    }

    function _parseProductResponse(
        uint _id,
        ProductStruct memory _product
    ) private pure returns (ProductResponse memory) {
        ProductResponse memory p;

        p.id = _id;
        p.sellerID = _product.sellerID;
        p.name = _product.name;
        p.imageURL = _product.imageURL;
        p.description = _product.description;
        p.price = _product.price;
        p.timestamp = _product.timestamp;

        return p;
    }
}
