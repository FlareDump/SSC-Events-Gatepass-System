export default function Navbar(props) {
	return (
		<nav className="fixed top-0 right-0 left-85 flex items-center justify-between bg-white px-10 py-4 shadow-md">
			<h1 className="translate-y-2 text-2xl font-bold">{props.name}</h1>
		</nav>
	);
}
