import helpers from "../scripts/helpers";

it("mints coins", () => {
  const newCoin = helpers.mintCoin(10, 2);
  expect(newCoin).toMatchObject([
    { label: '10p', value: 10 },
    { label: '10p', value: 10 }
  ]);
});

it("groups coins", () => {
  const coinList = [
    { label: '10p', value: 10 },
    { label: '20p', value: 20 },
    { label: '10p', value: 10 }
  ]

  const expectedGroups = [
    { label: "1p" , value: 1 , quantity: 0 },
    { label: "2p" , value: 2 , quantity: 0 },
    { label: "5p" , value: 5 , quantity: 0 },
    { label: '10p', value: 10, quantity: 2 },
    { label: '20p', value: 20, quantity: 1 },
    { label: "50p", value: 50, quantity: 0 },
    { label: "£1" , value: 100, quantity: 0 },
    { label: "£2" , value: 200, quantity: 0 }
  ]

  expect(helpers.groupCoins(coinList)).toMatchObject(expectedGroups);
});

it("converts values to pounds", () => {
  const value1 = 233;
  const value2 = 5;
  const value3 = 0;
  
  expect(helpers.convertValueToPounds(value1)).toEqual("£ 2.33");
  expect(helpers.convertValueToPounds(value2)).toEqual("£ 0.05");
  expect(helpers.convertValueToPounds(value3)).toEqual("£ 0.00");
});

it("converts coin lists to text", () => {
  const coinList = [
    ...helpers.mintCoin(50, 2),
    ...helpers.mintCoin(100, 1),
    ...helpers.mintCoin(1, 2)
  ];

  expect(helpers.usedCoinText(coinList)).toEqual("50p 50p £1 1p 1p");
})