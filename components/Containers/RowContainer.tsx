import React from "react";
import styled from "styled-components/native";


interface RowContainerProps {
  children: React.ReactNode;
}

const StyledView = styled.View`
flex-direction:row;
justify-content: space-between;
align-item:center;
margin-top:5px;
margin-Right:15px;
`
 

const RowContainer = (props: RowContainerProps) => {
  return (
   
      <StyledView {...props}>{props.children}</StyledView>
    
  );
};

export default RowContainer;
