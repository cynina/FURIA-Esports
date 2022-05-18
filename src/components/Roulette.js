import React, { useState, useEffect, useRef } from "react";
import { getRotationDegrees } from "../utils";
import { RotationContainer } from "./styles";

const STARTED_SPINNING = "started-spinning";
const START_SPINNING_TIME = 800;
const CONTINUE_SPINNING_TIME = 400;
const STOP_SPINNING_TIME = 4000;

export const Wheel = ({
  mustStartSpinning,
  prizeNumber,
  onClick = () => null,
  onStopSpinning = () => null,
}) => {
  const [startRotationDegrees, setStartRotationDegrees] = useState(0);
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
  const mustStopSpinning = useRef(false);

  const startSpinning = () => {
    setHasStartedSpinning(true);
    setHasStoppedSpinning(false);
    mustStopSpinning.current = true;
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false;
        setHasStartedSpinning(false);
        setHasStoppedSpinning(true);
        onStopSpinning();
      }
    }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
  };

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true);
      startSpinning();
      const finalRotationDegreesCalculated = getRotationDegrees(
        prizeNumber,
        20
      );
      setFinalRotationDegrees(finalRotationDegreesCalculated);
    }
  }, [mustStartSpinning]);

  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false);
      setStartRotationDegrees(finalRotationDegrees);
    }
  }, [hasStoppedSpinning]);

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING;
    }
    return "";
  };

  return (
    <>
      <RotationContainer
        className={getRouletteClass()}
        startSpinningTime={START_SPINNING_TIME}
        continueSpinningTime={CONTINUE_SPINNING_TIME}
        stopSpinningTime={STOP_SPINNING_TIME}
        startRotationDegrees={startRotationDegrees}
        finalRotationDegrees={finalRotationDegrees}
      >
        <img
          src="assets/roullette.png"
          alt="wheel"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            margin: "0 auto",
            //transform: `rotate(22.5deg)`
          }}
        />
      </RotationContainer>
      <img
        src="assets/marker.png"
        alt="marker"
        style={{
          position: "absolute",
          width: "6em",
          filter: "drop-shadow(-10px 30px 5px #000000CC)",
          left: "19.5em",
          top: "-3em",
          zIndex: 2,
        }}
      />
      <img
        src="assets/button.gif"
        alt="button"
        onClick={() => onClick()}
        style={{
          cursor: "pointer",
          position: "absolute",
          height: "10em",
          width: "10em",
          filter: "drop-shadow(-10px 30px 5px #000000CC)",
          left: "17.5em",
          top: "17.5em",
          zIndex: 3,
        }}
      />
    </>
  );
};
