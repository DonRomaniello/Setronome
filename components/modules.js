const stats = require('stats-lite')

export const getAverageOfEndOfArray = (
                                       array,
                                       samples,
                                       ) => {
  return (
          array
          .slice(samples * -1)
          .reduce((a, b) => a + b)
          / samples
          );
}

export const crossoverDetector = (
                                  array,
                                  shortWindow,
                                  longWindow,
                                  flagTargetFunction,
                                  ) => {

  getAverageOfEndOfArray(array, shortWindow)
  getAverageOfEndOfArray(array, longWindow)
}

export const slidingWindow = (
                              array,
                              windowWidth
                              ) => {

    return array.map((entry, idx) => {

      let subArray = array.slice(idx, idx + windowWidth)

      return (subArray
              .reduce((a, b) => a + b) / subArray.length)
      })
}

export const crossoverMatrixGenerator = () => {
  let crossoverMatrix = []
  for (let i = 0; i < 3; i++) {
    let crossoverRow = [];
    for (let i = 0; i < 3; i++){
      let crossoverEntry = []
        for (let i = 0; i < 3; i++){
          crossoverEntry.push(false)
        }
      crossoverRow.push(crossoverEntry)
    }
    crossoverMatrix.push(crossoverRow)
  }
  return crossoverMatrix
}

export const statsBreakdown = (array) => {
  const std = stats.stdev(array)
  const variance = stats.variance(array)
  const mean = stats.mean(array)
  return {std, variance, mean}
}
