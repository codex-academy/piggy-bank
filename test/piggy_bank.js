const PiggyBank = artifacts.require("PiggyBank");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("PiggyBank", async function (accounts) {

  var pb = await PiggyBank.deployed();

  beforeEach("create new contract", async () => {
    contract = await Contract.new();

  });

  it("should assert true", async function () {
    await PiggyBank.deployed();
    return assert.isTrue(true);
  });


  it("Deposit should be able to make deposits", async function () {
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

  it("should keep track of the number of user deposits", async function () {
    const pb = await PiggyBank.deployed();

    const acc3 = accounts[2]
    const acc4 = accounts[3]

    await pb.deposit({from : acc3});
    await pb.deposit({from : acc4});
    await pb.deposit({from : acc3});
    await pb.deposit({from : acc3});
    await pb.deposit({from : acc3});
    await pb.deposit({from : acc3});

    // const depositsForAccount2 = await pb.userDeposits(account2)
    const depositsForAccount3 = await pb.userDeposits(acc3)
    const depositsForAccount4 = await pb.userDeposits(acc4)
    
    assert.equal(5, depositsForAccount3.toString());
    assert.equal(1, depositsForAccount4.toString());

  });

  it("should earn a coin for every 5 deposits", async function () {

    const pb = await PiggyBank.deployed();

    const acc3 = accounts[4]
    const acc4 = accounts[5]

    await pb.deposit({from : acc3});
    await pb.deposit({from : acc4});
    await pb.deposit({from : acc3});
    await pb.deposit({from : acc3});
    await pb.deposit({from : acc3});
    await pb.deposit({from : acc3});

    // const depositsForAccount2 = await pb.userDeposits(account2)
    const depositsForAccount3 = await pb.userDeposits(acc3)
    const depositsForAccount4 = await pb.userDeposits(acc4)
    
    assert.equal(5, depositsForAccount3.toString());
    assert.equal(1, depositsForAccount4.toString());

    const coinsForAcc3 = await pb.userCoins(acc3)
    const coinsForAcc4 = await pb.userCoins(acc4)

    assert.equal(1, coinsForAcc3.toString());
    assert.equal(0, coinsForAcc4.toString());

  });
  
});
