// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract PiggyBank {

  uint private deposits;
  event Deposited();

  constructor() public {
  }

  function deposit() public {
    deposits += 1;
    emit Deposited();
  }

  function numberOfDeposits() public view returns (uint) {
    return deposits;
  }

}
