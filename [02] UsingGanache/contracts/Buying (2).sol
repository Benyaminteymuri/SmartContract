//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.16;

contract Buying {
  
  address[16] public buyers;

  //Getting a gun
  function get(uint gunId) public returns (uint) {
    require(gunId >= 0 && gunId <= 15, "Max 16 buyers allowed!");

    buyers[gunId] = msg.sender;

    return gunId;
  }

  //Retrieving the buyers
  function getBuyers() public view returns (address[16] memory) {
    return buyers;
  }

}
