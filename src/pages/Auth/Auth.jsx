import React, { useState } from "react";
import "./Auth.css";
// import Logo from "../../img/logo.png";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Action/login.action";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        {/* <img src={Logo} alt="" /> */}
        <div className="Webname">
          <h1>ZAM STUDIOS</h1>
        </div>
      </div>

      <LogIn />
    </div>
  );
};
function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("zam@yopmail.com");
  const [password, setPassword] = useState("Zamp123@#$");

  const hanldeLogin = async (e) => {
    e.preventDefault();
    const response = await dispatch(login(email, password));
    // console.log(response);
    response.status && navigate("/home") 
  };
  return (
    <div className="a-right">
      <form className="infoForm authForm">
        <h3>Log In</h3>

        <div>
          <input
            type="text"
            placeholder="Username"
            className="infoInput"
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button className="button infoButton" onClick={hanldeLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;
