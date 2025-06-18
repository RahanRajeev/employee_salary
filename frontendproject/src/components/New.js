import React from 'react'
import { useState } from "react";
// import './Style.css'

const New = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("Please fill the input fields before proceeding");
    const [shiftClass, setShiftClass] = useState("noShift");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
  
    const positions = ["shiftLeft", "shiftRight", "shiftTop", "shiftBottom"];
  
    const shiftButton = () => {
      if (!isDisabled) return;
      const nextClass = positions[Math.floor(Math.random() * positions.length)];
      setShiftClass(nextClass);
    };
  
    const handleInputChange = () => {
      if (username.trim() === "" || password.trim() === "") {
        setMessage("Please fill the input fields before proceeding");
        setIsDisabled(true);
        setShiftClass("noShift");
      } else {
        setMessage("Great! Now you can proceed");
        setIsDisabled(false);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert("Login Successful");
    };

    const styles = {
        mainContainer: {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        },
        formContainer: {
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          height: "550px",
        },
        title: { fontSize: "26px", fontWeight: "bold", color: "#ffffff", marginBottom: "15px" },
        msg: { color: isDisabled ? "#ff4f4f" : "#60d394", marginBottom: "25px" },
    
        inputContainer: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: "16px",
        },
        inputField: {
          width: "100%",
          padding: "14px",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "8px",
          fontSize: "16px",
          background: "rgba(255, 255, 255, 0.2)",
          color: "#fff",
          outline: "none",
          transition: "0.3s",
        },
        btnContainer: {
          padding: "15px",
          marginTop: "30px",
        },
        loginBtn: {
          padding: "14px 26px",
          border: "none",
          background: isHovered
            ? "linear-gradient(135deg, #f857a6, #ff5858)"
            : "linear-gradient(135deg, #ff9a9e, #fad0c4)",
          color: "#24243e",
          fontWeight: "bold",
          fontSize: "18px",
          borderRadius: "8px",
          transition: "0.1s ease-in-out",
          cursor: "pointer",
          position: "relative",
        },
    
        signup: { color: "#fff", marginTop: "20px" },
    
        shiftLeft: { transform: "translateX(-80px)", transition: "0.1s ease-in-out" }, // Left: 80px
        shiftRight: { transform: "translateX(80px)", transition: "0.1s ease-in-out" }, // Right: 80px
        shiftTop: { transform: "translateY(-40px)", transition: "0.1s ease-in-out" }, // ✅ Top: Reduced to 40px
        shiftBottom: { transform: "translateY(40px)", transition: "0.1s ease-in-out" }, // ✅ Bottom: Reduced to 40px
        noShift: { transform: "translate(0%, 0%)", transition: "0.1s ease-in-out" },
      };
  return (
    <div style={styles.mainContainer}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.title}>LOGIN</div>
          <div style={styles.msg}>{message}</div>

          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                handleInputChange();
              }}
              style={styles.inputField}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange();
              }}
              style={styles.inputField}
            />
          </div>

          {/* Button now moves less distance up/down */}
          <div style={styles.btnContainer} onMouseEnter={shiftButton} onTouchStart={shiftButton}>
            <input
              type="submit"
              id="login-btn"
              value="Login"
              style={{ ...styles.loginBtn, ...styles[shiftClass] }}
              disabled={isDisabled}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
          <div style={styles.signup}>
            Don't have an Account? <a href="#" style={{ color: "#60d394" }}>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default New