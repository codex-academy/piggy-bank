var PiggyBank = artifacts.require("./PiggyBank.sol");

module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(PiggyBank);
};
