import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { MangaDetailScreen } from "./src/screens/MangaDetailScreen";
import { Login } from "./src/screens/Login";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import LoadingScreen from "./src/screens/LoadingScreen";
import { StatusBar } from "expo-status-bar";
import { THEME } from "./src/theme";

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Oswald-Bold": require("./assets/fonts/Oswald-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });
  const [isLoading, setIsLoading] = useState(true);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 2000);
      setIsLoading(false);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }

  const content = (
    <NavigationContainer
      theme={{
        dark: false,
        colors: { ...DefaultTheme.colors, background: THEME.BACKGROUND_COLOR },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MangaDetail" component={MangaDetailScreen} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          {isLoading ? <LoadingScreen /> : content}
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}
