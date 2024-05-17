import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, TouchableOpacity, Button, Text, FlatList } from "react-native";
import styles from "../Styles/Styles";

export default function Login() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

 

  async function LoginDB() {
    try {
        if (username !== "" && password !== ""){
      await axios.post("http://localhost:3000/api/createUser", {
        username: user,
        password: password,
      });
      
      setUser('')
      setPassword('')
      alert('usuário criado')
    } else {
        alert('Preencha o campo')
    }
    } catch (error) {
      console.log("Fail")
    }
  }

  async function readUsers() {
    try {
        const response = await axios.get("http://localhost:3000/api/readUsers");
        console.log(response.data);
        setUsers(response.data);
    } catch (error) {
        console.log("erro na tabela")
    }
}
        function renderItems({item}) {
            return (
                <View>
                    <Text>{item.username}</Text>
                </View>
            );
        }

  return (
<View style={styles.container} >
        <TextInput
          value={user}
          onChangeText={setUser}
          placeholder="user"
/>
        <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="senha"
          />
          <Button title="Login" onPress={readUsers} />

          <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItems}
          />
            
</View>
  )};