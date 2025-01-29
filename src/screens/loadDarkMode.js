import AsyncStorage from '@react-native-async-storage/async-storage';

export function loadDarkMode(setIsDarkMode){
  const loadDarkModePreference = async () => {
    try {
      const preference = await AsyncStorage.getItem('darkMode');
      if (preference !== null) {
        setIsDarkMode(JSON.parse(preference));
      }
    } catch (error) {
      console.log('Error loading dark mode preference:', error);
    }
  }

  loadDarkModePreference();
}