import React, {useState} from 'react';
import './App.css';
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import Cart from './components/Cart'
import CartProvider from './store/CartProvider'


function App() {
  return (
    <CartProvider>
      <div className="row">
        <div className="column">
          <h1>items</h1>
          <ItemList />
        </div>
        <div className="column">
          <h1>cart</h1>
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
