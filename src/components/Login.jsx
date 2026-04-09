import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.token) {
        // 1. Save the token in our App state
        setToken(result.token);
        
        // 2. Optional: Save to localStorage so it stays if you refresh
        localStorage.setItem("token", result.token);
        
        // 3. Send the user to their account page
        navigate("/account");
      } else {
        setMessage(result.message || "Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}