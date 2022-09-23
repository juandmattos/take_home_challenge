const countWords = (descStr) => {
  // Put the string in an array minus the , and .
  let descArr = descStr.replace(',', '').replace('.', '').split(' ')
  let output = {}

  // For each element, count the number of words
  for (let i=0; i < descArr.length; i++) {
    const word = descArr[i]
    if (output[word] === undefined) {
      output[word] = 1
    } else {
      output[word] += 1
    }
  }
  return output
}

// Check if string is '' or has only spaces
const isEmptyOrSpaces = (str) => {
  return str === null || str.match(/^ *$/) !== null
}

const getTopCommonWords = (descriptionString, maxCount) => {
  let topWords = ''
  let currentCount = 1

  // If we have no description or only spaces, return no common words
  if (isEmptyOrSpaces(descriptionString)) return ''

  const wordObj = countWords(descriptionString)
  // Transform the object into a map and sort it
  const sortedWordMap = Object.entries(wordObj).sort(([,a],[,b]) => b - a)

  // Return a string with the maxCount common words (in the API maxCount is 5)
  for (let [key, _] of sortedWordMap) {
    if (currentCount > maxCount) break
    if (currentCount < maxCount) {
      if (!isEmptyOrSpaces(key)) {
        topWords = topWords + key + ', '
      }
    } else {
      topWords = topWords + key
    }
    currentCount++
  }
  return topWords
}

module.exports = {
  getTopCommonWords
}
