import React, { useState, useContext } from 'react'
import MarketContext from "../store/market-context";

const ItemForm = (props) => {
  const marketCtx = useContext(MarketContext)

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    marketCtx.addItem({
      name,
      price: +price
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        price: $
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0.01"
          step="0.01"
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ItemForm