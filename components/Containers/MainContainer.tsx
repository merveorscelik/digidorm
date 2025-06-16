import React from "react";
import styled from "styled-components/native";
import { StatusBarHeight } from "../../components/shared";
import { colors } from "../ui/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, View } from "react-native";
import RegularBoldText from "../Text/RegularBoldText";
import RegularText from "../Text/RegularText";

const { primary, gradientLight, lightbackground } = colors;
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

interface MainContainerProps {
  children: React.ReactNode;
  logoSource?: any; // Add logoSource property
}

const StyledView = styled.View`
  flex: 1;
  padding-top: ${StatusBarHeight + 25}px;
  align-items: center;
`;

const ContentContainer = styled.View`
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  background-color: ${lightbackground};
  margin-top: -40px;
  border-radius: 30px;
  align-items: center;
`;

const MainContainer = (props: MainContainerProps) => {
  return (
    <LinearGradient
      colors={[primary, gradientLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View style={{ marginTop: 70 }}>
        <RegularBoldText>Hello!</RegularBoldText>
        <RegularText style={{ marginBottom: 25 }}>
          Welcome to DigiDorm
        </RegularText>
      </View>

      <StyledView>
        <ContentContainer>{props.children}</ContentContainer>
      </StyledView>
    </LinearGradient>
  );
};

export default MainContainer;
