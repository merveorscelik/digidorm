import React from "react";
import styled from "styled-components/native";
import { colors } from "../ui/colors";
import ButtonText from "../Text/ButtonText";

const { primary, gradientLight } = colors;

const ButtonView = styled.TouchableOpacity<{ disabled?: boolean }>`
  padding: 13px;
  margin-top:20px;
  background-color: ${({ disabled }: { disabled?: boolean }) => (disabled ? gradientLight : primary)};
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

interface RegularButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;  // Add disabled prop here
  color?: string;
}

const RegularButton: React.FC<RegularButtonProps> = ({ children, onPress, disabled = false }) => {
  return (
    <ButtonView onPress={!disabled ? onPress : undefined} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </ButtonView>
  );
};

export default RegularButton;
