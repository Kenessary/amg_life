import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  LoginScreen,
  RegisterScreen,
  LanguageSelector,
  RestorePassword,
} from "../../screens";

import VerifyForget from "../../screens/Auth/VerifyForget";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ customAnimationOnGesture: false }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          customAnimationOnGesture: false,
          animation: "simple_push",
          animationDuration: 500,
        }}
      />
      <Stack.Screen
        name="VerifyForget"
        component={VerifyForget}
        options={{ animation: "fade_from_bottom", animationDuration: 400 }}
      />
      <Stack.Screen name="RestorePassword" component={RestorePassword} />
    </Stack.Navigator>
  );
};
export default AuthStack;
