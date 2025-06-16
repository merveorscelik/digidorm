import React from "react";

import styled from "styled-components/native";
import { colors } from "../ui/colors";
const { success,fail } = colors;

const StyledText = styled.Text<{ sucess?: boolean }>`
    font-family: "Poppins-Regular";
    font-size: 16px;
    color: ${(props: { sucess?: boolean }) => (props.sucess ? success : fail)};
    text-align: center;
    `;

interface RegularTextProps {
  children: React.ReactNode;
  [key: string]: any; // Optional: To allow additional props
}

const MessageBox = (props: RegularTextProps) => {
  return <StyledText {...props}>{props.children}</StyledText>;
}

export default MessageBox;