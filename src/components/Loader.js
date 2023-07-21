import React from 'react'
import { View, StyleSheet, useWindowDimensions, ActivityIndicator, Text } from 'react-native';
import COLORS from '../cores/theme';

const Loader = ({visible = false}) => {
    const { width} = useWindowDimensions()
    return (
        visible && <View style={[style.container, {width}]}>
            <View style={style.loader}>
                <ActivityIndicator size='large' color={COLORS.blue}/>
                <Text style={{marginLeft: 10, fontSize: 18}}>Загрузка...</Text>
            </View>
        </View>
        
    );
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        height :"100%" 
    },
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    }
})

export default Loader;