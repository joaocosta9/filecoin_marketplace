// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {Sale} from "../src/Sale.sol";

contract CounterScript is Script {
    Sale public sale;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        sale = new Sale();

        vm.stopBroadcast();
    }
}
