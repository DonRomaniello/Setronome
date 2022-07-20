import {
  Dimensions,
  Text,
  View,
  StyleSheet
} from "react-native";

import {
  LineChart,
} from "react-native-chart-kit";

/* Lovingly taken from https://www.npmjs.com/package/react-native-chart-kit */

export default Graph = (props) => {

  const {readings} = props

  return (
    <View>
    <Text>Bezier Line Chart</Text>
    <LineChart
      data={{
        datasets: [
          {
            data: (readings.length > 30) ? readings.slice(-30) : readings,
          },
          // {
          //   data: (readings.length > 30) ? readings.slice(-30).map((value) => value /2 ) : readings.map((value) => value / 2 )
          // }
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
