import {
  Dimensions,
  Text,
  View,
} from "react-native";

import {
  LineChart,
} from "react-native-chart-kit";

/* Lovingly taken from https://www.npmjs.com/package/react-native-chart-kit */

let inputs = []

for (let i = 0; i < 100; i++){
  inputs.push(Math.sin(i/5))
}


export default GraphDummyData = () => {

  return (
    <View>
    <LineChart
      data={{
        datasets: [
          {
            data: inputs
          },
        ]
      }}
      width={Dimensions.get("window").width - 30} // from react-native
      height={Dimensions.get("window").width - 30}
      yAxisLabel=""
      yAxisSuffix="G"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#AAAE7F",
        backgroundGradientFrom: "#AAAE7F",
        backgroundGradientTo: "#7FAAAE",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "3",
          strokeWidth: "1",
          stroke: "#143109"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
      />
  </View>
  )
}
