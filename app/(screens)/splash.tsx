import {
  View,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import TypingAnimation from "react-native-typed-text";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["DigiDorm"];
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setTimeout(() => {
      console.log('interval reached')
      router.replace("/login");
    }, 1000); 
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/typescreen.png")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            margin: 20,
            position: "absolute",
            top: "43%",
            left: "50%",
            transform: [{ translateX: -78 }, { translateY: -100 }],
          }}
        >
          <TypingAnimation
            text={texts[textIndex]}
            textStyle={{ color: "#5E765E", fontSize: 24, textAlign: "center" }}
            speed={70}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
