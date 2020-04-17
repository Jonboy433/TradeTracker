export function tickerValidator(ticker) {
    const validTickerRegex = /[A-Za-z]{1,4}/

    return ticker.match(validTickerRegex) === null ? false : true
}

export function priceValidator(price) {
    // Regex allows for:
    // - whole numbers without a period e.g. 15
    // - numbers with both cents provided e.g. 2.54
    // - numbers with first cent e.g. 11.2 (we will autofill with 0)
    const validPriceRegex = /^[+-]?[1-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/

    return price.toString().match(validPriceRegex) === null? false: true
}

export function quantityValidator(quantity) {
    const validQuantityRegex = /^[1-9]{1,6}$/

    return quantity.toString().match(validQuantityRegex) === null? false : true
}