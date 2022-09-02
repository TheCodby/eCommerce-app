import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./auth/MainScreen";
import { Avatar, IconButton } from "react-native-paper";
import { TextInput, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductScreen from "./auth/ProductScreen";
import CheckoutScreen from "./auth/CheckoutScreen";
const Stack = createStackNavigator();
const AuthNavigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: Colors.background.primary,
        },
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={({ navigator, route }) => ({
          title: route.params.product.name,
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: {
            elevation: 0,
            backgroundColor: "transparent",
          },
        })}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={({ navigator, route }) => ({
          title: "Checkout",
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: {
            elevation: 0,
            backgroundColor: "transparent",
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigations;

const styles = StyleSheet.create({});
