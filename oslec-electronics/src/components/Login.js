import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { FormRow, Alert } from "./Index";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
const initialState = {
  name: "",
  email: "",
  password: "",
  isAdmin: true,
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    admin,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
    setUpUser,
  } = useAppContext();
  const toggleAdmin = () => {
    setValues({ ...values, isAdmin: !values.isAdmin });
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isAdmin } = values;

    if (!email || !password || (!isAdmin && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isAdmin) {
      setUpUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting....",
      });
    } else {
      setUpUser({
        currentUser,
        endPoint: "register",
        alertText: "Admin Created! Redirecting....",
      });
    }
    console.log(values);
  };

  useEffect(() => {
    if (admin) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [admin, navigate]);
  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <h3>{values.isAdmin ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* Name Input*/}
        {!values.isAdmin && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* Email Input*/}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* Password Input*/}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="login-btn" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isAdmin ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleAdmin} className="register-btn">
            {values.isAdmin ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
