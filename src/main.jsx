import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Violates from './Violates.jsx';
import History from './History.jsx';
import App from './App.jsx';
import Home from './Home.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/Gatepass', element: <Home /> },
	{ path: '/Violates', element: <Violates /> },
	{ path: '/History', element: <History /> },
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
