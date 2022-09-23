const { getTopCommonWords } = require('../utils')

describe('Test getTopCommonWords function', () => {

  test('Returns the top 3 most used words in string', () => {
    const testString = 'This is a test string. It should have some words like test that, have a high frequency to test the feature.'
    const expected = 'test, a, have'

    const topWords = getTopCommonWords(testString, 3)
    expect(topWords).toBe(expected)
  })

  test('Returns empty if empty string is provided', () => {
    const topWords = getTopCommonWords('', 3)
    expect(topWords).toBe('')

    const topWordsWithSpaces = getTopCommonWords('   ', 3)
    expect(topWordsWithSpaces).toBe('')
  })
})