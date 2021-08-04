import React, { useContext } from "react";
import CartContext from '../store/cart-context'
import MarketContext from '../store/market-context'

const ItemList = () => {
  const cartCtx = useContext(CartContext)
  const marketCtx = useContext(MarketContext)
  const marketItems = marketCtx.items

  const handleAddToCart = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const itemList = marketItems.map((item) => {
    return (
      <div className="border">
        <h1>
          {item.name} - {item.price.toFixed(2)}
          <button onClick={() => handleAddToCart(item)}>add</button>
        </h1>
      </div>
    );
  });

  return (
    <div>
      {itemList}
    </div>
  );
}

export default ItemList;
