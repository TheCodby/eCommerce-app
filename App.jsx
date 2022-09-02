import RootNavigation from "./src/screens/RootNavigation";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import store from "./src/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Text, View } from "react-native";
import axios from "axios";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { refreshToken } from "./src/utils/backend/auth";
let persistor = persistStore(store);
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import * as Font from "expo-font";
import { useCallback } from "react";
export default function App() {
  const [appIsReady, setIsAppReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await refreshToken();
        await Font.loadAsync({
          Inter_100Thin,
          Inter_200ExtraLight,
          Inter_300Light,
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
          Inter_900Black,
        });
        createAuthRefreshInterceptor(axios, refreshToken);
      } catch {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </View>
  );
}
