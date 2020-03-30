import React from "react";
import helpers from "../scripts/helpers";
import constants from "../scripts/constants";

const Display = ({ balance, returnedCoins, specialMsg }) => {
  let msg;
  const convertedBalance = helpers.convertValueToPounds(balance);
  const { noMoney, noCoins, success } = constants.displayMessages;

  switch(specialMsg) {
    case noMoney:
      msg = `Your balance (${convertedBalance}) is insufficient`;
      break;
    case noCoins:
      msg = "Not enough coins available to complete this operation"
      break;
    case success:
      const coinText = returnedCoins.length ? `Your change is ${helpers.usedCoinText(returnedCoins)}`: '';
      msg = `Transaction complete! ${coinText}`;
      break;
    default:
      break;
  }

  return <div>
           <div>Balance: {convertedBalance}</div>
           {msg}
         </div>
}

export default Display;