import React from 'react'
import { render } from '@testing-library/react'
import { shallow } from 'enzyme'
import Trade from '../Trade/Trade'



describe('<Trade /> component', () => {   
    /*
        Potential data model: Position
        {
            ticker: 'TSLA',
            positionOpenPrice: '1.23',
            positionQuantity: 8,
            positionClosePrice: '',
            positionStatus: 'Open/Closed',
            positionOpened: '10/18/19'
        }
    */
    let container
    let position

    beforeEach(() => {
        position = {
            ticker: 'TSLA',
            positionOpenPrice: '3.54',
            positionQuantity: 8,
            positionClosePrice: '',
            positionStatus: 'Open',
            positionOpened: '10/18/19'
        }

        container = shallow (<Trade position = {position} />)
    });

    describe('basic UI rendering ', () => {
        it('should contain the stock ticker', () => {
            expect(container.text()).toMatch(/TSLA/)
        });

        it('should contain the position open price', () => {
            expect(container.text()).toMatch(/3.54/)
        });

        it('should contain both...', () => {
            expect(container.text()).toMatch(/TSLA.*3.54/)
        });

        it('should contain all', () => {
            expect(container.text()).toMatch(/TSLA.*3.54.*8.*Open.*10\/18\/19/)
        });
    });
})
