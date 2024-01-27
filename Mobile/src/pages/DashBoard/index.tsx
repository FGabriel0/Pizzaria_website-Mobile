import React, { useContext,useState } from "react";
import { View,Text,TouchableOpacity,StyleSheet,TextInput,SafeAreaView } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackPramsList } from '../../routes/app.routes'
import { useNavigation } from '@react-navigation/native'
import { api } from "../../service/api";


export default function Dashboard(){
  const {signOut} = useContext(AuthContext)
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
  
    const [number, setNumber] = useState('');
   
  
    async function openOrder(){
      if(number === ''){
        return;
      }
  
      const response = await api.post('/order', {
        table: Number(number)
      })
  
      //console.log(response.data);
  
      navigation.navigate('Order', { number: number, order_id: response.data.id })
  
      setNumber('');
  
    }

    async function SigntOut() {
      await signOut()
    }
    
  
    return(
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.buttonSair} onPress={SigntOut}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Novo pedido</Text>
  
          <TextInput
            placeholder="Numero da mesa"
            placeholderTextColor="#F0F0F0"
            style={styles.input}
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
          />
  
          <TouchableOpacity style={styles.button} onPress={openOrder}>
            <Text style={styles.buttonText}>Abrir mesa</Text>
          </TouchableOpacity>
  
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      backgroundColor: '#1d1d2e'
    },
    title:{
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 24,
    },
    input:{
      width: '90%',
      height: 60,
      backgroundColor: '#101026',
      borderRadius: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
      fontSize: 22,
      color: '#FFF'
    },
    button:{
      width: '90%',
      height: 40,
      backgroundColor: '#3fffa3',
      borderRadius: 4,
      marginVertical: 12,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText:{
      fontSize: 18,
      color: '#101026',
      fontWeight: 'bold'
    },
    buttonSair:{
    position: 'absolute',
    top: 20, // Ajuste conforme necessário
    left: 20, // Ajuste conforme necessário
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    padding: 10,
    }
  })