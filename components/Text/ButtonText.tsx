import React from "react";
import styled from "styled-components/native";
import { colors } from "../ui/colors";
const { white} = colors;

const StyledText = styled.Text`
    font-family: "Poppins-Regular";
    font-size: 30px;
    color: ${white};
    text-align: center;
    `;

interface RegularTextProps {
  children: React.ReactNode;
  [key: string]: any; // Optional: To allow additional props
}

const ButtonText = (props: RegularTextProps) => {
  return <StyledText {...props}>{props.children}</StyledText>;
}

export default ButtonText;