import React, { useContext } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import COLORS from '../cores/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import themeContext from '../cores/themeContext';

const Input = ({ 
    label, 
    iconName, 
    error, 
    password, 
    onFocus=()=>{}, 
    ...props
}) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hidePassword, setHidePassword] = React.useState(password)
    const theme = useContext(themeContext)
    return (
        <View style={{marginBottom: 20}}>
            <Text style={[style.label, {color: theme.color}]}>{label}</Text>
            <View 
                style={[
                    style.inputContainer, 
                    {
                        borderColor: error 
                            ? COLORS.red 
                            : isFocused 
                            ? COLORS.darkBlue 
                            : COLORS.light
                    }
                ]}>
                <Icon 
                    name={iconName} 
                    style={{fontSize: 24, color: COLORS.darkBlue, marginRight: 10}}
                />
                <TextInput
                    secureTextEntry={hidePassword}
                    placeholderTextColor={'grey'}
                    autoCorrect={false}
                    onFocus={()=>{
                        onFocus()
                        setIsFocused(true)
                    }}
                    onBlur={()=>{
                        setIsFocused(false)
                    }} 
                    style={{color: COLORS.darkBlue, flex: 1}} 
                    {...props}
                />
                {password && (
                    <Icon 
                        onPress={()=>setHidePassword(!hidePassword)}
                        style={{fontSize: 24, color: COLORS.darkBlue}} 
                          name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
                    />
                )}
          
            </View>
            {error && (
                <Text style={{color: COLORS.red, fontSize: 12, marginTop: 7}}>{error}</Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    label: {
        marginVertical: 5,
        fontSize: 14
    },
    inputContainer: {
        height: 48,
        backgroundColor: COLORS.light,
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius:10,
        alignItems: 'center'
    }
})

export default Input;