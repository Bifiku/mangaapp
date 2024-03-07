import { View, StyleSheet } from "react-native";
import { AppInput } from "../components/ui/AppInput/AppInput";
import { useState } from "react";
import { AppButton } from "../components/ui/AppButton/AppButton";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9uy4YfAqhJfTKppNWtMvqz2LSWGgz4RE",
  authDomain: "mangaapp-579ee.firebaseapp.com",
  databaseURL: "https://mangaapp-579ee-default-rtdb.firebaseio.com",
  projectId: "mangaapp-579ee",
  storageBucket: "mangaapp-579ee.appspot.com",
  messagingSenderId: "628701458760",
  appId: "1:628701458760:web:2d89d61399396543a4c37d",
  measurementId: "G-HCPDRD9EJG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  const singIn = () =>
    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential.user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error");
      });

  return (
    <View>
      <AppInput
        placeholder="Ваше имя"
        onChangeText={(value) => setLogin(value)}
        value={login}
      />
      <AppInput
        placeholder="Пароль"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <AppButton onPress={() => singIn()}>Вход</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
