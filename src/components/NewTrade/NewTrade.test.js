import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import NewTrade from '../NewTrade/NewTrade'
import mockAxios from 'axios'

describe('NewTrade', () => {
    
    beforeEach(() => {

    });

    afterEach( () => {
        jest.clearAllMocks()
        cleanup()
    })

    describe('UI', () => {
        test('should call cancel function when clicked', () => {
            const mockCancelFn = jest.fn()
            const { getByText } = render(<NewTrade onCancelClick={mockCancelFn}/>)
            
            const cancelBtn = getByText(/Cancel/)
            fireEvent.click(cancelBtn)
            
            expect(mockCancelFn).toHaveBeenCalled();
            expect(mockCancelFn).toHaveBeenCalledWith(false);
            expect(mockCancelFn).toHaveBeenCalledTimes(1);
        })
        
        
        test('should not display validation error on first render', () => {
            const { queryByText } = render(<NewTrade onCancelClick={jest.fn()}/>)

            const errMsg = queryByText(/Ticker is required/i)

            expect(errMsg).toBeNull();
        });

        test('should display proper validation error', () => {
            const { queryByText, getByText } = render(<NewTrade onCancelClick={jest.fn()}/>)
          
            const submitBtn = getByText(/Submit Trade/i)
            fireEvent.click(submitBtn)
            let errMsgPrice = queryByText(/Price is required/i)
            let errMsgQuantity = queryByText(/Quantity is required/i)
            expect(errMsgPrice).not.toBeNull();
            expect(errMsgQuantity).not.toBeNull(); 
        });
        
        test('should only display validation error after form submission', () => {
            // Stock tickers are 3 or 4 alpha characters only
            // Options are different e.g. TSLA200515C590 or CCL200417C10
            const { queryByText, getByText, getByPlaceholderText } = render(<NewTrade onCancelClick={jest.fn()}/>)

            // find text fields and enter invalid data
            // Ticker: 456; Price: 2.45; Quantity: 1
            const tickerInput = getByPlaceholderText(/Ticker/i)

            fireEvent.change(tickerInput, { target: {value: ''}})

            const submitBtn = getByText(/Submit Trade/i)
            
            let errMsg = queryByText(/Ticker is required/i)
            expect(errMsg).toBeNull();
            
            fireEvent.click(submitBtn)
            
            errMsg = queryByText(/Ticker is required/i)
            expect(errMsg).not.toBeNull();
        });

        test('should prevent submit if form is not valid', () => {
            const { getByText, getByPlaceholderText } = render(<NewTrade onCancelClick={jest.fn()}/>)

            // find text fields and enter invalid data
            // Ticker: 456; Price: 2.45; Quantity: 1
            const tickerInput = getByPlaceholderText(/Ticker/i)
            const priceInput = getByPlaceholderText(/Price/i)
            const quantityInput = getByPlaceholderText(/Quantity/i)

            fireEvent.change(tickerInput, { target: {value: '456'}})
            fireEvent.change(priceInput, { target: {value: 1.23}})
            fireEvent.change(quantityInput, { target: {value: 1}})

            // Click submit button
            const submitBtn = getByText(/Submit Trade/i)
            fireEvent.click(submitBtn)

            expect(mockAxios.post).not.toHaveBeenCalled();
        })
        
    });

    describe('API calls', () => {
        
        test('should should send a post request with the correct trade details', () => {
            const { getByText, getByPlaceholderText } = render(<NewTrade onCancelClick={jest.fn()}/>)

            // find text fields and enter new trade data
            // Ticker: TSLA; Price: 2.45; Quantity: 1
            const tickerInput = getByPlaceholderText(/Ticker/i)
            const priceInput = getByPlaceholderText(/Price/i)
            const quantityInput = getByPlaceholderText(/Quantity/i)

            fireEvent.change(tickerInput, { target: {value: 'AAPL'}})
            fireEvent.change(priceInput, { target: {value: 1.23}})
            fireEvent.change(quantityInput, { target: {value: 1}})

            // Click submit button
            const submitBtn = getByText(/Submit Trade/i)
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