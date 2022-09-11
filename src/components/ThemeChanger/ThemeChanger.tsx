import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeChanger = () => {
  const { toggleTheme, isLightMode } = useContext(ThemeContext);
  console.log(isLightMode);
  return (
    <Button colorScheme="green" onClick={toggleTheme}>
      {isLightMode ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ThemeChanger;
