import React, { useState, useEffect } from 'react'
import * as helpers from '../../utils/helpers.js'
import axios from 'axios'

const NewTrade = (props) => {

const [newTradeTicker, setNewTradeTicker] = useState('')
const [newTradePrice, setNewTradePrice] = useState('')
const [newTradeQuantity, setNewTradeQuantity] = useState('')

// Form defaults to invalid on render
const [isFormValid,setFormValid] = useState(false)
const [errorMessages, setErrMsg] = useState({
    ticker: [],
    price: [],
    quantity: []
})

// Toggle to show the error messages or not
const [showErrors, setShowErrors] = useState(false)

useEffect(() => {
    //Should only run on first render
    checkFormValidity()
}, [])

// Validate form on every update
useEffect(() => {
           checkFormValidity()

}, [newTradeTicker, newTradePrice, newTradeQuantity])

const checkFormValidity = () => {
        const [isTickerValid, errorMessageTicker] = helpers.tickerValidator(newTradeTicker)
        const [isPriceValid, errorMessagePrice] = helpers.priceValidator(newTradePrice)
        const [isQuantityValid, errorMessageQuantity] = helpers.quantityValidator(newTradeQuantity)

        
        if (isTickerValid && isPriceValid && isQuantityValid) {
            setFormValid(true)

            // Ticker is now valid; clear out any errors
            setErrMsg({
                ticker: [],
                price: [],
                quantity: []
            })
           
        } else {
            setFormValid(false)

            setErrMsg({
                ...errorMessages,
                ticker: [errorMessageTicker],
                price: [errorMessagePrice],
                quantity: [errorMessageQuantity]
            })
        }
}

const submitHandler = (event) => {
    event.preventDefault()

    if (isFormValid) {
        setShowErrors(false)
        const data = {
            ticker: newTradeTicker,
            purchasePrice: newTradePrice,
            quantity: newTradeQuantity
        }

        axios.post(`/api/v1/positions`, data)
            .then()
    } else {
        setShowErrors(true)
    }

}

return <div>
    <form autoComplete="off" onSubmit={submitHandler}>
    <p>Submit a new trade</p>
    <input name="ticker" onChange={event => setNewTradeTicker(event.target.value)} type="text" placeholder='Ticker' />
    { (() => {
        if(showErrors) {
            return <span>{errorMessages.ticker}</span>
        }
    })()}
    <br />
    <input name="price" onChange={event => setNewTradePrice(event.target.value)} type="text" placeholder='Price' />
    { (() => {
        if(showErrors) {
            return <span>{errorMessages.price}</span>
        }
    })()}
    <br />
    <input name="quantity" onChange={event => setNewTradeQuantity(event.target.value)} type="text" placeholder='Quantity' />
    { (() => {
        if(showErrors) {
            return <span>{errorMessages.quantity}</span>
        }
    })()}
    <br />
    <button type="submit">Submit Trade</button>
    <button onClick={()=> {props.onCancelClick(false)}}>Cancel</button>
    </form>
</div> 

}

export default NewTrade