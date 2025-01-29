import AsyncStorage from "@react-native-async-storage/async-storage";

export const localeCheck = (locale) => {
  if (locale !== "") {
    AsyncStorage.setItem("appLanguage", locale);
  }
};

export const getLanguage = (setLang) => {
  try {
    AsyncStorage.getItem("appLanguage").then((value) => {
      if (value != null) {
        setLang(value);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
