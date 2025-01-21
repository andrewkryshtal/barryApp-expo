import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { AddProfilePicScreen } from "../screens/AddProfilePicScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { NavigationIndependentTree } from "@react-navigation/native";

export const LoginNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
};
