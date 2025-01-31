import { pass } from "@/node_modules copy/@types/three/src/Three.TSL";
import React from "react";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";


import { db, auth } from "./Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { router } from "expo-router";


const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [visible2, setVisible2] = useState<boolean>(false);


    // fetches the user email if they provide a username, used when attempting to log in
    const getEmailbyUsername = async (username: string) => {

        try {

            // upon registration, users credentials (email + username) are stored in firestore as an object, in a collection "users".
            // this fetches the data of that collection and searches each one for the matching username. If found, returns the email associated with the provided username.
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
                let role = "";

                if (username.includes("@")) {

                    email = username;
                    role = "adult";

                } else {
                    
                    const userEmail = await getEmailbyUsername(username);

                    email = userEmail;
                    role = "minor";

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

                    const userDocRef = doc(db, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);

                    await updateDoc(doc(db, 'users', user.uid), {
                        role: role,
                    });


                    // TODO :  why is there a signOut call in a login function? Because it ensures the role is updated properly before it renders
                    // otherwise it shows outdated info upon redirecting the page with router.replace("/(tabs)");
                    auth.signOut();

                    const userCredential1 = await signInWithEmailAndPassword(auth, email, password);
                    

                    const updatedUserDoc = await getDoc(userDocRef);
                    if (updatedUserDoc.exists()) {
                        console.log("Updated userDoc data:", updatedUserDoc.data());
                    }
                    
                    


                    console.log("user.displayName: ", user.displayName);
                    console.log("userDoc.data().email: ", userDoc.data().email)
                    console.log("userDoc.data().username: ", userDoc.data().username)
                    console.log("userDoc.data().role: ", userDoc.data().role)

                    console.log("User logged in!: ", user.displayName || user.email)
                    Alert.alert('Inloggad', `Välkommen, ${username}!`);
                    console.log("inloggad: ", username);
                    /*  alert("test")*/
                    setVisible(true); 
                    setUsername("");
                    setPassword("");

                    // the below redericts to the index.tsx , 
                    router.replace("/(tabs)");

                    // while this would redirect to explore.tsx  etc
                    // router.replace("/(tabs)/explore") 

                    //routeToScreen()
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