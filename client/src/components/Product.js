import React from "react";
import helpers from "../scripts/helpers";

const Product = ({ id, name, price, stock, handleTransaction }) => {
  return <div className="card">

           <header className="header">{name}</header>
           <section>
            <span className="price">{helpers.convertValueToPounds(price)}</span>
           </section>
           <section>
           <small>Stock: {stock}</small>
           </section>
           <footer>
            <button type="button"
                    disabled={stock < 1}
                    onClick={() => handleTransaction(id)}>
              Buy
            </button>
           </footer>
         </div>
}

export default Product;