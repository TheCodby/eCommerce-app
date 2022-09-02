import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { checkout } from "../../utils/backend/cart";

const CheckoutScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const [successed, setSuccessed] = useState(false);
  const [url, setUrl] = useState(false);
  let webview = null;
  useEffect(() => {
    async function fetchCheckout() {
      const response = await checkout();
      setUrl(response.links[1].href);
      setIsReady(true);
    }
    fetchCheckout();
  }, []);
  if (!isReady) {
    return null;
  }
  const handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (url.includes("/successed")) {
      webview.stopLoading();
      setSuccessed(true);
    }
  };
  if (successed) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <Image
          style={{ height: "50%", alignSelf: "center" }}
          resizeMode="contain"
          source={require("../../../assets/paid.png")}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Inter_600SemiBold",
            textAlign: "center",
          }}
        >
          Successfully paid, we will start process your order.
        </Text>
      </View>
    );
  }
  return (
    <WebView
      ref={(ref) => (webview = ref)}
      style={{ flex: 1 }}
      originWhitelist={["*"]}
      source={{ uri: url }}
      onNavigationStateChange={handleWebViewNavigationStateChange}
      onMessage={(event) => {}}
    />
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({});
