import React, { useState } from 'react'
import * as helpers from '../../utils/helpers'
import axios from 'axios'

const NewTrade = (props) => {

const [newTradeTicker, setNewTradeTicker] = useState('')
const [newTradePrice, setNewTradePrice] = useState('')
const [newTradeQuantity, setNewTradeQuantity] = useState('')

const submitHandler = (event) => {
    event.preventDefault()

    if (isFormValid()) {
        const data = {
            ticker: newTradeTicker,
            purchasePrice: newTradePrice,
            quantity: newTradeQuantity
        }

        axios.post(`/api/v1/positions`, data)
            .then()
    }
}

const isFormValid = () => {
    return (
        helpers.tickerValidator(newTradeTicker) &&
        helpers.priceValidator(newTradePrice) &&
        helpers.quantityValidator(newTradeQuantity)
    )

}

return <div>
    <form autoComplete="off" onSubmit={submitHandler}>
    <p>Submit a new trade</p>
    <input name="ticker" onChange={event => {
        setNewTradeTicker(event.target.value)
        }} type="text" placeholder='Ticker' />
    <br />
    <input name="price" onChange={event => {
        setNewTradePrice(event.target.value)
        }} type="text" placeholder='Price' />
    <br />
    <input name="quantity" onChange={event => {
        setNewTradeQuantity(event.target.value)
        }} type="text" placeholder='Quantity' />
    <br />
    <button type="submit">Submit Trade</button>
    
    <button onClick={()=> {props.onCancelClick(false)}}>Cancel</button>
    </form>
</div> 
}

export default NewTrade