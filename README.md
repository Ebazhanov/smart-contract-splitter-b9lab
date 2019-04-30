Testing task
------------
Create a smart contract named `Splitter` whereby:

- [x] there are 3 people: Alice, Bob and Carol.
- [x] we should see the balance of the Splitter contract on the `Web page`.
- [x] whenever Alice sends ether to the contract for it to be split, half of 
it goes to Bob and the other half to Carol.
- [x] we can see the balances of Alice, Bob and Carol on the Web page.
- [x] Alice can use the Web page to split her ether.

It would be even better if you could team up with different people 
impersonating Alice, Bob and Carol, all cooperating on a test net.

## Prerequisites

- Users:  (A)lice, (B)ob and (C)arol
- When `A` sends ETH to `B` and `C`, it splits 50/50
- `A` is able to split ETH on the website
- We are able to see total balance
- We are able to see separate balance of `A`, `B` and `C`.

## Setting up your environment

* Check if Node.js and truffle are installed by typing in your 
terminal: 
    * `node -v` 
    * and then `truffle version`
* Install [Ganache](https://truffleframework.com/ganache)
* Initialize truffle `truffle init` to build a basic Truffle project
* Create package.json file  by typing `npm init`
* Write contracts in the contracts folder.(Splitter.sol, Owned.sol, Toggled.sol)
* Modify `truffle-config.js` file (`truffle.js` for Mac). 
* Run `truffle compile` to compile the contract
    * Please check the required version of the Solidity compiler (for all .sol files including imported libraries) 
    * by running `truffle version`. 
    * If needed, run `npm uninstall -g truffle` 
    * and the `npm install -g truffle`
* Create `2_splitter_migration.js` in the migrations folder.
* Run Ganache on your machine (select Quickstart)
* Run `truffle migrate --reset` to migrate the contract.

## How to run tests `splitter.test.js`
* Run Ganache on your machine (select Quickstart)
* `truffle test` 
