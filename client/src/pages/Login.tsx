import React, { useState } from 'react';
import instance from '../utils/axios'; // Import Axios instance for API requests
import {
  Container, Typography, TextField, Button, Paper, Link, CircularProgress,
} from '@mui/material'; // Import MUI components
import styled from '@emotion/styled'; // Import styled components from Emotion
import { useUser } from '../contexts/userAuth'; // Custom hook for user authentication context
import { useNavigate } from 'react-router-dom'; // Hook for navigation

function Auth() {

  // State to manage login/register tabs and user context
  const [tab, setTab] = useState<"login" | "register">("login");
  const { user } = useUser(); // Access user context
  const navigate = useNavigate(); // Navigation hook

  // Redirect to homepage if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user]);

  // Switch between login and register tabs
  function switched() {
    setTab(tab === "login" ? "register" : "login");
  }

  // Render either login or register component based on tab state
  return tab === "login" ? <Login callback={switched} /> : <Register callback={switched} />;
}

export default Auth;

// Styled container for form layout
const FormContainer = styled(Container)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

// Styled paper component for form styling
const PaperStyled = styled(Paper)`
  width: 700px;
  padding: 25px;
  border-radius: 5px;
`;

// Login component
const Login = ({ callback }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser(); // Access user context

  // Handle form submission for login
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      setUser(null); // Clear user context
      const response = await instance.post('/login', { email, password }); // Send login request
      localStorage.setItem("access_token", response.data.token); // Store token in local storage
      setUser(response.data.user); // Set user in context
    } catch (err) {
      alert("Authentication Error"); // Display error if authentication fails
    }
    setLoading(false);
  };

  // Render login form
  return (
    <FormContainer>
      <PaperStyled elevation={3}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
            fullWidth
            style={{ marginTop: 16 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <hr />
          <Link href="#" onClick={callback}>
            Don't have an account? Sign up
          </Link>
        </form>
      </PaperStyled>
    </FormContainer>
  );
}

// Register component
const Register = ({ callback }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser(); // Access user context

  // Handle form submission for registration
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setLoading(true);
    const userData = new FormData();
    userData.append("email", email);
    userData.append("password", password);
    userData.append("name", name);
    try {
      setUser(null); // Clear user context
      const response = await instance.post('/register', userData); // Send registration request
      localStorage.setItem("access_token", response.data.token); // Store token in local storage
      setUser(response.data.user); // Set user in context
    } catch (err) {
      alert("Registration Error"); // Display error if registration fails
    }
    setLoading(false);
  };

  // Render registration form
  return (
    <FormContainer>
      <PaperStyled elevation={3}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
            fullWidth
            style={{ marginTop: 16 }}
          >
            {loading ? <CircularProgress size={24} /> : "Create Account"}
          </Button>
          <hr />
          <Link href="#" onClick={callback}>
            Already have an account? Log in
          </Link>
        </form>
      </PaperStyled>
    </FormContainer>
  );
}