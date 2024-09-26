import React, { useState } from 'react';
import instance, { extractErrorMessage } from '../utils/axios';
import {
	Container, Typography, TextField, Button, Paper, Link, CircularProgress,
	Box,
} from '@mui/material';
import styled from '@emotion/styled';
import { useUser } from '../contexts/userAuth';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function Auth() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = React.useState<string | null>(null)
	const { setUser } = useUser();
	const navigate = useNavigate();

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			setUser(null);
			const response = await instance.post('/login', { email, password });
			localStorage.setItem("access_token", response.data.token);
			setUser(response.data.user);
			navigate('/signup')
		} catch (err) {
			setStatus(extractErrorMessage(err));
		}
		setLoading(false);
	};

	return (
		<FormContainer>
			<PaperStyled>
				<form onSubmit={handleSubmit}>
					<Typography variant="h4" component="h1" gutterBottom>
						Login
					</Typography>
					{status && <Alert variant="danger">{status}</Alert>}
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
					<Link href="/signup">
						Don't have an account? Sign up
					</Link>
				</form>
			</PaperStyled>
		</FormContainer>
	);
}

export default Auth;

const FormContainer = styled(Container)`
  display: flex;
  min-height: calc(100vh - 55px - 78px);
  justify-content: center;
  align-items: center;
`;

const PaperStyled = styled(Box)`
  width: 500px;
  padding: 25px;
  border-radius: 5px;
`;