import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />  
      <Stack.Screen name="splash" options={{ headerShown: false }} />  
      <Stack.Screen name="login" options={{ headerShown: false }} />  
      <Stack.Screen name="SignUp" options={{ headerShown: false }} /> 
      <Stack.Screen name="EmailVerification" options={{ headerShown: false }} /> 
      <Stack.Screen name="home" options={{ headerShown: false }} /> 
      <Stack.Screen name="machineStatus" options={{ headerShown: false }} /> 
      <Stack.Screen name="menu" options={{ headerShown: false }} /> 
      <Stack.Screen name="review" options={{ headerShown: false }} /> 

    </Stack>
  )
}