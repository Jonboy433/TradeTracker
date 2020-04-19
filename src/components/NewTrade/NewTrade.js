import React, { useState, useEffect } from 'react'
import * as helpers from '../../utils/helpers.js'
import axios from 'axios'

const NewTrade = (props) => {

const [newTradeTicker, setNewTradeTicker] = useState('')
const [newTradePrice, setNewTradePrice] = useState('')
const [newTradeQuantity, setNewTradeQuantity] = useState('')

// Form defaults to invalid on render
const [isFormValid,setFormValid] = useState(false)
const [errMsg, setErrMsg] = useState('')

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
    //if (!isFirstRender) {

        const [isTickerValid, errorMessageTicker] = helpers.tickerValidator(newTradeTicker)
        const [isPriceValid, errorMessagePrice] = helpers.priceValidator(newTradePrice)
        const [isQuantityValid, errorMessageQuantity] = helpers.quantityValidator(newTradeQuantity)

        if (isTickerValid && isPriceValid && isQuantityValid) {
            setFormValid(true)

            // Ticker is now valid; clear out any errors
            setErrMsg([])
        } else {
            setFormValid(false)
            setErrMsg(errorMessageTicker)
        }
    //}
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
            return <span>{errMsg}</span>
        }
    })()}
    <br />
    <input name="price" onChange={event => setNewTradePrice(event.target.value)} type="text" placeholder='Price' />
    <br />
    <input name="quantity" onChange={event => setNewTradeQuantity(event.target.value)} type="text" placeholder='Quantity' />
    <br />
    <button type="submit">Submit Trade</button>
    <button onClick={()=> {props.onCancelClick(false)}}>Cancel</button>
    </form>
</div> 

}

export default NewTrade