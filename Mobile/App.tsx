import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Router from "./src/routes";
import { AuthProvider } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();

function AppRouter() {

  return (
    <NavigationContainer>
    <AuthProvider>
        <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false} />
        <Router/>
    </AuthProvider>
  </NavigationContainer>
  );
}

export default AppRouter;
