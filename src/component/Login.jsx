import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate(); // Add this line

	// Constant user credentials for verification
	const ADMIN_CREDENTIALS = {
		email: 'adminsti@email.com',
		password: 'adminsti',
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		// Simulate a small delay for realistic feel
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
		<div className="flex min-h-screen items-center justify-center bg-gray-100">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
				<h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
					Login
				</h2>
				<img
					src="/public/Logo/SSC Logo.png"
					alt="SSC"
					className="mx-auto h-40 w-40"
				/>

				{error && (
					<div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
						<p className="text-sm text-red-600">{error}</p>
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
							required
						/>
					</div>
					<div>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="focus:ring-primary w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className={`w-full rounded-md py-2 text-white transition duration-200 ${
							isLoading
								? 'cursor-not-allowed bg-gray-400'
								: 'bg-primary hover:bg-primary-dark'
						}`}
					>
						{isLoading ? 'Logging in...' : 'Log In'}
					</button>
				</form>

				{/* Development helper - remove in production */}
				<div className="mt-6 rounded-md border border-blue-200 bg-blue-50 p-3">
					<p className="text-xs font-medium text-blue-600">Test Credentials:</p>
					<p className="text-xs text-blue-600">
						Email: {ADMIN_CREDENTIALS.email}
					</p>
					<p className="text-xs text-blue-600">
						Password: {ADMIN_CREDENTIALS.password}
					</p>
				</div>
			</div>
		</div>
	);
}
