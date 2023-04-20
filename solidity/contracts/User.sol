// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

struct AccountStruct {
    uint id;
    address creater;
    string name;
    string bio;
    string email;
    string headerImageURL;
    string avatarImageURL;
    bool isDeleted;
    uint timestamp;
}

struct CreateAccountRequest {
    string name;
    string bio;
    string email;
    string headerImageURL;
    string avatarImageURL;
}

struct UpdateAccountRequest {
    uint id;
    string name;
    string bio;
    string email;
    string headerImageURL;
    string avatarImageURL;
}

struct AccountResponse {
    uint id;
    string name;
    string bio;
    string headerImageURL;
    string avatarImageURL;
    uint timestamp;
}

struct MeResponse {
    uint id;
    string name;
    string bio;
    string email;
    string headerImageURL;
    string avatarImageURL;
    uint timestamp;
}

struct RankingResponse {
    uint id;
    uint8 rank;
    string name;
    string avatarImageURL;
}

contract User {
    address public owner;
    uint public fee;
    AccountStruct[] public accounts;

    constructor(uint _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    // == mapping ==
    mapping(uint => address) public userOwnerOf;
    mapping(uint => bool) accountExist;

    // == modifier ==
    modifier onlyUserOwner() {
        require(msg.sender == owner, "Unauthorize Personal");
        _;
    }

    modifier validateCreateAccount(CreateAccountRequest memory _req) {
        require(msg.value >= fee, "Insufficient fund");
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(bytes(_req.bio).length > 0, "bio cannot be empty");
        // TODO: email check
        require(bytes(_req.email).length > 0, "email cannot be empty");
        // TODO: URL check
        require(
            bytes(_req.headerImageURL).length > 0,
            "header image URL cannot be empty"
        );
        require(
            bytes(_req.avatarImageURL).length > 0,
            "avatar image URL cannot be empty"
        );

        bool existAccount;
        bool existName;
        for (uint i = 0; i < accounts.length; i++) {
            if (userOwnerOf[i] == msg.sender) {
                existAccount = true;
            }
            if (
                keccak256(bytes(accounts[i].name)) ==
                keccak256(bytes(_req.name))
            ) {
                existName = true;
            }
        }
        require(
            !existAccount,
            "This contract address is already has an account"
        );
        require(!existName, "This account name is already in use");
        _;
    }

    modifier validateUpdateAccount(UpdateAccountRequest memory _req) {
        require(accountExist[_req.id], "Account not found");
        require(bytes(_req.name).length > 0, "name cannot be empty");
        require(bytes(_req.bio).length > 0, "bio cannot be empty");
        // TODO: email check
        require(bytes(_req.email).length > 0, "email cannot be empty");
        // TODO: URL check
        require(
            bytes(_req.headerImageURL).length > 0,
            "header image URL cannot be empty"
        );
        require(
            bytes(_req.avatarImageURL).length > 0,
            "avatar image URL cannot be empty"
        );
        _;
    }

    // == method ==
    function createAccount(
        CreateAccountRequest memory _req
    ) public payable validateCreateAccount(_req) returns (bool) {
        AccountStruct memory account;
        uint _id = accounts.length;
        account.id = _id;
        account.creater = msg.sender;
        account.name = _req.name;
        account.bio = _req.bio;
        account.email = _req.email;
        account.headerImageURL = _req.headerImageURL;
        account.avatarImageURL = _req.avatarImageURL;
        account.timestamp = block.timestamp;
        accounts.push(account);

        accountExist[_id] = true;
        userOwnerOf[_id] = msg.sender;

        return true;
    }

    function updateAccount(
        UpdateAccountRequest memory _req
    ) public onlyUserOwner validateUpdateAccount(_req) returns (bool) {
        AccountStruct memory account = accounts[_req.id];
        account.name = _req.name;
        account.bio = _req.bio;
        account.email = _req.email;
        account.headerImageURL = _req.headerImageURL;
        account.avatarImageURL = _req.avatarImageURL;
        accounts[_req.id] = account;

        return true;
    }

    function deleteAccount(uint _id) public onlyUserOwner returns (bool) {
        require(accountExist[_id], "Account not found");

        AccountStruct memory account = accounts[_id];
        account.isDeleted = true;
        accounts[_id] = account;

        return true;
    }

    function getAccounts() public view returns (AccountResponse[] memory) {
        uint activeUsers = 0;
        for (uint i = 0; i < accounts.length; i++) {
            if (!accounts[i].isDeleted) {
                activeUsers += 1;
            }
        }
        AccountResponse[] memory results = new AccountResponse[](activeUsers);

        uint counter = 0;
        for (uint i = 0; i < accounts.length; i++) {
            if (!accounts[i].isDeleted) {
                AccountStruct memory account = accounts[i];
                AccountResponse memory a = _parseAccountResponse(i, account);
                results[counter] = a;
                counter++;
            }
        }

        return results;
    }

    function getAccount(uint _id) public view returns (AccountResponse memory) {
        require(accountExist[_id], "Account not found");

        AccountStruct memory account = accounts[_id];
        require(!account.isDeleted, "Account has been deleted");

        AccountResponse memory a = _parseAccountResponse(_id, account);

        return a;
    }

    function getMe() public view returns (MeResponse memory) {
        bool existAccount;
        uint id;
        for (uint i = 0; i < accounts.length; i++) {
            if (userOwnerOf[i] == msg.sender) {
                existAccount = true;
                id = i;
            }
        }

        require(existAccount, "Account not found");

        AccountStruct memory a = accounts[id];
        require(!a.isDeleted, "Account has been deleted");

        MeResponse memory res;
        res.id = id;
        res.name = a.name;
        res.bio = a.bio;
        res.email = a.email;
        res.headerImageURL = a.headerImageURL;
        res.avatarImageURL = a.avatarImageURL;
        res.timestamp = a.timestamp;

        return res;
    }

    function _parseAccountResponse(
        uint _id,
        AccountStruct memory _account
    ) private pure returns (AccountResponse memory) {
        AccountResponse memory a;

        a.id = _id;
        a.name = _account.name;
        a.bio = _account.bio;
        a.headerImageURL = _account.headerImageURL;
        a.avatarImageURL = _account.avatarImageURL;
        a.timestamp = _account.timestamp;

        return a;
    }

    // TODO
    function getRankings() public view returns (RankingResponse[] memory) {
        uint limit = 10;
        if (accounts.length < 10) {
            limit = accounts.length;
        }

        RankingResponse[] memory results = new RankingResponse[](limit);

        uint counter = 0;
        for (uint i = 0; i < limit; i++) {
            if (!accounts[i].isDeleted) {
                AccountStruct memory account = accounts[i];
                RankingResponse memory r;
                r.id = i;
                r.rank = uint8(i++);
                r.name = account.name;
                r.avatarImageURL = account.avatarImageURL;
                results[counter] = r;
                counter++;
            }
        }

        return results;
    }
}
