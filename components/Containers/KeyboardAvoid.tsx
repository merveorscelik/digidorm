import React from "react";

import { KeyboardAvoidingView, Keyboard, ScrollView, Pressable, Platform,  } from "react-native";

interface KeyboardAvoidProps {
    children: React.ReactNode;
}

const KeyboardAvoid = (props: KeyboardAvoidProps) => {
    return (
        <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: 'transparent' }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
            >

        <ScrollView 
            showsVerticalScrollIndicator={false}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                {props.children}
            </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
        );
    };

export default KeyboardAvoid;
// This component is a wrapper for the KeyboardAvoidingView and ScrollView components from React Native.