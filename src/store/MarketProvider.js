import { useReducer } from "react";
import {mbItems} from "../shared/items"

import MarketContext from "./market-context";

const defaultMarketState = {
  items: mbItems
}

const marketReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { items: state.items.concat(action.item) }
    case "REMOVE":
      return { items: state.items.filter((item) => item !== action.item) }
    default:
      return state
  }
}

const MarketProvider = (props) => {
  const [marketState, dispatchMarketAction] = useReducer(
    marketReducer,
    defaultMarketState
  )
  
  const handleAddMarketItem = (item) => {
    dispatchMarketAction({
      type: "ADD",
      item,
    })
  }

  const handleRemoveMarketItem = (id) => {
    dispatchMarketAction({
      type: "REMOVE",
      id,
    })
  }

  const marketContext = {
    items: marketState.items,
    addItem: handleAddMarketItem,
    removeItem: handleRemoveMarketItem
  }

  return (
    <MarketContext.Provider value={marketContext}>
      {props.children}
    </MarketContext.Provider>
  )
}

export default MarketProvider