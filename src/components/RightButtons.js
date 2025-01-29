import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const departmentRightButton = (
  depId,
  depFav,
  setFavourite,
  setDepFav,
  setShowPopup
) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setFavourite(depId);
        setDepFav(!depFav);
        setShowPopup(true);
      }}
    >
      {depFav ? (
        <FontAwesome
          name="bookmark"
          size={22}
          color="#FFC806"
          style={{ marginRight: 8 }}
        />
      ) : (
        <FontAwesome
          name="bookmark-o"
          size={22}
          color="#A7A7A7"
          style={{ marginRight: 8 }}
        />
      )}
    </TouchableOpacity>
  );
};
