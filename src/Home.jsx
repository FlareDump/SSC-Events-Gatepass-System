import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Dashboard from './component/Dashboard';
import './index.css';

export default function App() {
	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Area */}
			<div className="flex flex-1 flex-col">
				<Navbar name="Gatepass System" />
				<br /> <br /> <br />
				<div className="flex-1 overflow-y-auto p-4">
					<Dashboard />
				</div>
			</div>
		</div>
	);
}
