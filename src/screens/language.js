import AsyncStorage from '@react-native-async-storage/async-storage';

export function multiLanguage(locale, setLang){
    if(locale !== ''){
        AsyncStorage.setItem('appLanguage', locale)
    }

    const getData = () => { 
        try {
          AsyncStorage.getItem('appLanguage')
          .then(value => {
            if(value != null){
              setLang(value)
            }
          })
        } catch(error){
          console.log(error)
        }
    }
    
    getData()
}