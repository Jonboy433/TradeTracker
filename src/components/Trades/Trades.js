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
  
    componentDidMount() {
        // Make API call to get list of trades
        this.getTrades();
    }

    render = () => {
        let tradeWindow
        let trades = []

        if(this.state.positions) {
            this.state.positions.forEach(pos => {
                trades.push(<Trade position={pos} />)
            }); 
        }

        if (!this.state.positions) {
            tradeWindow = <span data-testid="loading">Loading...</span>;
        } else if (this.state.positions.length === 0 ) {
            tradeWindow = <span data-testid="no-positions">No positions found</span>;
        } else if (this.state.positions.length >= 0)  {
            tradeWindow = <span data-testid="positions">{ trades }</span>;
        }

        return (
                <div>
                    <div id='trades'>
                        { tradeWindow }
                    </div>
                    <button id='btn-trade-new'></button>
                </div>
                )
        }
}