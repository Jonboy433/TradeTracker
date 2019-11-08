import React from 'react';

const Trade = (props) => {

    return <div>
        <div>{props.position.ticker}</div><br />
        <div>{props.position.positionOpenPrice}</div><br />
        <div>{props.position.positionQuantity}</div><br />
        <div>{props.position.positionStatus}</div><br />
        <div>{props.position.positionOpened}</div><br />
        <div>
        <span id='btnEditTrade'>
                <button data-testid="test">Edit</button>
        </span>
        <span id='btnSaveTrade'>
            <button onClick={props.onEditClick}>Save</button>
            <button>Cancel</button>
            <button onClick={props.onDeleteClick}>Delete</button>
        </span> 
        </div>
        </div>
};

export default Trade;