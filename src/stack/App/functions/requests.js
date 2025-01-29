import AsyncStorage from "@react-native-async-storage/async-storage";

export const getPassword = async (
  setSecondPassword,
  setIsLoading,
  setIsCheckingPassword
) => {
  try {
    setIsLoading(true);
    const value = await AsyncStorage.getItem("secondPass");
    if (value != null) {
      setSecondPassword(value);
    }
    setIsLoading(false);
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  } finally {
    setIsCheckingPassword(false); // Stop checking once AsyncStorage is resolved
  }
};
