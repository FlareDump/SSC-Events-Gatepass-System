import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import Violates from './component/Violates';
import History from './component/History';
import './index.css';

export default function App() {
	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<Sidebar />

			{/* Main Area */}
			<div className="flex flex-1 flex-col">
				<Navbar name="Violates" />
				<br /> <br /> <br />
				<div className="flex-1 overflow-y-auto p-4">
					<Violates />
				</div>
			</div>
		</div>
	);
}
