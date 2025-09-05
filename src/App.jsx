import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Dashboard from './component/Dashboard';
import './index.css';

export default function App() {
	return (
		<div className="flex h-screen flex-col">
			<div className="flex flex-1">
				<Sidebar />
				<Navbar />
				<Dashboard />
			</div>
		</div>
	);
}
