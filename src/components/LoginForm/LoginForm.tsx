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
import { getUserToken, loginUser } from "../../api/user";
import ENDPOINTS from "../../config/endpoints";

const Login = () => {
  const { storeUser } = useContext(AuthContext);
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
    (async function () {
      const authProviderType = localStorage.getItem("authProvider");
      if (authProviderType === "google") {
        try {
          const response = await getUserToken({ withCredentials: true });
          localStorage.removeItem("authProvider");
          storeUser(response.data);
          setError("");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else if (authProviderType === "facebook") {
        try {
          const response = await getUserToken({ withCredentials: true });
          localStorage.removeItem("authProvider");
          storeUser(response.data);
          setError("");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else if (authProviderType === "linkedin") {
        try {
          const response = await getUserToken({ withCredentials: true });
          localStorage.removeItem("authProvider");
          storeUser(response.data);
          setError("");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  return (
    <LoginBox>
      <LoginFormBox>
        {error && (
          <Box>
            <Alert status="error" mb="2">
              <AlertIcon />
              {error}
            </Alert>
          </Box>
        )}
        <LoginTextBox>
          <LoginTitle>Kanban Task Management</LoginTitle>
          <LoginDescription>
            Please sign-in to your account and start the adventure
          </LoginDescription>
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
                <LoginLabel htmlFor="email">Email</LoginLabel>
                <LoginInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email ? (
                  <LoginFieldError>{errors.email}</LoginFieldError>
                ) : null}
              </LoginFormControl>

              <LoginFormControl>
                <LoginLabel htmlFor="password">Password</LoginLabel>
                <LoginInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter password"
                  value={values.password}
                  onChange={handleChange}
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
        <LoginRoutetext>
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
          <LoginHr />
        </LoginHrBox>
        <LoginIconsBox>
          <LoginFacebookIcon onClick={authenticateViaFacebook} />
          <LoginGoogleIcon onClick={authenticateViaGoogle} />
          <LoginTwitterIcon onClick={authenticateViaLinkedin} />
        </LoginIconsBox>
      </LoginFormBox>
    </LoginBox>
  );
};

export default Login;