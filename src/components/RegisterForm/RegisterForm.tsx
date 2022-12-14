import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Box, Alert, AlertIcon, CircularProgress } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { registerSchema } from "../../schemas/registerSchema";
import {
  RegisterBox,
  RegisterFormBox,
  RegisterTextBox,
  RegisterTitle,
  RegisterDescription,
  RegisterForm,
  RegisterFormControl,
  RegisterLabel,
  RegisterInput,
  RegisterButton,
  RegisterRoutetext,
  RegisterFieldError,
  RegisterHrBox,
  RegisterHr,
  RegisterHrText,
  RegisterIconsBox,
  RegisterFacebookIcon,
  RegisterGoogleIcon,
  RegisterTwitterIcon,
} from "./RegisterStyled.styled";
import { registerUser } from "../../api/user";
import ENDPOINTS from "../../config/endpoints";

const Register = () => {
  const { isLightMode, theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const authenticateViaGoogle = () => {
    window.open(ENDPOINTS.GOOGLE_AUTH_URL, "_self");
    localStorage.setItem("authProvider", "google");
  };
  const authenticateViaFacebook = () => {
    window.open(ENDPOINTS.FACEBOOK_AUTH_URL, "_self");
    localStorage.setItem("authProvider", "facebook");
  };
  const authenticateViaLinkedin = () => {
    window.open(ENDPOINTS.LINKEDIN_AUTH_URL, "_self");
    localStorage.setItem("authProvider", "linkedin");
  };

  return (
    <RegisterBox
      style={isLightMode ? { ...theme.lightMode } : { ...theme.darkMode }}
    >
      <RegisterFormBox
        style={
          isLightMode
            ? { ...theme.lightMode }
            : { ...theme.darkMode, background: "hsl(220, 35%, 20%)" }
        }
      >
        {Object.keys(errors).length > 0 && (
          <Box p="4">
            {Object.values(errors).map((err) => (
              <Alert status="error" key={err} mb="2">
                <AlertIcon />
                {err}
              </Alert>
            ))}
          </Box>
        )}
        <RegisterTextBox>
          <RegisterTitle
            style={
              isLightMode
                ? { color: theme.lightMode.color }
                : { color: theme.darkMode.color }
            }
          >
            Create an Account
          </RegisterTitle>
        </RegisterTextBox>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async (userData) => {
            console.log(userData);
            try {
              const response = await registerUser(userData);
              if (response.data.message) {
                localStorage.removeItem("user");
                navigate("/login");
              } else {
                setErrors(response.data);
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {(props) => (
            <RegisterForm onSubmit={props.handleSubmit}>
              <RegisterFormControl>
                <RegisterLabel
                  htmlFor="username"
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                >
                  Username
                </RegisterLabel>
                <RegisterInput
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Please enter username"
                  value={props.values.username}
                  onChange={props.handleChange}
                  isDarkMode={isLightMode ? false : true}
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                />
                {props.errors.username && props.touched.username ? (
                  <RegisterFieldError>
                    {props.errors.username}
                  </RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterFormControl>
                <RegisterLabel
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                  htmlFor="email"
                >
                  Email
                </RegisterLabel>
                <RegisterInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  isDarkMode={isLightMode ? false : true}
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                />
                {props.errors.email && props.touched.email ? (
                  <RegisterFieldError>{props.errors.email}</RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterFormControl>
                <RegisterLabel
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                  htmlFor="password"
                >
                  Password
                </RegisterLabel>
                <RegisterInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  isDarkMode={isLightMode ? false : true}
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                />
                {props.errors.password && props.touched.password ? (
                  <RegisterFieldError>
                    {props.errors.password}
                  </RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterFormControl>
                <RegisterLabel
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                  htmlFor="c-password"
                >
                  Confirm Password
                </RegisterLabel>
                <RegisterInput
                  type="password"
                  id="c-password"
                  name="confirmPassword"
                  placeholder="Please confirm password"
                  value={props.values.confirmPassword}
                  onChange={props.handleChange}
                  isDarkMode={isLightMode ? false : true}
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                />
                {props.errors.confirmPassword &&
                props.touched.confirmPassword ? (
                  <RegisterFieldError>
                    {props.errors.confirmPassword}
                  </RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterButton
                type="submit"
                style={
                  props.isSubmitting && errors.length < 1
                    ? { opacity: ".4", cursor: "not-allowed" }
                    : { opacity: "1", cursor: "pointer" }
                }
              >
                {props.isSubmitting && errors.length < 1 ? (
                  <CircularProgress isIndeterminate value={80} size="30px" />
                ) : (
                  "Register"
                )}
              </RegisterButton>
            </RegisterForm>
          )}
        </Formik>
        <RegisterRoutetext
          style={
            isLightMode
              ? { color: theme.lightMode.color }
              : { color: theme.darkMode.color }
          }
        >
          Already Have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#5a8dee", textDecoration: "none" }}
          >
            Sign In
          </Link>
        </RegisterRoutetext>
        <RegisterHrBox>
          <RegisterHr />
          <RegisterHrText>or sign up with</RegisterHrText>
          <RegisterHr />
        </RegisterHrBox>
        <RegisterIconsBox>
          <RegisterFacebookIcon onClick={authenticateViaFacebook} />
          <RegisterGoogleIcon onClick={authenticateViaGoogle} />
          <RegisterTwitterIcon onClick={authenticateViaLinkedin} />
        </RegisterIconsBox>
      </RegisterFormBox>
    </RegisterBox>
  );
};

export default Register;
