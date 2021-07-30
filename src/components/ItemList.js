import React, { useContext } from "react";
import CartContext from '../store/cart-context'

const mbItems = [
  {
    id: 1,
    name: "Cabot Greek Yogurt",
    price: 3.69,
  },
  {
    id: 2,
    name: "Cabot Cheddar Cheese",
    price: 8.99,
  },
  {
    id: 3,
    name: "Nellie's Eggs",
    price: 3.69,
  },
  {
    id: 4,
    name: "Teddie Peanut Butter",
    price: 2.99,
  },
];

const ItemList = () => {
  const cartCtx = useContext(CartContext)

  const handleAddToCart = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const itemList = mbItems.map((item) => {
    return (
      <div className="border">
        <h1>
          {item.name} - {item.price}
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
