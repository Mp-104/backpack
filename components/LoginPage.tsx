import { pass } from "@/node_modules copy/@types/three/src/Three.TSL";
import React from "react";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";


import { db, auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore/lite";


const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [visible2, setVisible2] = useState<boolean>(false);

    const getEmailbyUsername = async (username: string) => {

        try {

            const usersCollectionRef = collection(db, "users");
            const queryingUsers = query(usersCollectionRef, where("username", "==", username));

            const querySnapshot = await getDocs(queryingUsers);

            if (!querySnapshot.empty) {

                for (const doc of querySnapshot.docs ) {

                    const userData = doc.data();
                    const email = userData.email;
                    console.log("email for user : ", username, email);

                    return email;
                };

            } else {

                console.log("no user found with username: ", username)
                return null;
            }

        } catch (error) {
            console.error("error fetching document: ", error);
        }
    };

    const handleLogin =  async () => {
        if (username === '' || password === '') {

            Alert.alert('Error', 'Var vänlig fyll i username och password');
            /* console.log("det är tomt");
            alert("tomt") */
            setVisible2(true);

        } else {

            try{
                let email = "";

                if (username.includes("@")) {

                    email = username;

                } else {
                    
                    const userEmail = await getEmailbyUsername(username);

                    email = userEmail;

                    console.log("userEmail: ", userEmail);

                    /* const userDoc1 = await getDoc(doc(db, "users", "fB3sbjb0ETagPsCZ8BRtNTuZdYw1"));
                    const userDoc = await getDoc(doc(db, "users", username)); */

                    

                    const querySnapshot = await getDocs(collection(db, "users"));
                    querySnapshot.forEach((doc) => {
                        console.log(`${doc.id} => ${doc.data().email}`);
                    });

                   /*  console.log("email: ", email);
                    console.log("username: ", username);
                    console.log("userDoc1: ", userDoc1.data())

                    
                    if (userDoc.exists()) {
                        email = userDoc.data().email;
                    } else {
                        console.log("ej kan logga in med ", email);
                        throw new Error ("username not found");
                    } */
                }


                console.log("email: ", email);

                if (email) {

                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    console.log("User logged in!: ", user.displayName || user.email)
                    Alert.alert('Inloggad', `Välkommen, ${username}!`);
                    console.log("inloggad: ", username);
                    /*  alert("test")*/
                    setVisible(true); 
                }

                /* await signInWithEmailAndPassword(auth, username, password);
                Alert.alert('Inloggad', `Välkommen, ${username}!`);
                console.log("inloggad: ", username);
                 /*  alert("test")*/
                // setVisible(true);  

            } catch (error: any) {
                Alert.alert('Error', error.message);
                console.log("login error", error.message);
            }

            

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Logga in</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                
            />

            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
                Logga in
            </Button>

            <Snackbar style={styles.snackbar}
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={Snackbar.DURATION_SHORT}>
                    Välkommen, {username}!

            </Snackbar>

            <Snackbar style={styles.input}
                visible={visible2}
                onDismiss={() => setVisible2(false)}
                duration={Snackbar.DURATION_SHORT}>
                     Måste ange användarnamn och lösenord

            </Snackbar>

            
        </View>
    )

    

}

export default LoginPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingLeft: 10,
    },
    loginButton: {
      marginTop: 20,
      width: '100%',
      padding: 10,
    },
    snackbar: {

        backgroundColor: 'white'
    }
  });