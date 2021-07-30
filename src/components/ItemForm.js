import React, { useState } from 'react'

const ItemForm = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  return (
    <form>
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