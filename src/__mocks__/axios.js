export default {
    // set default positions as empty array
    get: jest.fn(() => Promise.resolve(
        {
            data: {
                positions: []
            }
        })),
    put: jest.fn(() => Promise.resolve(
        {
            test: 'test'
        })),
    delete: jest.fn(() => Promise.resolve ({
            test: 'test'
        }))
}