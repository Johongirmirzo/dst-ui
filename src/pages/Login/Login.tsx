import React, { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { UserProps } from "../../types/user";

const Login = ({ user }: UserProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
