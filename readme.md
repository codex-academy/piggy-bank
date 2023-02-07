# The PiggyBank - Ethereum smart contract introduction

This dApp is deployed at [http://piggybank.projectcodex.net/](http://piggybank.projectcodex.net/) and is running on the Goerli & Sepolia Ethereum TestNets.


The `PiggyBank` smartcontract accepts deposits from blockchain users. 

It keeps track of:

* how many deposists are made in total,
* how many deposits each individual user made,
* it allocates a coin to a user for each 5 deposits made.

## MetaMask setup

To use the aApp install [MetaMask](https://metamask.io/) crypto wallet - you can download it [here](https://metamask.io/download/) for your browser of choice.

Next connect to the goerli or sepolia testnets.

## Mining for ether

To use the PiggyBank dApp you will need some ether on the testnet of your choice.

You can mine for some ether on one of the test Faucet's below:

* A sepolia [faucet](https://sepolia-faucet.pk910.de/) to use.
* A [goerli](https://goerli-faucet.pk910.de/) faucet.

## Deployment

Deploy to the `goerli` testnet:

```
truffle deploy --network goerli
```

```
truffle deploy --network sepolia
```

Be sure to commit your code to GitHub after this to ensure the latest contract details are online for the dApp to use. Otherwise the app will not find the latest deployed version of the contract.

## Looking at the Ethereum block chain

To find the deployed contracts on the blockchain you can use `etherscan.io`.

Use these URLs:

```
https://goerli.etherscan.io/
https://sepolia.etherscan.io/
```