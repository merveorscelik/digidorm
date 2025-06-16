import React, { useState } from "react";
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
import { colors } from "@/components/ui/colors";
import { Dimensions } from "react-native";

const { white, lightbackground } = colors;
const { width: screenWidth } = Dimensions.get("window");

const SignUp = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [issSuccessfulMsg, setIsSuccessfulMsg] = useState("false");

  const handleSignUp = async (
    credentials: { email: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      setMessage(null);
      // Call backend for authentication
      setSubmitting(false);
    } catch (error) {
      setMessage(
        "Sign Up Failed: " +
          (error instanceof Error ? error.message : "An unknown error occurred")
      );
      setSubmitting(false);
    }
  };

  return (
    <MainContainer>
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
            initialValues={{
              fullname: "",
              email: "",
              password: "",
              ConfirmPassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.email === "" ||
                values.password === "" ||
                values.fullname === "" ||
                values.ConfirmPassword === ""
              ) {
                setMessage("Please fill in all fields");
                setSubmitting(false);
              }
              else if (
                values.fullname  !== values.ConfirmPassword 
              ) {
                setMessage("Passwords do not match");
                setSubmitting(false);
              }
               else {
                handleSignUp(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <>
                <RegularBoldText
                  style={{
                    color: colors.primary,
                    textAlign: "left",
                    marginLeft: -25,
                    fontSize: 40,
                  }}
                >
                  {"Sign Up"}
                </RegularBoldText>

                <StyledTextInput
                  Label=""
                  icon="account"
                  placeholder="Full Name"
                  onChangeText={handleChange("fullname")}
                  onBlur={handleBlur("fullname")}
                  value={values.fullname}
                  style={{ marginBottom: 1 }}
                />
                <StyledTextInput
                  Label=""
                  icon="email-variant"
                  placeholder="Email Address"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={{ marginBottom: 1 }}
                />

                <StyledTextInput
                  Label=""
                  icon="lock-open"
                  placeholder="Confirm Password"
                  onChangeText={handleChange("ConfirmPassword")}
                  onBlur={handleBlur("ConfirmPassword")}
                  isPasword={true}
                  value={values.ConfirmPassword}
                  style={{ marginBottom: 1 }}
                />
                <StyledTextInput
                  Label=""
                  icon="lock"
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  isPasword={true}
                  value={values.password}
                  style={{ marginBottom: 1 }}
                />

                <MessageBox success={issSuccessfulMsg}>
                  {message || " "}
                </MessageBox>

                <View>
                  {!isSubmitting ? (
                    <RegularButton onPress={handleSubmit}>
                      Sign Up
                    </RegularButton>
                  ) : (
                    <RegularButton disabled>
                      <ActivityIndicator size="small" color={white} />
                    </RegularButton>
                  )}
                  <View style={{ paddingVertical: 10 }}>
                      <PressableText onPress={() => {}}>
                        Back to Sign in
                      </PressableText>
                      
                    
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

export default SignUp;
