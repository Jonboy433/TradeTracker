const globals = require('./globals')

export function tickerValidator(ticker) {
    const validTickerRegex = /^[A-Za-z]{1,4}$|^[A-Za-z]{1,4}[0-9]{6}[A-Za-z]{1}[1-9]{1}[0-9]{1,5}$/
    
    if (ticker === "") {
        return [false, globals.TRADE_TICKER_REQUIRED]
    }

    if (ticker.toString().match(validTickerRegex) === null) {
        
        return [false, globals.TRADE_TICKER_INVALID]
    }
    
    return [true,'']
}

export function priceValidator(price) {
    // Regex allows for:
    // - whole numbers without a period e.g. 15
    // - numbers with both cents provided e.g. 2.54
    // - numbers with first cent e.g. 11.2 (we will autofill with 0)
    const validPriceRegex = /^[+-]?[1-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/

    if (price === "") {
        return [false, globals.TRADE_PRICE_REQUIRED]
    }

    if (price.toString().match(validPriceRegex) === null) {
        
        return [false, globals.TRADE_PRICE_INVALID]
    }
    
    return [true,'']
    
}

export function quantityValidator(quantity) {
    const validQuantityRegex = /^[1-9]{1,6}$/

    if (quantity === "") {
        return [false, globals.TRADE_QUANTITY_REQUIRED]
    }

    if (quantity.toString().match(validQuantityRegex) === null) {
        
        return [false, globals.TRADE_QUANTITY_INVALID]
    }
    
    return [true,'']
}
