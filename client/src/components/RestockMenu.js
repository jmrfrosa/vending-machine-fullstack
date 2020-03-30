import React from "react";
import helpers from "../scripts/helpers";
import constants from "../scripts/constants";

class RestockMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productPrice: "",
      productStock: ""
    }
  }

  handleInputs(evt) {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value
    });
  }

  renderProductTable(products) {
    const productList = products.map((p, idx) =>
      <tr key={`${p.name}_${idx}`}>
        <td>{p.name}</td>
        <td>{helpers.convertValueToPounds(p.price)}</td>
        <td>{p.stock}</td>
        <td>
          <button type="button" onClick={() => this.props.removeProduct(p.id)}>
            Remove
          </button>
        </td>
      </tr>
    )

    const inputList = constants.productAttributes.map(attr =>
      <td key={attr.name}>
        <input type={attr.type}
              name={`product${attr.name}`}
              placeholder={attr.name}
              onChange={this.handleInputs.bind(this)}/>
      </td>
    )

    return <table>
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Price</th>
                 <th>Stock</th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
               {productList}
               <tr>
                 {inputList}
                 <td>
                   <button type="button"
                           onClick={() => this.props.addProduct({...this.state})}>+</button>
                 </td>
               </tr>
             </tbody>
           </table>
  }

  renderCoinTable(groupedCoins) {
    const coinList = groupedCoins.map((c, idx) =>
      <tr key={`${c.label}_${idx}`}>
        <td>{c.label}</td>
        <td>{helpers.convertValueToPounds(c.value)}</td>
        <td>{c.quantity}</td>
        <td className="btn-group">
          <button type="button"
                  onClick={() => this.props.addCoin(c.value)}>+</button>
          <button type="button"
                  disabled={c.quantity < 1}
                  onClick={() => this.props.removeCoin(c.value)}>-</button>
        </td>
      </tr>
    )

    return <table>
             <thead>
               <tr>
                 <th>Label</th>
                 <th>Value</th>
                 <th>Quantity</th>
                 <th></th>
               </tr>
             </thead>
             <tbody>
               {coinList}
             </tbody>
           </table>
  }

  render() {
    const { products, coins } = this.props;

    return <div className="modal">
             <input id="restock-menu" type="checkbox" />
             <label htmlFor="restock-menu" className="overlay"></label>
             <article>
               <div className="restock-menu">
                 <div className="restock-table product-table">
                   <h3>Product Inventory</h3>
                   {this.renderProductTable(products)}
                 </div>
                 <div className="restock-table coin-table">
                   <h3>Coin Inventory</h3>
                   {this.renderCoinTable(helpers.groupCoins(coins))}
                 </div>
               </div>
             </article>
         </div>
  }
}

export default RestockMenu;