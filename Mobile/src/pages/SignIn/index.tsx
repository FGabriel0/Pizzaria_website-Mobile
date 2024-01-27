import React,{useState,useContext} from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { AuthContext, AuthProvider } from "../../context/AuthContext";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { StackPramsList } from '../../routes/app.routes'


export default function SingIn() {

    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const {signIn} = useContext(AuthContext);


    async function handlerLogin(){

        const data = {
            email,
            password
        }
        
        if(email === '' || password === ''){
            return;
          }

        await signIn(data)
    }


    return (
        <View style={style.container}>
            <Image
                style={style.logo}
                source={require("../../assets/logo.png")}
            />

            <View style={style.inputContainer}>
                <TextInput placeholder="Digite seu Email: "
                style={style.input}
                placeholderTextColor={"#fff"}
                value={email}
                onChangeText={setEmail}/>
             
                <TextInput placeholder="Digite sua Senha: "
                style={style.input}
                placeholderTextColor={"#fff"}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}/>
                
                <TouchableOpacity style={style.button} onPress={handlerLogin}>
                    <Text style={style.buttonText}>Acessar</Text>
                </TouchableOpacity>


            </View>
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1d1d2e"
    },

    logo:{
        marginBottom: 18,
    },
    inputContainer:{
        width:"95%",
        alignItems: "center",
        justifyContent:"center",
        paddingVertical: 34,
        paddingHorizontal: 14

    },
    input:{
        width:"95%",
        height:40,
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius:4,
        paddingHorizontal:8,
        color:"#fff"
    },
    button:{
        width:"95%",
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
    }
}
)