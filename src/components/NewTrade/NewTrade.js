import React, { useState } from 'react'
import axios from 'axios'

const NewTrade = (props) => {

const [newTradeTicker, setNewTradeTicker] = useState()
const [newTradePrice, setNewTradePrice] = useState()
const [newTradeQuantity, setNewTradeQuantity] = useState()

const submitHandler = () => {

    const data = {
        ticker: newTradeTicker,
        purchasePrice: newTradePrice,
        quantity: newTradeQuantity
    }
    
    axios.post(`/api/v1/positions`, data)
    .then()
}

return <div>
    <p>Submit a new trade</p>
    <input name="ticker" onChange={event => setNewTradeTicker(event.target.value)} type="text" placeholder='Ticker' />
    <br />
    <input name="price" onChange={event => setNewTradePrice(event.target.value)} type="text" placeholder='Price' />
    <br />
    <input name="quantity" onChange={event => setNewTradeQuantity(event.target.value)} type="text" placeholder='Quantity' />
    <br />
    <button onClick={submitHandler}>Submit Trade</button>
    <button onClick={props.onCancelClick()}>Cancel</button>
</div> 
}

export default NewTrade