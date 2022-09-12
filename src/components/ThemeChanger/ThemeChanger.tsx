import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeChanger = () => {
  const { toggleTheme, isLightMode } = useContext(ThemeContext);
  console.log(isLightMode);
  return (
    <Button
      bgColor="transparent"
      _hover="transparent"
      _active="transparent"
      onClick={toggleTheme}
    >
      {isLightMode ? (
        <BsFillSunFill style={{ fontSize: "25px" }} />
      ) : (
        <BsFillMoonFill style={{ fontSize: "20px" }} />
      )}
    </Button>
  );
};

export default ThemeChanger;
