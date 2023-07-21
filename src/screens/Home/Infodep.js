import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function Infodep({link_video}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: `http://www.cnpc-amg.kz/${link_video}`,
        }}
        useNativeControls
        resizeMode="contain"
        isMuted={false}
        volume={1.0}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom:10
  },
  video: {
    alignSelf: 'stretch',
    width: "100%",
    height: 250,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});