import React from 'react';
import Product from './Product';
import CoinInserter from "./CoinInserter";
import Display from './Display';
import RestockMenu from './RestockMenu';

import helpers from "../scripts/helpers";
import constants from "../scripts/constants";
import connector from "../scripts/connector";

class Machine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInventory: [],
      coinInventory:    [],
      returnedCoins:    [],
      specialMsg:       false,
      isRestocking:     false
    }
  }

  componentDidMount() {
    // Initial load
    this.fetchProducts();
    this.fetchCoins();
  }

  fetchProducts() {
    return connector.getProductInventory()
                    .then(jsonResponse => {
                      this.setState({ productInventory: jsonResponse });
                    });
  }

  fetchCoins() {
    return connector.getCoinInventory()
                    .then(jsonResponse => {
                      const coins = helpers.deserializeCoins(jsonResponse);
                      this.setState({ coinInventory: coins });
                    });
  }

  async addCoin(value) {
    const coin = { coin: { value: value, user_supplied: false }};

    await connector.addCoin(coin);
    await this.fetchCoins();
  }

  async removeCoin(value) {
    await connector.removeCoin(value);
    await this.fetchCoins();
  }

  async addProduct(attributes) {
    const product = { product: {
      name:  attributes.productName,
      price: attributes.productPrice,
      stock: attributes.productStock,
    }};

    await connector.addProduct(product);
    await this.fetchProducts();
  }

  async removeProduct(productId) {
    await connector.removeProduct(productId);
    await this.fetchProducts();
  }

  async insertCoin(value) {
    const coin = { coin: { value: value, user_supplied: true } };

    await connector.addCoin(coin);
    await this.fetchCoins();

    this.clearDisplay();
  }

  async handleTransaction(productId) {
    const product = this.state.productInventory.find(p => p.id === productId);
    const clientAmount = helpers.calculateBalance(this.state.coinInventory);
    const remainAmount = clientAmount - product.price;

    if (remainAmount < 0) {
      this.setState({
        specialMsg: constants.displayMessages.noMoney
      });
      return;
    }

    const transactionData = await connector.buyProduct(productId);
    const { returns } = transactionData;

    if (returns) {
      this.fetchCoins();
      this.fetchProducts();

      this.setState({
        returnedCoins: helpers.deserializeCoins(returns),
        specialMsg: constants.displayMessages.success
      });
    } else {
      this.setState({
        specialMsg: constants.displayMessages.noCoins
      });
    }
  }

  clearDisplay() {
    this.setState({ specialMsg: false, returnedCoins: [] });
  }

  renderProducts(products) {
    return products.map(product => (
             <Product key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      stock={product.stock}
                      handleTransaction={this.handleTransaction.bind(this)}>
             </Product>
      ));
  }

  render() {
    const productList = this.renderProducts(this.state.productInventory);

    return <div className="vending-machine">
             <h3>Products</h3>
             <div className="flex three">
               {productList}
             </div>

            <div className="flex two">
              <div>
                <h3>Insert Coins</h3>
                <div>
                  {constants.coinList.map(coin => 
                    <CoinInserter key={coin.label}
                                  coin={coin}
                                  insertCoin={this.insertCoin.bind(this)}>
                    </CoinInserter>
                  )}
                </div>
              </div>
              <div>
                <h3>Display</h3>
                <Display balance={helpers.calculateBalance(this.state.coinInventory)}
                         returnedCoins={this.state.returnedCoins}
                         specialMsg={this.state.specialMsg}>
                </Display>
              </div>
            </div>

             <label htmlFor="restock-menu" className="button">
               Restock Machine
             </label>

             <RestockMenu products={this.state.productInventory}
                          coins={this.state.coinInventory}
                          addCoin={this.addCoin.bind(this)}
                          removeCoin={this.removeCoin.bind(this)}
                          addProduct={this.addProduct.bind(this)}
                          removeProduct={this.removeProduct.bind(this)}>
             </RestockMenu>

           </div>
  }
}

export default Machine;