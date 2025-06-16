import React, { useState } from "react";
import { View, ActivityIndicator, Image, Dimensions } from "react-native";
// My Components
import MainContainer from "@/components/Containers/MainContainer";
import KeyboardAvoid from "@/components/Containers/KeyboardAvoid";
import RegularBoldText from "@/components/Text/RegularBoldText";
import RegularText from "@/components/Text/RegularText";
import StyledCodeInput from "@/components/Inputs/StyledCodeInput";
import OneColorButton from "@/components/Buttons/OneColorButton";
import ResendTimer from "@/components/Timers/ResendTimer";
import { colors } from "@/components/ui/colors";

const { primary, lightbackground } = colors;
const { width: screenWidth } = Dimensions.get("window");

const EmailVerification = () => {
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState<number | null>(null);
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccessfulMsg, setIsSuccessfulMsg] = useState("false");

  const handleVerification = async () => {
    setVerifying(true);
    setMessage(null);

    try {
      // Simulate async call or actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Example success condition
      if (code === 4413) {
        setIsSuccessfulMsg("true");
        setMessage("Verification successful!");
      } else {
        setIsSuccessfulMsg("false");
        setMessage("Invalid verification code.");
      }
    } catch (error) {
      setMessage(
        "Verification Failed: " +
          (error instanceof Error ? error.message : "An unknown error occurred")
      );
    }
    setVerifying(false);
  };

  // Resend email verification code
  const [activeResend, setActiveResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  const [resendingEmail, setResendingEmail] = useState(false);

  const resendEmail = async (triggerTimer: () => void) => {
    try {
      setResendingEmail(true);

      // Simulate backend request here
      setTimeout(() => {
        setResendStatus("Sent!");
        setActiveResend(false);
        triggerTimer();
        setResendingEmail(false);
      }, 5000);
    } catch (error) {
      setResendingEmail(false);
      setResendStatus("Failed!");
      alert(
        "Email resend failed: " +
        (error instanceof Error ? error.message : "An unknown error occurred")
      );
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
          <RegularBoldText
            style={{
              color: primary,
              textAlign: "center",
              marginTop: 10,
              marginBottom: 15,
              marginRight:80,
              fontSize: 24,
            }}
          >
            Email Verification
          </RegularBoldText>

          <RegularText
            style={{
              color: primary,
              marginRight:80,
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Enter 4-digit code sent to your account
          </RegularText>

          <StyledCodeInput
            code={code?.toString() || ""}
            setCode={(value) => setCode(Number(value))}
            maxLength={MAX_CODE_LENGTH}
            setPinReady={setPinReady}
          />

          {!verifying && pinReady && (
            <OneColorButton onPress={handleVerification} color={primary}>
              Verify
            </OneColorButton>
          )}

          {!verifying && !pinReady && (
            <View>
              <OneColorButton disabled={true} color={primary}>
                Verify
              </OneColorButton>
            </View>
          )}

          {verifying && (
            <OneColorButton disabled={true}>
              <ActivityIndicator />
            </OneColorButton>
          )}

          {message && (
            <RegularText
              style={{
                color: isSuccessfulMsg === "true" ? "green" : "red",
                textAlign: "center",
                marginTop: 30,
                marginRight: 70,
                fontSize: 15,
              }}
            >
              {message}
            </RegularText>
          )}
        </View>

        {/* Resend Timer */}
        <ResendTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          targetTimeInSeconds={10} // Example value for the timer
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
        />
      </KeyboardAvoid>
    </MainContainer>
  );
};

export default EmailVerification;