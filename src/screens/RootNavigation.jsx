import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import GuestNavigations from "./GuestNavigations";
import AuthNavigations from "./AuthNavigations";
import { useSelector } from "react-redux";
const MyTheme = {
  ...DefaultTheme,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
const RootNavigation = () => {
  const [auth, setAuth] = useState(false);
  const authData = useSelector((state) => state.auth.auth);
  useEffect(() => {
    if (authData?.token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [authData]);

  return (
    <Provider>
      <NavigationContainer theme={MyTheme}>
        {auth ? <AuthNavigations /> : <GuestNavigations />}
      </NavigationContainer>
    </Provider>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
