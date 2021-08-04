import React from "react";

const MarketContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default MarketContext;
