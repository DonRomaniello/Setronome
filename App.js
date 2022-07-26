import {
  Text,
  View,
  StyleSheet
 } from "react-native";

import ExpoLogo from "./assets/expo.svg";

import Acceleration from "./components/Acceleration";
import Acceleration2 from "./components/Acceleration2";


export default function App() {
  return (
    <View
      style={styles.container}
    >
      {/* <Text
      style={styles.header}>
        It works.
      </Text> */}
      {/* <Acceleration /> */}
      <Acceleration2 />
      {/* <Graph /> */}
      {/* <ExpoLogo width={120} height={120} fill="white" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D0D6B3",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header : {
    fontSize: 64
  }
});
