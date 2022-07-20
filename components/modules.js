export const getAverageOfEndOfArray = (
                                       array,
                                       samples,
                                       ) => {
  return (array.slice(samples * -1).reduce((a, b) => a + b) / samples);
}

export const crossoverDetector = (
                                  array,
                                  shortWindow,
                                  longWindow,



                                  ) => {

  getAverageOfEndOfArray(array, shortWindow)
  getAverageOfEndOfArray(array, longWindow)



}
