import {
  Text,
  View,
  StyleSheet
 } from "react-native";

import ExpoLogo from "./assets/expo.svg";

export default function App() {
  return (
    <View
      style={styles.container}
    >
      <Text
      style={styles.header}>
        It works.
      </Text>
      {/* <ExpoLogo width={120} height={120} fill="white" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header : {
    fontSize: 64
  }
});
