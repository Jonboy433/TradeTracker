export default {
    // set default positions as empty array
    get: jest.fn(() => Promise.resolve(
        {
            data: {
                positions: []
            }
        }))
}