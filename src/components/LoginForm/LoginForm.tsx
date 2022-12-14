import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginSchema } from "../../schemas/loginSchema";
import {
  Box,
  Alert,
  AlertIcon,
  Checkbox,
  CircularProgress,
} from "@chakra-ui/react";
import { Formik } from "formik";
import {
  LoginBox,
  LoginFormBox,
  LoginTextBox,
  LoginTitle,
  LoginDescription,
  LoginForm,
  LoginFormControl,
  LoginLabel,
  LoginInput,
  LoginButton,
  LoginRoutetext,
  LoginFieldError,
  LoginHrBox,
  LoginHr,
  LoginHrText,
  LoginIconsBox,
  LoginGoogleIcon,
  LoginFacebookIcon,
  LoginTwitterIcon,
} from "./LoginForm.styled";
import { ThemeContext } from "../../context/ThemeContext";
import { getUserToken, loginUser } from "../../api/user";
import ENDPOINTS from "../../config/endpoints";

const Login = () => {
  const { storeUser } = useContext(AuthContext);
  const { isLightMode, theme } = useContext(ThemeContext);
  const loginRememberUserData = JSON.parse(
    localStorage.getItem("login-remember-user") || "{}"
  );
  const navigate = useNavigate();
  const [error, setError] = useState("");

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

  useEffect(() => {
    const user = {
      id: "",
      username: "",
      accessToken: "",
      refreshToken: "",
    };
    const authResUrl = window.location.search.slice(1);
    console.log(authResUrl);
    if (authResUrl) {
      const params = authResUrl.split("=").join(" ").split("&");
      params.forEach((param) => {
        const val = param.split(" ");
        if (val[0] === "id") {
          user["id"] = val[1];
        } else if (val[0] === "username") {
          user["username"] = val[1].replace("%20", " ");
        } else if (val[0] === "accessToken") {
          user["accessToken"] = val[1];
        } else if (val[0] === "refreshToken") {
          user["refreshToken"] = val[1];
        }
      });
      storeUser(user);
      setError("");
      navigate("/");
    }
  }, []);

  return (
    <LoginBox
      style={isLightMode ? { ...theme.lightMode } : { ...theme.darkMode }}
    >
      <LoginFormBox
        style={
          isLightMode
            ? { ...theme.lightMode }
            : { ...theme.darkMode, background: "hsl(220, 35%, 20%)" }
        }
      >
        {error && (
          <Box>
            <Alert
              status="error"
              mb="2"
              sx={
                isLightMode
                  ? { ...theme.lightMode }
                  : { background: "#743d3d", color: "#fff !important" }
              }
            >
              <AlertIcon />
              {error}
            </Alert>
          </Box>
        )}
        <LoginTextBox>
          <LoginTitle
            style={
              isLightMode
                ? { color: theme.lightMode.color }
                : { color: theme.darkMode.color }
            }
          >
            Login to Your Account
          </LoginTitle>
        </LoginTextBox>
        <Formik
          initialValues={{
            email: loginRememberUserData.email || "",
            password: loginRememberUserData.password || "",
            rememberMe: false,
          }}
          validationSchema={loginSchema}
          onSubmit={async (loginData) => {
            console.log(loginData);
            try {
              const response = await loginUser(loginData);
              console.log("Login Response", response);
              if (loginData.rememberMe) {
                localStorage.setItem(
                  "login-remember-user",
                  JSON.stringify(loginData)
                );
              } else {
                localStorage.removeItem("login-remember-user");
              }
              storeUser(response.data);
              setError("");
              navigate("/");
            } catch (error) {
              setError("Wrong Credentials");
            }
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            handleChange,
            values,
          }) => (
            <LoginForm onSubmit={handleSubmit}>
              <LoginFormControl>
                <LoginLabel
                  htmlFor="email"
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                >
                  Email
                </LoginLabel>
                <LoginInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter email"
                  value={values.email}
                  onChange={handleChange}
                  isDarkMode={isLightMode ? false : true}
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                />
                {errors.email && touched.email ? (
                  <LoginFieldError>{errors.email}</LoginFieldError>
                ) : null}
              </LoginFormControl>

              <LoginFormControl>
                <LoginLabel
                  htmlFor="password"
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                >
                  Password
                </LoginLabel>
                <LoginInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter password"
                  value={values.password}
                  onChange={handleChange}
                  isDarkMode={isLightMode ? false : true}
                  style={
                    isLightMode
                      ? { color: theme.lightMode.color }
                      : { color: theme.darkMode.color }
                  }
                />
                {errors.password && touched.password ? (
                  <LoginFieldError>{errors.password}</LoginFieldError>
                ) : null}
              </LoginFormControl>
              <LoginFormControl>
                <Checkbox
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                >
                  Remember Me
                </Checkbox>
              </LoginFormControl>
              <LoginButton
                style={
                  isSubmitting && !error
                    ? { opacity: ".4", cursor: "not-allowed" }
                    : { opacity: "1", cursor: "pointer" }
                }
                type="submit"
              >
                {isSubmitting && !error ? (
                  <CircularProgress isIndeterminate value={80} size="30px" />
                ) : (
                  "Login"
                )}
              </LoginButton>
            </LoginForm>
          )}
        </Formik>
        <LoginRoutetext
          style={isLightMode ? { color: "#1a202c" } : { color: "#fff" }}
        >
          Don't have an acoount yet?
          <Link
            to="/register"
            style={{ color: "#5a8dee", textDecoration: "none" }}
          >
            {" "}
            Register
          </Link>
        </LoginRoutetext>
        <LoginHrBox>
          <LoginHr />
          <LoginHrText>or sign with</LoginHrText>
          <LoginHr />{" "}
        </LoginHrBox>{" "}
        <LoginIconsBox>
          <LoginFacebookIcon onClick={authenticateViaFacebook} />
          <LoginGoogleIcon onClick={authenticateViaGoogle} />
          <LoginTwitterIcon onClick={authenticateViaLinkedin} />{" "}
        </LoginIconsBox>
      </LoginFormBox>
    </LoginBox>
  );
};

export default Login;
