import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function PlaySound() {
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/CanClick.mp3')
    );
    setSound(sound);

    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}


const styles = StyleSheet.create({
  header : {
    fontSize: 32,
    padding: 10,
  }
});
