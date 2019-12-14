import React, { useState } from 'react';

const Trade = (props) => {

    const [trade, setTrade] = useState(props.position)
    const [editMode, setEditMode] = useState(false)

    function editHandler() {
        editMode ? setEditMode(false) : setEditMode(true)
    }

    return <div>
        { editMode ?
        <div>
        <div><label htmlFor="ticker">Ticker: </label><input type="input" id="ticker" defaultValue={props.position.ticker}></input></div><br />
        <div><label htmlFor="price">Price: </label><input type="input" id="price" defaultValue={props.position.positionOpenPrice}></input></div><br />
        <div><label htmlFor="quantity">Quantity: </label><input type="input" id="quantity" defaultValue={props.position.positionQuantity}></input></div><br />
        <div><label htmlFor="status">Status: </label><input type="input" id="status" defaultValue={props.position.positionStatus}></input></div><br />
        <div><label htmlFor="openDate">Date Opened: </label><input type="input" id="openDate" defaultValue={props.position.positionOpened}></input></div><br />
        </div>
        :
            <div>
        <div><label htmlFor="ticker">Ticker: </label>{props.position.ticker}</div><br />
        <div><label htmlFor="price">Price: </label>{props.position.positionOpenPrice}</div><br />
        <div><label htmlFor="quantity">Quantity: </label>{props.position.positionQuantity}</div><br />
        <div><label htmlFor="status">Status: </label>{props.position.positionStatus}</div><br />
        <div><label htmlFor="openDate">Date Opened: </label>{props.position.positionOpened}</div><br />
        </div>
        }
            <div>
            <span id='btnEditTrade'>
                    <button onClick={editHandler} data-testid="test">Edit</button>
            </span>
            <span id='btnSaveTrade'>
                <button onClick={props.onEditClick}>Save</button>
                <button onClick={editHandler}>Cancel</button>
                <button onClick={props.onDeleteClick}>Delete</button>
            </span> 
        </div>
        </div>
};

export default Trade;