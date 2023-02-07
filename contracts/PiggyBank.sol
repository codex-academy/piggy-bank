// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PiggyBank {

  uint private deposits;
  event Deposited();

  mapping(address => uint) public userDeposits;
  mapping(address => uint) public userCoins;

  constructor() public {
  }

  function deposit() public {
    deposits += 1;
    // keep track of the deposits for each user
    userDeposits[msg.sender]++;
    // earn a coin after 5 deposits
    if (userDeposits[msg.sender] % 5 == 0) {
      userCoins[msg.sender]++;
    }
    emit Deposited();
  }

  function numberOfDeposits() public view returns (uint) {
    return deposits;
  }

  // keep track of how many deposits a users has made
  
  // let a user earn coins for each 5 deposits

  // they can only

}
