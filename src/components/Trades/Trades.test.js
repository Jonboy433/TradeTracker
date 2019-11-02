import React from 'react'
import { render, debug, cleanup, getByTestId, queryByTestId, waitForElement, wait } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import Trades from '../Trades/Trades'
import mockAxios from 'axios'
//import axios from '../../__mocks__/axios';

describe('Trades', () => {

    beforeEach(() => {
        
    });

    afterEach( () => {
        jest.clearAllMocks()
    })

    describe('it should make an API call', () => {

        it('should request a list of trades only once on every load', () => {

            render(<Trades />)

            expect(mockAxios.get).toHaveBeenCalled();
            expect(mockAxios.get).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/positions/');

        });

        it('should return a success/failure message', () => {
            
        });
    });

    describe('UI', () => {

        test('shows a Loading message on first render', () => {
            const { queryByTestId } = render(<Trades />)

            // Should load immediately when the component renders
            const loading = queryByTestId("loading")
            expect(loading).not.toBeNull()
        });
              
        test('shows Loading message and then disappears after we get a response', async() => {

            mockAxios.get.mockImplementationOnce(() => Promise.resolve({data: {
                positions: [1,2,3]
            }}))

            const { queryByTestId, getByTestId, debug } = render(<Trades />)

            // Should find loading on render
            let loading = queryByTestId("loading")
            expect(loading).not.toBeNull()

            await waitForElement(() => getByTestId("positions"))
            
            // Should not find loading after API request
            loading = queryByTestId("loading")
            expect(loading).toBeNull()

        })

        test('shows a Not Found element if no trades are found', async () => {
            
            const { findByTestId } = render (<Trades />)

            const noTrades = await waitForElement(() => findByTestId("no-positions"))
            expect(noTrades).not.toBeNull();

        });

        test('shows a Positions element if trades are found', async () => {
            mockAxios.get.mockImplementationOnce(() => Promise.resolve({data: {positions: [1,2]}}))
            const { findByTestId } = render (<Trades />)

            const trades = await waitForElement(() => findByTestId("positions") )
            expect(trades).not.toBeNull();
        });

        it('should  display the correct number of positions', async () => {
            mockAxios.get.mockImplementationOnce(() => Promise.resolve({data: {positions:[{
                ticker: 'TSLA',
                optionTicker: 'TSLA111519C270',
                purchasePrice: 1.35,
                closePrice: 2.00,
                status: 'Open',
                openDate: 11/15/19,
                closeDate: 11/16/19
            },{
                ticker: 'AAPL',
                optionTicker: 'TSLA111519C270',
                purchasePrice: 1.35,
                closePrice: 2.00,
                status: 'Open',
                openDate: 11/15/19,
                closeDate: 11/16/19
            }]}}))

            const { getByText, findByTestId } = render (<Trades />)

            await waitForElement(() => findByTestId("positions"))
            const ticker1 = getByText(/TSLA/)
            const ticker2 = getByText(/AAPL/)

            expect(ticker1).toBeDefined()
            expect(ticker2).toBeDefined();

        });

        it('should display an Add New button', () => {

        });
    });

    describe('Trade Management', () => {
       
        it('should allow you to create a new trade', () => {
        
        });

        it('should allow you to delete a trade', () => {
        
        });

        it('should allow you to edit a trade', () => {
        
        });
    });
});