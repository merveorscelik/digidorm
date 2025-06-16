import styled from "styled-components/native";
import { colors } from "../ui/colors";const { white } = colors;

const StyledText = styled.Text`
    font-family: "Jaldi";
    font-size: 30px;
    color: ${white};
    text-align:left; 
    left: 40px;
    margin-bottom: 10px;   
    `;

interface RegularTextProps {
  children: React.ReactNode;
  [key: string]: any; // Optional: To allow additional props
}

const RegularText = (props: RegularTextProps) => {
  return <StyledText {...props}>{props.children}</StyledText>;
}

export default RegularText;