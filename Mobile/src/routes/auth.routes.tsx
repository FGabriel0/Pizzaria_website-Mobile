import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingIn from "../pages/SignIn";

const Stack = createNativeStackNavigator();

function AuthRouter(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SingIn} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}



export default AuthRouter;