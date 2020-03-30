const constants = {
  coinList: [
    { label: "1p", value: 1 },
    { label: "2p", value: 2 },
    { label: "5p", value: 5 },
    { label: "10p", value: 10 },
    { label: "20p", value: 20 },
    { label: "50p", value: 50 },
    { label: "£1", value: 100 },
    { label: "£2", value: 200 }
  ],

  displayMessages: {
    success: "SUCCESS",
    noMoney: "NO_MONEY",
    noCoins: "NO_COINS"
  },

  productAttributes: [
    { name: "Name",  type: "text"   },
    { name: "Price", type: "number" },
    { name: "Stock", type: "number" }
  ],

  serverHost: "localhost",
  serverPort: "3000",
}

export default constants;