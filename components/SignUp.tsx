import { pass } from "@/node_modules copy/@types/three/src/Three.TSL";
import React from "react";
import { useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button, Snackbar } from "react-native-paper";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore/lite";
import ImagePicker from "./ImagePicker";

// To successfully register, or sign up, you need a properly typed email and password containing at least 6 characters, that is part of Firebase initial setup


const SignUp = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [displayName, setDisplayname] = useState<string>('');
    const [photoURL, setPhotoURL] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [visible2, setVisible2] = useState<boolean>(false);

    const handleSignUp = async () => {

        try {

            // this creates a new user with email and password using the auth configuration 
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            //notifying that the registration was successful
            Alert.alert('Registrering lyckades', `Välkommen, ${email}!`);
            setVisible(true)

            // creates a database entry for the newly registered user, makes an object containing user's email and username.
            //  This is used as a reference to log in using the username instead/alongside email
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                username: username,
                role: ["child", "adult"]
            });

            // after the user is created its displayName is updated
            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL,
            });

            setUsername("");
            setDisplayname("");
            setEmail("");
            setPassword("");
            setPhotoURL("");
            auth.signOut();

            console.log("user registered successfully");
          
        } catch (error: any) {

          Alert.alert('Error', error.message);
          setVisible2(true)
          console.log("Error registering user: ", error.message)
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign up</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                
            />

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                
            />

            <TextInput
                style={styles.input}
                placeholder="DisplayName"
                value={displayName}
                onChangeText={setDisplayname}
                
            />

            <TextInput
                style={styles.input}
                placeholder="PhotoURL"
                value={photoURL}
                onChangeText={setPhotoURL}
                
            />

            <ImagePicker onImageSelect={setPhotoURL}></ImagePicker>

            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button mode="contained" onPress={handleSignUp} style={styles.loginButton}>
                Submit
            </Button>

            <Snackbar style={styles.snackbar}
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={Snackbar.DURATION_SHORT}>
                    Registrerad, {email}!

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

export default SignUp;

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