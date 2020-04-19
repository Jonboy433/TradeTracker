import * as helpers from '../helpers'

test('tickerValidator to return false with invalid ticker', () => {
    // Ticker value of 123 is not valid
    
    expect(helpers.tickerValidator('123')[0]).toBeFalsy()
});

test('tickerValidator to return true with valid ticker', () => {
    // Ticker value of TSLA is valid
    
    expect(helpers.tickerValidator('TSLA')[0]).toBe(true)
});

test('priceValidtor should only allow numerical values', () => {
    expect(helpers.priceValidator(1.45)[0]).toBe(true)
    expect(helpers.priceValidator('1.45')[0]).toBe(true)
    expect(helpers.priceValidator('TSLA')[0]).toBe(false)
});

test('quantityValidator should only allow whole integers', () => {
    expect(helpers.quantityValidator('AB')[0]).toBe(false)
    expect(helpers.quantityValidator(1.25)[0]).toBe(false)
    expect(helpers.quantityValidator(25)[0]).toBe(true)
});