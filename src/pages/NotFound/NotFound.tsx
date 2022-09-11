import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PageNotFoundImg from "../../assets/—Pngtree—cartoon hand drawn 404 error_5391390.png";
import {
  NotFoundBox,
  NotFoundImgWrapper,
  NotFoundImg,
  NotFoundTitle,
  NotFoundDescription,
} from "./NotFound.styled";
import { ThemeContext } from "../../context/ThemeContext";

const NotFound = () => {
  const { theme, isLightMode } = useContext(ThemeContext);
  console.log(theme);
  return (
    <NotFoundBox
      style={isLightMode ? { ...theme.lightMode } : { ...theme.darkMode }}
    >
      <NotFoundImgWrapper>
        <NotFoundImg src={PageNotFoundImg} alt="not image" />
      </NotFoundImgWrapper>
      <NotFoundTitle
        style={
          isLightMode
            ? { color: theme.lightMode.color }
            : { color: theme.darkMode.color }
        }
      >
        You visited unexisting page!
      </NotFoundTitle>
      <NotFoundDescription
        style={
          isLightMode
            ? { color: theme.lightMode.gray }
            : { color: theme.darkMode.gray }
        }
      >
        Current page does not exist, go back to{" "}
        <Link to="/" style={{ color: "#0f68b7" }}>
          HOME
        </Link>{" "}
        page
      </NotFoundDescription>
    </NotFoundBox>
  );
};

export default NotFound;
