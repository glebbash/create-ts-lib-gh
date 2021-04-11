import { add } from "./<%= LIBRARY_NAME %>";

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 2)).toBe(4);
  })
})
