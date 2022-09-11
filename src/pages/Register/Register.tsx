import React, { useEffect } from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useNavigate } from "react-router-dom";
import { UserProps } from "../../types/user";

const Register = ({ user }: UserProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
