import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashBoard from "../pages/DashBoard";

const Stack = createNativeStackNavigator();

function AppRouter(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="DashBoard" component={DashBoard}/>
        </Stack.Navigator>
    )
}



export default AppRouter;