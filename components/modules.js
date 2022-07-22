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
                                  flagTarget,
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

export const crossoverMatrixGenerator = (dimensions) => {
  let crossoverMatrix = []
  for (let i = 0; i < dimensions; i++) {
    let crossoverRow = [];
    for (let i = 0; i < dimensions; i++){
      crossoverRow.push([false, false])
    }
    crossoverMatrix.push(crossoverRow)
  }
  return crossoverMatrix
}
