import React from "react";
import styled from "styled-components/native";
import { colors } from "../ui/colors";
import ButtonText from "../Text/ButtonText";

const { primary } = colors;

const ButtonView = styled.TouchableOpacity<{ disabled?: boolean }>`
  padding: 13px;
  margin-top:30px;
  background-color: ${({ disabled }: { disabled?: boolean }) => (disabled ? primary : primary)};
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  width: 100%;
height: 60px;
`;

interface OneColorButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;  // Add disabled prop here
  color?: string;
}

const OneColorButton: React.FC<OneColorButtonProps> = ({ children, onPress, disabled = false }) => {
  return (
    <ButtonView onPress={!disabled ? onPress : undefined} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </ButtonView>
  );
};

export default OneColorButton;
