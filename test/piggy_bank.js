const PiggyBank = artifacts.require("PiggyBank");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PiggyBank", function (/* accounts */) {
  
  it("should assert true", async function () {
    await PiggyBank.deployed();
    return assert.isTrue(true);
  });


  it("Deposit should be 0", async function () {
    const pb = await PiggyBank.deployed();
    return assert.equal(0, await pb.numberOfDeposits());
  });

  it("Deposit should be 0", async function () {
    const pb = await PiggyBank.deployed();

    await pb.deposit();
    await pb.deposit();
    await pb.deposit();

    const deposits = await pb.numberOfDeposits()

    return assert.equal(3, Number(deposits.toString()));
  });

});
