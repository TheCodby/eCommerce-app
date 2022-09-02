import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreens from "./guest/OnboardingScreen";
import LoginScreen from "./guest/LoginScreen";
import SignupScreen from "./guest/SignupScreen";
const rightToLeftAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const Stack = createStackNavigator();
const GuestNavigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnBoarding" component={OnboardingScreens} />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={rightToLeftAnimation}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={rightToLeftAnimation}
      />
    </Stack.Navigator>
  );
};

export default GuestNavigations;

const styles = StyleSheet.create({});
