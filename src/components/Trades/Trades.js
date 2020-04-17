import React, { Component } from 'react'
import Trade from '../Trade/Trade'
import NewTrade from '../NewTrade/NewTrade'
import axios from 'axios'

export default class Trades extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // initial state is undefined
            positions: undefined,
            showNewTradeWindow: false
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

    /**
     * 
     * Add a trade
     * @param {string} ticker - The ticker for the position
     * @param {string} price - The open price for the position
     * @param {string} quantity - Number of shares/contracts opened
     * @returns List of positions
     * @memberof Trades
     */
    /* postTradeHandler = (ticker, purchasePrice, quantity) => {        
        
        let data
        axios.post('/api/v1/positions', data )
    } */

    updateTradeHandler = (tradeId) => {

        // Grab the first item in the filtered array
        const updateTrade = this.state.positions.filter((pos) => pos.id === tradeId)[0]

        axios.put(`/api/v1/positions/${tradeId}`, updateTrade)
            .then()
    }

    /**
     * Delete a trade
     * @param {string} tradeId - ID of the trade to be deleted
     * @memberof Trades
     */
    deleteTradeHandler = (tradeId) => {

        axios.delete(`/api/v1/positions/${tradeId}`)
            .then()
    }

    newTradeToggleHandler = (isVisible) => {
        // Toggle visibility for the new trade window
        this.state.showNewTradeWindow === true ? 
        this.setState({showNewTradeWindow: false}) : this.setState({showNewTradeWindow: true})
    }
  
    componentDidMount() {
        // Make API call to get list of trades
        this.getTrades();
    }

    render = () => {
        let tradeWindow
        let newTradeWindow
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

        if (this.state.showNewTradeWindow === true) {
            // Show the window
            newTradeWindow = <NewTrade onSubmitClick={ () => this.postTradeHandler('TSLA',1.25,1)} onCancelClick={ ()=> this.newTradeToggleHandler}/>
        }
        else {
            // Don't show it
            newTradeWindow = undefined
        }
        
        return (
                <div>
                    <div id='trades'>
                        { tradeWindow }
                    </div>
                    <button id='btn-trade-new' onClick={ this.newTradeToggleHandler }>Add New</button>
                        { newTradeWindow }
                </div>
                )
        }
}