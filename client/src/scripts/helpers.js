import constants from "./constants";

const helpers = {
  calculateBalance: (coinList) => {
    const insertedCoins = coinList.filter(c => c.user_supplied === true);
    return insertedCoins.reduce((total, coin) => total += coin.value, 0);
  },

  convertValueToPounds: (value) => {
    return `£ ${(value / 100).toFixed(2)}`;
  },

  usedCoinText: (usedCoins) => {
    return usedCoins.reduce((text, coin) => (text += `${coin.label} `), "").trim();
  },

  deserializeCoins: (serializedCoins) => {
    return serializedCoins.map(coin => {
      const template = constants.coinList.find(c => c.value === coin.value);
      return { ...coin, ...template };
    });
  },

  mintCoin: (value, quantity) => {
    const coin = constants.coinList.find(c => c.value === value);

    let coinList = [...Array(quantity).keys()]
    return coinList.map(c => ({...coin}));
  },

  groupCoins: (coinInventory) => {
    const initialGroups = constants.coinList.map(c => ({...c, quantity: 0}));

    return coinInventory.reduce((groups, coin) => {
      let group = groups.find(g => g.value === coin.value);
      group.quantity += 1;

      return groups;
    }, initialGroups);
  }
}

export default helpers;