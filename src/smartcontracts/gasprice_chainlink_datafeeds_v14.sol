// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceFeed {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        
        priceFeed = AggregatorV3Interface(0x59F1ec1f10bD7eD9B938431086bC1D9e233ECf41);
    }

    /**
     * Returns the latest ETH/USD price from the Chainlink Price Feed.
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
