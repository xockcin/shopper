import React, {useState} from 'react';
import './App.css';

const stores = ["Pemberton", "Market Basket", "Trader Joes"]

const mbItems = [
  {
    name: "Cabot Greek Yogurt",
    price: 3.69
  },
  {
    name: "Cabot Cheddar Cheese",
    price: 8.99
  },
  {
    name: "Nellie's Eggs",
    price: 3.69
  },
  {
    name: "Teddie Peanut Butter",
    price: 2.99
  }
]

const cartItems = []

const storeList = stores.map(store => {
  return (
    <div className="border">
      <h1>{store}</h1>
    </div>
  )
})

const cartList = cartItems.map(item => {
  return (
    <div className="border">
      <h1>
        {item.name} - {item.price}
      </h1>
    </div>
  );
})


  const ItemForm = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    return (
      <form action="">
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

function App() {
  const [marketItems, setMarketItems] = useState(mbItems)
  const [cartItems, setCartItems] = useState([])

  const handleAddToCart = (item) => {
    const currentItems = cartItems
    setCartItems(currentItems.concat(item))
  }

  const cartList = cartItems.map((item) => {
    return (
      <div className="border">
        <h1>
          {item.name} - {item.price}
        </h1>
      </div>
    );
  });

  const itemList = mbItems.map((item) => {
    return (
      <div className="border" onClick={() => handleAddToCart(item)}>
        <h1>
          {item.name} - {item.price}
          <button>add</button>
        </h1>
      </div>
    );
  });

  return (
    <div className="row">
      <div className="column">
        {itemList}
        <ItemForm />
      </div>
      <div className="column">
        {cartList}
      </div>
    </div>
  );
}

export default App;
