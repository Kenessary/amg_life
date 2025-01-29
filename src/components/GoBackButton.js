import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Colors } from "../styles/colors";

export const backButton = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.goBack()}
        style={{ paddingRight: 10 }}
      >
        <AntDesign name="left" size={24} color={Colors.smoothBlack} />
      </TouchableOpacity>
    </>
  );
};

export const departmenBackButton = (setDepartment, setShowed) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{ paddingRight: 15, marginBottom: 5 }}
      onPress={() => (setDepartment(""), setShowed(false))}
    >
      <AntDesign name="left" size={24} color={Colors.smoothBlack} />
    </TouchableOpacity>
  );
};
