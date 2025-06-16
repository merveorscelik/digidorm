import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ScreenHeight, StatusBarHeight } from "../../components/shared";
import { colors } from "../ui/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import RegularBoldText from "../Text/RegularBoldText";
import RegularText from "../Text/RegularText";

const { primary, gradientLight, lightbackground } = colors;
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

interface MainContainerProps {
  children: React.ReactNode;
  style?: object;
}

const IconBg = styled.View`
  background-color: ${primary};
  width: ${ScreenHeight * 0.15}px;
  height: ${ScreenHeight * 0.15}px;
  border-radius: ${ScreenHeight * 0.2}px;
  justify-contect: center;
  align-items: center;
  align-self: center;
`;

import type { ComponentProps } from "react";

interface IconHeaderProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  size: number;
  color: string;
  props?: MainContainerProps;
}

const IconHeader: React.FC<IconHeaderProps> = ({
  name,
  color,
  props = { children: null },
}) => {
  return (
    <IconBg style={{ ...props?.style }}>
      <MaterialCommunityIcons name={name} size={ScreenHeight * 0.08} color={color ? color : primary} />
    </IconBg>
  );
};

export default IconHeader;
