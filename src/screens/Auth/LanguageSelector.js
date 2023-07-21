import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, LogBox, Dimensions, Image, Pressable, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from "@react-native-async-storage/async-storage"
import i18n from 'i18n-js'
import { kz, ru, ch } from '../../languages/localizations';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



export default function LanguageSelector({navigation}) {
  let [locale, setLocale] = useState('');
  let [lang, setLang] = useState('')

  i18n.fallbacks = true
  i18n.translations = { kz, ru, ch };
  i18n.locale = lang;
  i18n.defaultLocale = 'kz'
  globalThis.langyazik = locale

  useEffect(()=>{
    if(locale !== ''){
      AsyncStorage.setItem('appLanguage', locale)
    }
  })

  useEffect(()=>{
    getData()
})

const getData = () => { 
    try {
        AsyncStorage.getItem('appLanguage')
            .then(value => {
                if(value != null){
                  // console.log(value)
                    setLang(value)
                }
            })
        // setIsLoading(false)
    } catch(error){
        // setIsLoading(false)
        console.log(error)
    }
}
  
    return (
      <View style={{ alignItems:'center'}}>
        <View style={{width: windowWidth-20, height: 320, alignItems:'center'}}>
          <View style={{width:"100%", height:120, alignItems:'center', marginTop:30, borderColor:'#D9D9D9', borderWidth:1, borderRadius:15}}>
            <Text style={{fontSize:18, color:'#4D4D4D', marginTop:8}}>
            {i18n.t('selectLanguage')}
            </Text>

<View style={{flexDirection:'row', marginTop:10}}>
{/* <Button title="ҚАЗ" onPress={() => setLocale("kz")} /> */}
<TouchableOpacity onPress={() => setLocale("kz")} style={[lang === "kz" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Kazakhstan.jpg')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'kz' ? styles.selectedText : styles.text]}>ҚАЗ</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setLocale("ru")} style={[lang === "ru" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/Russia.png')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ru' ? styles.selectedText : styles.text]}>РУС</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setLocale("ch")} style={[lang === "ch" ? styles.buttonSelectedContainer : styles.buttonContainer]}>
  <Image source={require('../../../assets/flags/China.webp')} style={{width: 29, height:20, borderRadius:2, marginRight: 10 }}/>
  <Text style={[lang === 'ch' ? styles.selectedText : styles.text]}>中国人</Text>
</TouchableOpacity>
</View>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10, 
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#D9D9D9',
    borderWidth: 1,
    width:'30%',
    height:40,
    borderRadius:15,
    paddingLeft:10,
    paddingRight:10,
    marginLeft:5
  },
  buttonSelectedContainer: {
      marginTop: 10, 
      flexDirection:'row',
      alignItems:'center',
      borderColor:'tomato',
      borderWidth: 2,
      width:'30%',
      height:40,
      borderRadius:15,
      paddingLeft:10,
      paddingRight:10,
      marginLeft:5
    },
  text: {
    fontSize: 14,
    color: '#4D4D4D',
    paddingVertical: 4
  },
  selectedText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4D4D4D',
    paddingVertical: 4,

  }
});