import React, {useState} from 'react';
import './App.css';
import ItemForm from './components/ItemForm'

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

const cartList = cartItems.map(item => {
  return (
    <div className="border">
      <h1>
        {item.name} - {item.price}
      </h1>
    </div>
  );
})

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
