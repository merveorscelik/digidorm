import React from "react";

import styled from "styled-components/native";
import { colors } from "../ui/colors";const { placeholderText } = colors;

const StyledText = styled.Text`
    font-family: "Poppins-Regular";
    font-size: 16px;
    color: ${placeholderText};
    text-align: left;
    `;

interface RegularTextProps {
  children: React.ReactNode;
  [key: string]: any; // Optional: To allow additional props
}

const SmallText = (props: RegularTextProps) => {
  return <StyledText {...props}>{props.children}</StyledText>;
}

export default SmallText;