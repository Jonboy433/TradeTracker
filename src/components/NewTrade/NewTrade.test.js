import React from 'react'
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react'
import Trades from '../Trades/Trades'
import mockAxios from 'axios'


describe('NewTrade', () => {
    beforeEach(() => {
        
    });

    afterEach( () => {
        //jest.clearAllMocks()
        cleanup()
    })

    describe('API calls', () => {
        
        test('should should send a post request with the correct trade details', async () => {
            const { getByText, getByPlaceholderText } = render(<Trades />)

            // Find the Add New button and click it
            const addNewBtn = await waitForElement (() => getByText(/Add New/))
            expect(addNewBtn).not.toBeNull();
            fireEvent.click(addNewBtn)

            // find text fields and enter new trade data
            // Ticker: TSLA; Price: 2.45; Quantity: 1
            const tickerInput = await waitForElement( () => getByPlaceholderText('Ticker'))
            const priceInput = await waitForElement( () => getByPlaceholderText('Price'))
            const quantityInput = await waitForElement( () => getByPlaceholderText('Quantity'))
            
            fireEvent.change(tickerInput, { target: {value: 'AAPL'}})
            fireEvent.change(priceInput, { target: {value: 1.23}})
            fireEvent.change(quantityInput, { target: {value: 1}})

            // Click submit button
            const submitBtn = getByText(/Submit Trade/)
            fireEvent.click(submitBtn)

            // Verify the post details are correct
            expect(mockAxios.post).toHaveBeenCalled();
            expect(mockAxios.post).toHaveBeenCalledWith('/api/v1/positions', {
                ticker: 'AAPL',
                purchasePrice: '1.23',
                quantity: '1'
            });
            expect(mockAxios.post).toHaveBeenCalledTimes(1);
        });
    });
});