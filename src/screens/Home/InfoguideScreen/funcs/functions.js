import { View } from "react-native";
import { WaveIndicator } from "react-native-indicators";

export const sortedDatas = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    return a.descr.localeCompare(b.descr);
  });
  return sortedData;
};

export const loading = (isLoading) => {
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <WaveIndicator key={Math.random()} color="#D64D43" />
      </View>
    );
  }
};

export const showPopUp = (showPopup, setShowPopup) => {
  if (showPopup) {
    const timeout = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }
};
