import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar(props) {
	const navigate = useNavigate();
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Check for saved dark mode preference on component mount
	useEffect(() => {
		const savedDarkMode = localStorage.getItem('darkMode') === 'true';
		setIsDarkMode(savedDarkMode);

		// Apply dark mode class to document
		if (savedDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);

	// Enhanced click handler with animation effect
	const handleButtonClick = (e, callback) => {
		// Add click animation effect
		const button = e.currentTarget;
		button.style.transform = 'scale(0.95)';

		// Add ripple effect
		const ripple = document.createElement('span');
		const rect = button.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = e.clientX - rect.left - size / 2;
		const y = e.clientY - rect.top - size / 2;

		ripple.style.width = ripple.style.height = size + 'px';
		ripple.style.left = x + 'px';
		ripple.style.top = y + 'px';
		ripple.classList.add('ripple');

		const rippleContainer = button.querySelector('.ripple-container');
		if (rippleContainer) {
			rippleContainer.appendChild(ripple);
		}

		setTimeout(() => {
			button.style.transform = 'scale(1)';
			if (ripple && ripple.parentNode) {
				ripple.parentNode.removeChild(ripple);
			}
		}, 300);

		// Call the original callback
		callback();
	};

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);

		// Save preference to localStorage
		localStorage.setItem('darkMode', newDarkMode.toString());

		// Toggle dark class on document element
		if (newDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	return (
		<nav className="bg-accent flex w-full items-center justify-between px-10 py-4 shadow-md transition-colors duration-200">
			<h1 className="text-primary translate-y-2 text-2xl font-bold">
				{props.name}
			</h1>
			<div className="flex items-center">
				{/* Dark Mode Toggle Button */}
				<button
					onClick={(e) => handleButtonClick(e, toggleDarkMode)}
					className="text-dark hover:bg-primary/10 relative transform cursor-pointer overflow-hidden rounded-full p-2 text-3xl transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-110 focus:outline-none active:scale-95"
					aria-label="Toggle dark mode"
				>
					<div className="ripple-container absolute inset-0"></div>
					<i
						className={` ${isDarkMode ? 'fa-solid fa-lightbulb' : 'fa-regular fa-lightbulb'} relative z-10 transition-all duration-200 ${isDarkMode ? 'text-yellow-500' : 'text-gray-600'} hover:text-yellow-400`}
					></i>
				</button>
			</div>

			<style jsx>{`
				@keyframes ripple {
					0% {
						transform: scale(0);
						opacity: 0.6;
					}
					100% {
						transform: scale(4);
						opacity: 0;
					}
				}

				.ripple {
					position: absolute;
					border-radius: 50%;
					background-color: rgba(255, 255, 255, 0.6);
					animation: ripple 0.6s linear;
					pointer-events: none;
				}
			`}</style>
		</nav>
	);
}
