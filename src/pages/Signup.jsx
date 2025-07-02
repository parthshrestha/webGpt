import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

// (Temporary) hardcoded promo list
const VALID_PROMO_CODES = ["FREEMONTH", "ALPHA100", "WEBGPTGIFT"];

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    promo: "",
    selectedTier: "free"
  });

  const [message, setMessage] = useState("");
  const [promoValid, setPromoValid] = useState(false);

  useEffect(() => {
    // Auto-redirect if user already logged in
    const checkSession = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) navigate("/chat");
    };
    checkSession();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "promo") {
      const isValid = VALID_PROMO_CODES.includes(value.trim().toUpperCase());
      setPromoValid(isValid);
      if (isValid) {
        setFormData(prev => ({ ...prev, selectedTier: "paid" }));
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password, confirmPassword, selectedTier } = formData;

    if (!email || !password || !name) {
      return setMessage("Please fill in all required fields.");
    }
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          tier: selectedTier
        }
      }
    });

    if (error) return setMessage("Signup failed: " + error.message);

    setMessage("Signup successful! Check your email to confirm.");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up for WebGPT</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />
        <input
          name="promo"
          placeholder="Promo Code (optional)"
          onChange={handleChange}
        />

        {promoValid && <p style={{ color: "green" }}>✅ Promo code valid!</p>}

        <label>
          Choose Tier:
          <select
            name="selectedTier"
            value={formData.selectedTier}
            onChange={handleChange}
            disabled={promoValid}
          >
            <option value="free">Free (15 requests/week)</option>
            <option value="paid">Paid (unlocked features)</option>
          </select>
        </label>

        <button type="submit">Create Account</button>
        {message && <p>{message}</p>}
        <p>
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
