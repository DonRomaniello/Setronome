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
                  return (array
                  .slice(idx, idx + windowWidth)
                  .reduce((a, b) => a + b) / windowWidth)
                })
}
