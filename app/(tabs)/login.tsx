import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image, StyleSheet, Platform } from 'react-native';
import { View, Text } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import LoginPage from "@/components/LoginPage";

export default function RoomScreen () {
    return (

        <SafeAreaView style={{ flex: 1}}>

            <LoginPage></LoginPage>

        </SafeAreaView>
          
            

    )
}