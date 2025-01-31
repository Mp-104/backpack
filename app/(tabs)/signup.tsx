import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, StyleSheet, Platform } from 'react-native';
import { View, Text } from "react-native";
import React from "react";
import LoginPage from "@/components/LoginPage"
import { SafeAreaView } from "react-native-safe-area-context";
import SignUp from "@/components/SignUp";

export default function RoomScreen () {
    return (

        <SafeAreaView style={{ flex: 1}}>

            <SignUp/>

        </SafeAreaView>
          
            

    )
}