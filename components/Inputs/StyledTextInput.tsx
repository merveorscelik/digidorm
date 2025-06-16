import React, { useState } from "react";
import styled from "styled-components/native";
import { colors } from "../ui/colors";
import { TextInputProps, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import SmallText from "../Text/SmallText";

const { white, placeholderText } = colors;

const InputField = styled.TextInput`
  background-color: ${white};
  border-radius: 35px;
  font-size: 16px;
  height: 65px;
  margin-bottom: 10px;
  color: ${placeholderText};
  padding-left: 70px;
  text-align: left;
`;

const LeftIcon = styled.View`
  position: absolute;
  top: 40px;
  left: 25px;
  z-index: 1;
  border-right-width: 1px;
  border-color: ${placeholderText};
  padding-right: 10px;
`;

const EyeIcon = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 30px;
  z-index: 1;
`;

interface StyledTextInputProps extends TextInputProps {
  Label?: string;
  isPasword?: boolean;
}

const StyledTextInput: React.FC<
  StyledTextInputProps & { icon?: keyof typeof MaterialCommunityIcons.glyphMap }
> = ({ icon, Label, isPasword, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={[styles.container, isFocused ? styles.focusedShadow : {}]}>
      {icon && (
        <LeftIcon>
          <MaterialCommunityIcons name={icon} size={24} color={placeholderText} />
        </LeftIcon>
      )}
      <SmallText>{Label}</SmallText>
      <InputField
        {...props}
        placeholderTextColor={placeholderText}
        style={props?.style}
        secureTextEntry={isPasword && hidePassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isPasword && (
        <EyeIcon onPress={() => setHidePassword(!hidePassword)}>
          <Feather name={hidePassword ? "eye-off" : "eye"} size={24} color={placeholderText} />
        </EyeIcon>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 35,
    overflow: "hidden",
  },
  focusedShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default StyledTextInput;
