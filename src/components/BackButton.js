import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height"
import { Ionicons } from '@expo/vector-icons';

export default function BackButton({ goBack }){
    return(
        <TouchableOpacity onPress={goBack} style={styles.container}>
            {/* <Image 
                style={styles.image}
                source={require('../../assets/arrow_back.png')}
            /> */}
            <Ionicons name="ios-chevron-back" size={23} color="#4D4D4D" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 15 + getStatusBarHeight(),
        // left: 10,
        marginTop:0
    },
    image:{
        width: 18,
        height: 18,
        color: '#4D4D4D'
    }
})