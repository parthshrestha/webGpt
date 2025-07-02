import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect if already logged in
    const checkSession = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) navigate("/chat");
    };
    checkSession();
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setMsg("Login failed: " + error.message);
    } else {
      navigate("/chat");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to WebGPT</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {msg && <p>{msg}</p>}
        <p>
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
