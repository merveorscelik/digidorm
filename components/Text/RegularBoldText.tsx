import React from "react";

import styled from "styled-components/native";
import { colors } from "../ui/colors";const { white } = colors;

const StyledText = styled.Text`
    font-family: "Inter-bold";
    font-size: 40px;
    color: ${white};
    text-align:left; 
    left: 40px;
    `;

interface RegularBoldTextProps {
  children: React.ReactNode;
  [key: string]: any; // Optional: To allow additional props
}

const RegularBoldText = (props: RegularBoldTextProps) => {
  return <StyledText {...props}>{props.children}</StyledText>;
}

export default RegularBoldText;