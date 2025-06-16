import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { colors } from "../ui/colors";
import SmallText from "../Text/SmallText";
import PressableText from "../Text/PressableText";
import RowContainer from "../Containers/RowContainer";

const { primary, fail } = colors;

// Styled components
const StyledView = styled.View`
  align-items: center;
`;
interface ResendTextProps {
  resendStatus?: string;
}

const ResendText = styled(SmallText)<ResendTextProps>`
  color: ${({ resendStatus }: ResendTextProps) =>
    resendStatus === "failed!" ? fail :
    resendStatus === "Sent!" ? primary :
    "black"
  };
`;

interface ResendTimerProps {
  activeResend: boolean;
  setActiveResend: (active: boolean) => void;
  targetTimeInSeconds: number;
  resendEmail: (triggerTimer: (time?: number) => void) => void;
  resendStatus: string;
  [key: string]: any; // for any other props you might pass
}

const ResendTimer: React.FC<ResendTimerProps> = ({
  activeResend,
  setActiveResend,
  targetTimeInSeconds,
  resendEmail,
  resendStatus,
  ...props
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerTimer = (seconds = 30) => {
    setTargetTime(seconds);
    setActiveResend(false);
    const endTime = Date.now() + seconds * 1000;
    resendTimerRef.current = setInterval(() => calculateTimeLeft(endTime), 1000);
  };

  const calculateTimeLeft = (endTime: number) => {
    const difference = endTime - Date.now();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
        resendTimerRef.current = null;
      }
      setActiveResend(true);
      setTimeLeft(null);
    }
  };

  useEffect(() => {
    triggerTimer(targetTimeInSeconds);
    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, []);

  return (
    <StyledView {...props}>
      <RowContainer>
        <SmallText style={{ marginTop: 20 }}>
          {!activeResend && "Didn't receive the email?"}
        </SmallText>

        <PressableText
          onPress={() => resendEmail(triggerTimer)}
          disabled={!activeResend}
          style={{
            opacity: activeResend ? 1 : 0.65,
            marginTop: 13,
            marginLeft: 5,
          }}
        >
          <ResendText resendStatus={resendStatus}>
            {resendStatus}
          </ResendText>
        </PressableText>
      </RowContainer>

      {!activeResend && (
        <SmallText>
          in{" "}
          <SmallText style={{ color: primary, fontWeight: "bold" }}>
            {timeLeft ?? targetTime}{" "}
          </SmallText>
          second(s)
        </SmallText>
      )}
    </StyledView>
  );
};

export default ResendTimer;
