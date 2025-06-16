import React from "react";
import styled from "styled-components/native";
import { colors } from "../ui/colors";
import { StyleProp, TextStyle } from "react-native";
import SmallText from "../Text/SmallText";
const { primary} = colors;



const StyledPressable = styled.Pressable`
padding-vertical:7px;
margin-left:20px;
margin-right:14px;
align-self:center;

`;


interface PressableTextProps {
  children: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
}

const PressableText = (props: PressableTextProps & { onPress?: () => void }) => {
  return (
      
      <StyledPressable {...props}>
        <SmallText  style={{ color: primary }}>{props.children}</SmallText>
      </StyledPressable>
    
  );
};

export default PressableText;
