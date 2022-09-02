import {
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Button,
  Text,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import { Avatar, Divider, IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import CartScreen from "./CartScreen";
import { Colors } from "../../constants/Colors";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/auth";
import FavoritesScreen from "./FavoritesScreen";
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(logout());
  };
  return (
    <DrawerContentScrollView
      {...props}
      indicatorStyle={{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 10,
      }}
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          marginBottom: 10,
          marginStart: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          size={72}
          source={{
            uri: "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
          }}
        />
        <View style={{ marginStart: 10 }}>
          <Text style={{ fontSize: 16, fontFamily: "Inter_400Regular" }}>
            Ahmed Kotby
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: "Inter_400Regular",
              color: "grey",
            }}
          >
            Buyer
          </Text>
        </View>
      </View>
      <Divider />
      <View style={{ marginTop: 20 }}>
        <DrawerItemList {...props} />
      </View>
      <Divider style={{ height: 1.5, marginTop: 20 }} />
      <View>
        <DrawerItem
          onPress={doLogout}
          icon={({ size, icon }) => (
            <MaterialIcons name="logout" size={size} color={icon} />
          )}
          label="Logout"
          labelStyle={{ fontFamily: "Inter_500Medium" }}
          theme={{ colors: { text: "black" } }}
        />
      </View>
    </DrawerContentScrollView>
  );
};
const MainScreen = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({ navigation }) => ({
        drawerActiveBackgroundColor: Colors.secondary,
        drawerActiveTintColor: "white",
        drawerLabelStyle: { fontFamily: "Inter_500Medium" },
        header: () => (
          <View
            style={{
              padding: 10,
              marginTop: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  borderRadius: 24,
                  flex: 1,
                  marginStart: 10,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    padding: 10,
                  }}
                >
                  <AntDesign name="search1" size={24} color="black" />
                  <TextInput
                    placeholder="Search ..."
                    style={{
                      fontSize: 16,
                      marginStart: 5,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  icon={() => (
                    <Avatar.Image
                      size={30}
                      source={{
                        uri: "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg",
                      }}
                    />
                  )}
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            </View>
          </View>
        ),
      })}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          drawerIcon: ({ size, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          title: "Home",
        })}
      />
      <Drawer.Screen
        name="CategoriesScreen"
        component={CartScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
          title: "Categories",
        }}
      />
      <Drawer.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <AntDesign name="heart" size={size} color={color} />
          ),
          title: "Favorites",
        }}
      />
      <Drawer.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
          title: "My Cart",
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={CartScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
          title: "Settings",
          header: () => {},
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
