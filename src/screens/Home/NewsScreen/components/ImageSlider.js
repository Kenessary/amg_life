import * as React from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const DEVICE_WIDTH = Dimensions.get("window").width;

class ImageSlider extends React.Component {
  scrollRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      selectIndex: 0,
    };
  }

  componentDidMount = () => {
    this.autoScroll = setInterval(() => {
      this.setState(
        (prev) => ({
          selectIndex:
            prev.selectIndex === this.props.images.length - 1
              ? 0
              : prev.selectIndex + 1,
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            y: 0,
            x: DEVICE_WIDTH * this.state.selectIndex,
          });
        }
      );
    }, 10000);
  };

  componentWillUnmount() {
    clearInterval(this.autoScroll);
  }

  setSelectedIndex = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    const selectIndex = Math.floor(contentOffset / viewSize);
    this.setState({ selectIndex });
  };

  render() {
    const { images } = this.props;
    const { selectIndex } = this.state;
    return (
      <>
        <View style={{ height: 300, width: "100%" }}>
          <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={this.setSelectedIndex}
            ref={this.scrollRef}
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%" }}
            contentContainerStyle={{ width: DEVICE_WIDTH * images.length }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.backgroundImage}
              />
            ))}
          </ScrollView>
          <View style={styles.circleDiv}>
            {images.map((image, i) => (
              <View
                key={i}
                style={[
                  styles.whiteCircle,
                  { backgroundColor: i === selectIndex ? "#D64D43" : "white" },
                ]}
              />
            ))}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: DEVICE_WIDTH,
    height: 300,
  },
  circleDiv: {
    position: "absolute",
    bottom: 15,
    height: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    alignSelf: "center",
    borderRadius: 10,
  },
  whiteCircle: {
    width: 7,
    height: 7,
    borderRadius: 10,
    margin: 7,
    backgroundColor: "#fff",
  },
});

export { ImageSlider };
