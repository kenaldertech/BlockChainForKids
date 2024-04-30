// SPDX-License-Identifier: MIT
// File: @chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol


pragma solidity ^0.8.0;

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

// File: VORTEx01/gasprice_chainlink_datafeeds_v14.sol


pragma solidity ^0.8.22;


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
