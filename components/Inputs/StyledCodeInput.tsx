import React, { useRef, useState, useEffect } from "react";
import { TextInput, Dimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../ui/colors";

const { primary, white } = colors;
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export interface StyledCodeInputProps {
  children?: React.ReactNode;
  logoSource?: any;
  style?: object;
  maxLength: number;
  code: string;
  setCode: (code: string) => void;
  setPinReady?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeInputSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-vertical: 30px;
`;

const HiddenTextInput = styled.TextInput`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  color: transparent;
  caret-color: transparent;
`;

const CodeInputsContainer = styled.Pressable`
  width: 72%;
  flex-direction: row;
  justify-content: space-between;
`;

const CodeInputBox = styled.View<{ isFocused: boolean }>`
  min-width: 15%;
  padding: 12px;
  border-bottom-width: 3px;
  border-radius: 10px;
  border-color: ${({ isFocused }: { isFocused: boolean }) =>
    isFocused ? white : primary};
  align-items: center;
`;

const CodeInputText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${primary};
`;

const StyledCodeInput = ({
  maxLength,
  code,
  setCode,
  setPinReady,
  ...props
}: StyledCodeInputProps) => {
  const codeDigitsArray = new Array(maxLength).fill(0);
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef.current?.focus();
  };

  const handleOnSubmitEditing = () => {
    setInputContainerIsFocused(false);
  };

  useEffect(() => {
    if (setPinReady) {
      setPinReady(code.length === maxLength);
    }

    if (code.length === maxLength) {
      textInputRef.current?.blur();
    }

    return () => {
      if (setPinReady) {
        setPinReady(false);
      }
    };
  }, [code]);

  const toCodeDigitInput = (_: any, index: number) => {
    const emptyInputChar = " ";
    const digit = code[index] || emptyInputChar;

    const isCurrentDigit = index === code.length;
    const isLastDigit = index === maxLength - 1;
    const isCodeFull = code.length === maxLength;

    const isDigitFocused =
      inputContainerIsFocused &&
      (isCurrentDigit || (isLastDigit && isCodeFull));

    return (
      <CodeInputBox key={index} isFocused={isDigitFocused}>
        <CodeInputText>{digit}</CodeInputText>
      </CodeInputBox>
    );
  };

  return (
    <CodeInputSection style={props.style}>
      <CodeInputsContainer onPress={handleOnPress}>
        {codeDigitsArray.map(toCodeDigitInput)}
      </CodeInputsContainer>
      <HiddenTextInput
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        ref={textInputRef}
        value={code}
        onChangeText={(text: string) => {
          // Ensure only numeric input is allowed
          const numericText = text.replace(/[^0-9]/g, "");
          setCode(numericText);
        }}
        maxLength={maxLength}
        onSubmitEditing={handleOnSubmitEditing}
      />
    </CodeInputSection>
  );
};

export default StyledCodeInput;
