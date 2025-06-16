import React from "react";
import styled from "styled-components/native";


interface LogoImgProps {
    children?: React.ReactNode; // Make children optional
    logoSource?: any; // Add logoSource property (use a more specific type if possible, e.g., ImageSourcePropType)
  }


const StyledLogoImg = styled.Image`
  width: 160px;
  height: 160px;
  align-self: center;
  top: -80px;  
  left: 50%;
  z-index: 10;
  /* Shadow effect */
  shadow-color: #ffffff;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.5;
  shadow-radius: 8px;
  elevation: 10;
`;

const LogoImg = (props: LogoImgProps) => {
  return (
    <StyledLogoImg source={props.logoSource} />
  );
};

export default LogoImg;