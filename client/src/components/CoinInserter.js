import React from "react";

const CoinInserter = ({ coin, insertCoin }) => {
  return <button type="button"
                 onClick={() => insertCoin(coin.value)}>
                   {coin.label}
         </button>
}

export default CoinInserter;