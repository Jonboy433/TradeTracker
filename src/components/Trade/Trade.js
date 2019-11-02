import React from 'react';

const Trade = (props) => {

    return <div>
        <div>{props.position.ticker}</div><br />
        <div>{props.position.positionOpenPrice}</div><br />
        <div>{props.position.positionQuantity}</div><br />
        <div>{props.position.positionStatus}</div><br />
        <div>{props.position.positionOpened}</div><br />
        </div>
};

export default Trade;