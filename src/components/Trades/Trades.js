import React, { Component } from 'react'
import Trade from '../Trade/Trade'
import axios from 'axios'

export default class Trades extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // initial state is undefined
            positions: undefined
        }
    }

    getTrades = () => {
        axios.get('/api/v1/positions/')
            .then((resp) => {
                this.setState({
                    positions: resp.data.positions
                })
            })
            .catch((err) => {})
    };

    updateTradeHandler = (tradeId) => {

        // Grab the first item in the filtered array
        const updateTrade = this.state.positions.filter((pos) => pos.id === tradeId)[0]

        axios.put(`/api/v1/positions/${tradeId}`, updateTrade)
            .then()
    }

    deleteTradeHandler = (tradeId) => {

        axios.delete(`/api/v1/positions/${tradeId}`)
            .then()
    }
  
    componentDidMount() {
        // Make API call to get list of trades
        this.getTrades();
    }

    render = () => {
        let tradeWindow
        let trades
        

        if(this.state.positions) {
            trades = this.state.positions.map(pos => <Trade key={pos.id} position={pos} 
                onEditClick={ ()=> this.updateTradeHandler(pos.id)}
                onDeleteClick={ () => this.deleteTradeHandler(pos.id)} />)
        }

        if (!this.state.positions) {
            tradeWindow = <span data-testid="loading">Loading...</span>;
        } 
        else {
        tradeWindow = this.state.positions.length > 0 ? <span data-testid="positions">{ trades } </span> : <span data-testid="no-positions">No positions found</span>
        }
        
        return (
                <div>
                    <div id='trades'>
                        { tradeWindow }
                    </div>
                    <button id='btn-trade-new'>Add New</button>
                </div>
                )
        }
}