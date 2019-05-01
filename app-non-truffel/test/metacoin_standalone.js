const Web3 = require('web3');
const web3 = new Web3();
const Ganache = require('ganache-cli');
web3.setProvider(Ganache.provider());
const assert = require('assert-plus');
const truffleContract = require("truffle-contract");
const ConvertLib = truffleContract(require(__dirname + "/../build/contracts/ConvertLib.json"));
ConvertLib.setProvider(web3.currentProvider);
const MetaCoin = truffleContract(require(__dirname + "/../build/contracts/MetaCoin.json"));
MetaCoin.setProvider(web3.currentProvider);

describe("MetaCoin", function () {
    let accounts, networkId, convertLib, metaCoin;

    before("get accounts", async function () {
        accounts = await web3.eth.getAccounts();
        networkId = await web3.eth.net.getId();
        ConvertLib.setNetwork(networkId);
        MetaCoin.setNetwork(networkId);
    });

    before("deploy library", async function () {
        convertLib = await ConvertLib.new({from: accounts[0], gas: 3000000});
        MetaCoin.link({ConvertLib: convertLib.address});
    });
    beforeEach("deploy a MetaCoin", async function () {
        metaCoin = await MetaCoin.new({from: accounts[0], gas: 3000000});
    });
    it("should start with 10000 coins", async function () {
        const balance = await metaCoin.getBalance.call(accounts[0]);
        assert.strictEqual(
            balance.toString(10),
            "10000",
            "should be 10k");
    });
});
