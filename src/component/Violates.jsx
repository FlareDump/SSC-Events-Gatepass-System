import React, { useState, useEffect } from 'react';

export default function Violates() {
	const [students, setStudents] = useState([
		{
			id: 1,
			name: 'Juan Dela Cruz',
			section: 'BSIT 301',
			code: '01',
			status: 'DNR',
			startTime: Date.now(),
		},
		{
			id: 2,
			name: 'Maria Santos',
			section: 'BSCS 501',
			code: '02',
			status: 'DNR',
			startTime: Date.now(),
		},
		{
			id: 3,
			name: 'Jose Rivera',
			section: 'BSIT 302',
			code: '01',
			status: 'DNR',
			startTime: Date.now(),
		},
	]);

	const handleButtonClick = (e, callback) => {
		const button = e.currentTarget;
		button.style.transform = 'scale(0.95)';

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

		if (callback) {
			callback();
		}
	};

	const handleLateAction = (studentId) => {
		console.log(`Late action for student ID: ${studentId}`);
	};

	return (
		<div className="table-container">
			<table className="bg-accent scrollable-table w-full overflow-hidden rounded-md shadow-sm">
				<thead className="bg-primary text-light">
					<tr>
						<th className="px-10 py-3 text-center font-semibold">
							Student Name
						</th>
						<th className="px-10 py-3 text-center font-semibold">Section</th>
						<th className="px-10 py-3 text-center font-semibold">Code</th>
						<th className="px-10 py-3 text-center font-semibold">Status</th>
						<th className="px-10 py-3 text-center font-semibold">Action</th>
					</tr>
				</thead>
				<tbody>
					{students.map((student, index) => (
						<tr
							key={student.id}
							className={`${
								index % 2 === 0 ? 'bg-danger/20' : 'bg-danger/10'
							} hover:bg-secondary/30 transition-colors`}
						>
							<td className="px-4 py-3 text-center">{student.name}</td>
							<td className="px-4 py-3 text-center">{student.section}</td>
							<td className="px-4 py-3 text-center">{student.code}</td>
							<td className="px-4 py-3 text-center">{student.status}</td>
							<td className="px-4 py-3 text-center">
								<button
									onClick={(e) =>
										handleButtonClick(e, () => handleLateAction(student.id))
									}
									className="bg-primary text-light relative transform cursor-pointer overflow-hidden rounded px-2 py-1 shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-95"
								>
									<div className="ripple-container absolute inset-0"></div>
									<span className="relative z-10">Late</span>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

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

				.table-container {
					max-height: 70vh; /* Changed to 70% of viewport height */
					max-width: 100%; /* Fits parent container */
					overflow-x: auto; /* Enables horizontal scrolling */
					overflow-y: auto; /* Enables vertical scrolling */
				}

				.scrollable-table {
					min-width: 800px; /* Ensures horizontal scrolling */
					border-collapse: collapse;
				}

				.scrollable-table thead {
					position: sticky;
					top: 0;
					z-index: 10;
					background-color: #3b82f6; /* Fallback for bg-primary */
					color: #ffffff; /* Fallback for text-light */
				}

				.scrollable-table th {
					background-color: #3b82f6; /* Ensure th matches thead */
					color: #ffffff; /* Ensure text is visible */
				}
			`}</style>
		</div>
	);
}
