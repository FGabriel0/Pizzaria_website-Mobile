import React from "react";
import { View,ActivityIndicator } from "react-native";
import AppRouter from "./app.routes";
import AuthRouter from "./auth.routes";


function Router() {
    const isAuthentication = false
    const Loading = false

    if (Loading) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#1d1d3e",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ActivityIndicator size={60} color={"#fff"}/>
            </View>
        )
    }
    return (
        isAuthentication ? <AppRouter /> : <AuthRouter />
    )
}

export default Router