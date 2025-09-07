import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	// Constant user credentials for verification
	const ADMIN_CREDENTIALS = {
		email: 'adminsti@email.com',
		password: 'adminsti',
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		setTimeout(() => {
			if (verifyLogin(email, password)) {
				// Login successful - redirect to Gatepass
				navigate('/Gatepass');
			} else {
				setError('Invalid email or password. Please try again.');
			}
			setIsLoading(false);
		}, 500);
	};

	const verifyLogin = (inputEmail, inputPassword) => {
		return (
			inputEmail.trim().toLowerCase() ===
				ADMIN_CREDENTIALS.email.toLowerCase() &&
			inputPassword === ADMIN_CREDENTIALS.password
		);
	};

	return (
		<div className="bg-accent flex min-h-screen items-center justify-center">
			<div className="bg-accebt w-full max-w-md rounded-lg p-8 shadow-lg">
				<h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
				<img
					src="/public/Logo/SSC Logo.png"
					alt="SSC"
					className="mx-auto h-40 w-40"
				/>

				{error && (
					<div className="border-danger/20 bg-danger/10 mb-4 rounded-md border p-3">
						<p className="text-danger text-sm">{error}</p>
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="focus:ring-primary border-gray w-full rounded-md border px-4 py-2 focus:ring-2 focus:outline-none"
							required
						/>
					</div>
					<div>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="focus:ring-primary border-gray w-full rounded-md border px-4 py-2 focus:ring-2 focus:outline-none"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className={`text-light w-full rounded-md py-2 transition duration-200 ${
							isLoading
								? 'cursor-not-allowed bg-gray-400'
								: 'bg-primary hover:bg-primary-dark'
						}`}
					>
						{isLoading ? 'Logging in...' : 'Log In'}
					</button>
				</form>

				{/* Development helper - remove in production */}
				<div className="border-primary/30 bg-primary/10 mt-6 rounded-md border p-3">
					<p className="text-primary text-xs font-medium">Test Credentials:</p>
					<p className="text-primary text-xs">
						Email: {ADMIN_CREDENTIALS.email}
					</p>
					<p className="text-primary text-xs">
						Password: {ADMIN_CREDENTIALS.password}
					</p>
				</div>
			</div>
		</div>
	);
}
