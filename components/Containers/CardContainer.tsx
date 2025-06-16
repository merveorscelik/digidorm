import React from "react";
import styled from "styled-components/native";
import { colors } from "../ui/colors";
import { Dimensions } from "react-native";

const {  lightbackground } = colors;
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

interface CardContainerProps {
  children: React.ReactNode;
  logoSource?: any; // Add logoSource property (use a more specific type if possible, e.g., ImageSourcePropType)
}

const ColorBlock = styled.View`
  width: ${screenWidth}px;
  height: 600px;
  background-color: ${lightbackground};
  padding-top: 70px;
  margin-top: 40px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px; /* Rounded corners */
  border-bottom-right-radius: 30px; /* Rounded corners */
  border-bottom-left-radius: 30px; /* Rounded corners */


`;
const Logo = styled.Image`
  width: 160px;
  height: 160px;
  align-self: center;
  top: -110px;
  /* Shadow effect */
  shadow-color: #ffffff;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.5;
  shadow-radius: 8px;
  elevation: 10;
`;

const CardContainer = (props: CardContainerProps) => {
  return (
    <ColorBlock {...props}>
      {props.logoSource && <Logo source={props.logoSource} />}
      
      {props.children}
    </ColorBlock>
  );
};

export default CardContainer;
