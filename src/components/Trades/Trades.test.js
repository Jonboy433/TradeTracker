import React from 'react'
import { render, cleanup, waitForElement, fireEvent, wait, waitForElementToBeRemoved } from '@testing-library/react'
import Trades from '../Trades/Trades'
import mockAxios from 'axios'

describe('Trades', () => {

    beforeEach(() => {
        
    });

    afterEach( () => {
        //jest.clearAllMocks()
        cleanup()
    })

    describe('API call', () => {

        test('should request a list of trades only once on every load', () => {

            render(<Trades />)

            expect(mockAxios.get).toHaveBeenCalled();
            expect(mockAxios.get).toHaveBeenCalledTimes(1);
            expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/positions/');

        });

        test('should return a success/failure message', () => {
            
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
                positions: [{id: 'testId'}]
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
            mockAxios.get.mockImplementationOnce(() => Promise.resolve({data: {positions: [{id: 'testId'}]}}))
            const { findByTestId } = render (<Trades />)

            const trades = await waitForElement(() => findByTestId("positions") )
            expect(trades).not.toBeNull();
        });

        test('should display the correct number of positions', async () => {
            mockAxios.get.mockImplementationOnce(() => Promise.resolve({data: {positions:[{
                id: 1,
                ticker: 'TSLA',
                optionTicker: 'TSLA111519C270',
                purchasePrice: 1.35,
                closePrice: 2.00,
                status: 'Open',
                openDate: 11/15/19,
                closeDate: 11/16/19
            },{
                id: 2,
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

        test('should display an Add New button', async () => {

            const { getByText } = render (<Trades />)

            const addNewBtn = await waitForElement (() => getByText(/Add New/))
            expect(addNewBtn).not.toBeNull();
        });

        test('should make a trade editable when Edit is clicked', async () => {
            
            mockAxios.get.mockImplementationOnce(() => Promise.resolve({data: {positions:[{
                id: 1,
                ticker: 'TSLA',
                optionTicker: 'TSLA111519C270',
                purchasePrice: 1.35,
                closePrice: 2.00,
                status: 'Open',
                openDate: 11/15/19,
                closeDate: 11/16/19
            }]}}))

            const { getAllByText, getByLabelText } = render(<Trades />)
            const editBtn = (await waitForElement( () => getAllByText(/Edit/)))[0]
            
            fireEvent.click(editBtn)

            // Check for input fields
            const inputField = getByLabelText(/Ticker:/)
            expect(inputField).not.toBeNull();
            
        });

        test('should make sure new trade window is not visible by default', () => {
            
            const { queryByPlaceholderText } = render (<Trades />)
            // Component should not be found
            const comp = queryByPlaceholderText(/Ticker/)
            expect(comp).toBeNull();
        });

        test('should display the new trade window when Add New is clicked', async () => {

            const { getByText, queryByPlaceholderText } = render (<Trades />)
            
            // Component should not be found yet
            const comp = queryByPlaceholderText(/Ticker/)
            expect(comp).toBeNull();

            // Click the Add New Button
            const addNewBtn = getByText(/Add New/)
            fireEvent.click(addNewBtn)

            // Check that the component is now available
            const inputTicker = (await waitForElement( () => queryByPlaceholderText(/Ticker/)))
            expect(inputTicker).not.toBeNull();
        });

        test('should remove the new trade window when the Cancel button is clicked', async () => {
            
            const { getByText, queryByText, debug } = render (<Trades />)
            
            // Find Add New button and click it\
            const addNewBtn = getByText(/Add New/)
            fireEvent.click(addNewBtn)

            // Check if component is visible
            let componentHeader = queryByText(/Submit a new trade/)
            expect(componentHeader).not.toBeNull();
            
            // Find and click Cancel button
            const cancelBtn = (await waitForElement( () => queryByText(/Cancel/)))
            expect(cancelBtn).not.toBeNull();
            fireEvent.click(cancelBtn)

            // Make sure the component is no longer visible
            componentHeader = queryByText(/Submit a new trade/)
            expect(componentHeader).toBeNull();
            
            



        });
    });

    describe('Trade Management', () => {
       
        beforeEach(() => {
            mockAxios.get.mockImplementationOnce(() => Promise.resolve({data: {positions:[{
                id: 1,
                ticker: 'TSLA',
                optionTicker: 'TSLA111519C270',
                purchasePrice: 1.35,
                closePrice: 2.00,
                status: 'Open',
                openDate: 11/15/19,
                closeDate: 11/16/19
            },{
                id: 2,
                ticker: 'AAPL',
                optionTicker: 'TSLA111519C270',
                purchasePrice: 1.35,
                closePrice: 2.00,
                status: 'Open',
                openDate: 11/15/19,
                closeDate: 11/16/19
            }]}}))
        });

        test('should allow you to edit a trade', async () => {
            // Selet a trade

            // Make some changes

            // Submit changes
        });

        test('should make DELETE request with proper ID', async () => {
            // Calls the API when deleting a trade

            const { getAllByText } = render(<Trades />)
            // Find the Save button
            const deleteBtn = (await waitForElement(() => getAllByText(/Delete/)))[0]

            fireEvent.click(deleteBtn)

            expect(mockAxios.delete).toHaveBeenCalled();
            expect(mockAxios.delete).toHaveBeenCalledWith('/api/v1/positions/1');
            expect(mockAxios.delete).toHaveBeenCalledTimes(1);
        });

        test('should make PUT request with proper ID and payload', async () => {

            const { getAllByText } = render(<Trades />)
            // Find the Save button
            const saveBtns = await waitForElement(() => getAllByText(/Save/))

            // Click the button for first found node
            fireEvent.click(saveBtns[0])

            expect(mockAxios.put).toHaveBeenCalled();
            expect(mockAxios.put).toHaveBeenCalledWith('/api/v1/positions/1', {
                id: 1,
                ticker: 'TSLA',
                optionTicker: 'TSLA111519C270',
                purchasePrice: 1.35,
                closePrice: 2.00,
                status: 'Open',
                openDate: 11/15/19,
                closeDate: 11/16/19
            } );
            expect(mockAxios.put).toHaveBeenCalledTimes(1);
        });
    });
});