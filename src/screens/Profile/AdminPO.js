import { Text, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import themeContext from '../../cores/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AdminPO() {
    const theme = useContext(themeContext)

    const [isDarkMode, setIsDarkMode] = useState(false)
  
    useEffect(() => {
      // Load the user's preference from AsyncStorage
      loadDarkModePreference();
    }, []);
  
    const loadDarkModePreference = async () => {
      try {
        const preference = await AsyncStorage.getItem('darkMode');
        if (preference !== null) {
          setIsDarkMode(JSON.parse(preference));
        }
      } catch (error) {
        console.log('Error loading dark mode preference:', error);
      }
    };
    return (
      <View style={{flex:1, backgroundColor:theme.background}}>
        <ScrollView>
        <View style={{alignItems:'center'}}>
            <View style={{width:windowWidth-20, borderWidth:1, paddingLeft:15, paddingRight:15, paddingTop:10, paddingBottom:10, borderRadius:15,marginTop: 20, borderColor:'#E4E4E4'}}>
                <Text style={{fontSize:16, fontWeight:'600', color:theme.color}}>Центр IT, отдел программного обеспечения</Text>
                {/* <View style={{width:'100%', height:1, backgroundColor:'black', marginTop:5}}/> */}
                <View style={{marginTop:15}}>

                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:theme.color}}>
                        Телефон: 
                    </Text>
                    <TouchableOpacity onPress={()=> Linking.openURL(`tel:${87132766272}`)} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#A3F596', padding:3, borderRadius:5}}>
                        <Entypo name="phone" size={15} color="#187D07" style={{marginRight:3}} />
                        <Text style={{color:'#187D07', fontWeight:'500'}}>+7 (7132) 76-62-72</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:16, color:theme.color}}>
                        E-mail: 
                    </Text>

                    <TouchableOpacity onPress={()=> Linking.openURL('mailto:munaygaz@cnpc-amg.kz')} style={{flexDirection:'row', alignItems:'center', marginLeft:7, backgroundColor:'#BAE6FD', padding:3, borderRadius:5}}>
                        <MaterialIcons name="email" size={15} color="#0A7699" style={{marginRight:3}} />
                        <Text style={{color:'#0A7699', fontWeight:'500'}}>support@cnpc-amg.kz</Text>
                    </TouchableOpacity> 

                    </View>
                    <View style={{flexDirection:'row', marginTop:5}}>
    
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <Text style={{fontSize:15, fontWeight: '500', color:theme.color}}>г. Актобе, пр-т 312 стрелковой дивизии, 3,{'\n'}кабинет 2207-2208</Text>
                </View>

            </View>
        </View>
        </ScrollView>

        
      </View>
    )
  
}