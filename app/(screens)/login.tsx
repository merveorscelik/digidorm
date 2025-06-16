import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { View, ActivityIndicator, Image } from "react-native";
// My Components
import MainContainer from "@/components/Containers/MainContainer";
import KeyboardAvoid from "@/components/Containers/KeyboardAvoid";
import RegularBoldText from "@/components/Text/RegularBoldText";
import StyledTextInput from "@/components/Inputs/StyledTextInput";
import MessageBox from "@/components/Text/MessageBox";
import RegularButton from "@/components/Buttons/RegularButton";
import PressableText from "@/components/Text/PressableText";
import RowContainer from "@/components/Containers/RowContainer";
import LogoImg from "@/components/Containers/Logo";
import { colors } from "@/components/ui/colors";
import { Dimensions } from "react-native";
import { router } from "expo-router";
import { useUser } from "@/providers/user-provider";
import axios from "axios";

const { white, lightbackground } = colors;
const { width: screenWidth } = Dimensions.get("window");

const Login = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [issSuccessfulMsg, setIsSuccessfulMsg] = useState("false");

  const { user, setUser } = useUser()

  useEffect(() => {

    if (user && user.email != 'unauthenticated@gmail.com') {
      router.replace('/(screens)/home')
    }

  }, [user])

  const handleLogin = async (
    credentials: { email: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      setMessage(null);
      // Call backend for authentication

      const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
        email: credentials.email,
        password: credentials.password
      })

      const { data } = loginRes.data

      if(data.email && data.name) {
        setUser({
          email: data.email,
          name: data.name
        })

        router.replace('/(screens)/home')
      }

      setSubmitting(false);
    } catch (error) {
      setMessage(
        "Login Failed: " +
        (error instanceof Error ? error.message : "An unknown error occurred")
      );
      setSubmitting(false);
    }
  };

  return (
    <MainContainer>
      {/* Logo - Positioned Above the Form */}
      <View
        style={{
          position: "absolute",
          top: -80,
          left: "50%",
          transform: [{ translateX: -80 }],
          zIndex: 10,
        }}
      >
        <Image
          source={require("@/assets/images/splashicon.png")}
          style={{
            width: 160,
            height: 160,
            top: 20,
            shadowColor: "#ffffff",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
          }}
        />
      </View>

      <KeyboardAvoid>
        <View
          style={{
            width: screenWidth,
            backgroundColor: lightbackground,
            paddingHorizontal: 25,
            borderRadius: 30,
            marginTop: 90,
            paddingBottom: 40,
          }}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email === "" || values.password === "") {
                setMessage("Please fill in all fields");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <>
                <RegularBoldText
                  style={{
                    color: colors.primary,
                    textAlign: "left",
                    marginBottom: 15,
                    marginLeft: -20,
                  }}
                >
                  Login
                </RegularBoldText>

                <StyledTextInput
                  Label=""
                  icon="email-variant"
                  placeholder="Email Address"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />

                <StyledTextInput
                  Label=""
                  icon="lock"
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  isPasword={true}
                  value={values.password}
                />

                <MessageBox success={issSuccessfulMsg}>{message || " "}</MessageBox>

                <View style={{ marginTop: 10 }}>
                  {!isSubmitting ? (
                    <RegularButton onPress={handleSubmit}>Login</RegularButton>
                  ) : (
                    <RegularButton disabled>
                      <ActivityIndicator size="small" color={white} />
                    </RegularButton>
                  )}
                  <View style={{ marginTop: 15 }}>
                    <RowContainer>
                      <PressableText style={{ fontSize: 2 }} onPress={() => { }}>Create a new account</PressableText>
                      <PressableText onPress={() => { }}>Forget password</PressableText>
                    </RowContainer>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoid>
    </MainContainer>

  );
};

export default Login;
