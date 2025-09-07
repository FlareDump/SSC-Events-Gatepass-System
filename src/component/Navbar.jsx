import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
	const navigate = useNavigate();

	const handleLogout = () => {
		// You can add any logout logic here (clear tokens, etc.)
		navigate('/');
	};

	return (
		<nav className="fixed top-0 right-0 left-85 flex items-center justify-between bg-white px-10 py-4 shadow-md">
			<h1 className="translate-y-2 text-2xl font-bold">{props.name}</h1>

			<button
				onClick={handleLogout}
				className="rounded-md bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
			>
				Logout
			</button>
		</nav>
	);
}
