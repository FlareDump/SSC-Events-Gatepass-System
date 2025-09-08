import React, { useState, useEffect } from 'react';

export default function Dashboard() {
	const [students, setStudents] = useState([
		{
			id: 1,
			name: 'Juan Dela Cruz',
			section: 'BSIT 301',
			code: '01',
			status: 'On Gatepass',
			startTime: Date.now(),
		},
		{
			id: 2,
			name: 'Maria Santos',
			section: 'BSCS 501',
			code: '02',
			status: 'On Gatepass',
			startTime: Date.now(),
		},
		{
			id: 3,
			name: 'Jose Rivera',
			section: 'BSIT 302',
			code: '301',
			status: 'On Gatepass',
			startTime: Date.now(),
		},
	]);

	const [newStudent, setNewStudent] = useState({
		name: '',
		section: '',
		code: '',
	});

	// Generate gatepass code
	const generateCode = () => {
		return 'GP' + String(Date.now()).slice(-3);
	};

	// Format timer (mm:ss)
	const formatTime = (startTime) => {
		const elapsed = Math.floor((Date.now() - startTime) / 1000);
		const minutes = Math.floor(elapsed / 60);
		const seconds = elapsed % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	};

	// ⏱ Auto-mark sanction if >30 mins
	useEffect(() => {
		const interval = setInterval(() => {
			setStudents((prev) =>
				prev.map((student) => {
					if (student.status === 'On Gatepass' && student.startTime) {
						const elapsed = (Date.now() - student.startTime) / 1000 / 60; // in minutes
						if (elapsed >= 30) {
							return { ...student, status: 'Sanction' };
						}
					}
					return student;
				})
			);
		}, 1000);
		return () => clearInterval(interval);
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

	const handleAddStudent = () => {
		if (!newStudent.name || !newStudent.section) return;
		const code = generateCode();
		setStudents([
			...students,
			{
				id: Date.now(),
				name: newStudent.name,
				section: newStudent.section,
				code: code,
				status: 'On Gatepass',
				startTime: Date.now(),
			},
		]);
		setNewStudent({ name: '', section: '', code: '' });
	};

	const handleDone = (id) => {
		setStudents(
			students.map((s) => (s.id === id ? { ...s, status: 'Done' } : s))
		);
	};

	// Filter active students
	const activeStudents = students.filter((s) => s.status === 'On Gatepass');

	return (
		<div className="bg-accent flex p-4 sm:p-6 lg:max-h-[70vh]">
			<div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-10">
				{/* Left Side - Form */}
				<div className="bg-accent max-h-[50vh] w-full rounded-lg p-4 shadow-md sm:p-6 lg:w-96 lg:max-w-96 lg:min-w-96">
					<div className="space-y-4">
						<div>
							<label className="text-dark mb-2 block text-sm font-semibold">
								Student Name
							</label>
							<input
								type="text"
								placeholder="Name"
								value={newStudent.name}
								onChange={(e) =>
									setNewStudent({
										...newStudent,
										name: e.target.value,
									})
								}
								className="bg-primary/20 hover:bg-primary/30 w-full rounded-md border-0 px-4 py-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-base"
							/>
						</div>

						<div>
							<label className="text-dark mb-2 block text-sm font-semibold">
								Section
							</label>
							<input
								type="text"
								placeholder="Section"
								value={newStudent.section}
								onChange={(e) =>
									setNewStudent({
										...newStudent,
										section: e.target.value,
									})
								}
								className="bg-primary/20 hover:bg-primary/30 w-full rounded-md border-0 px-4 py-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-base"
							/>
						</div>

						<div>
							<label className="text-dark mb-2 block text-sm font-semibold">
								Gatepass Code
							</label>
							<input
								type="text"
								placeholder="Gatepass Code"
								value={newStudent.code}
								onChange={(e) =>
									setNewStudent({
										...newStudent,
										code: e.target.value,
									})
								}
								className="bg-primary/20 hover:bg-primary/30 w-full rounded-md border-0 px-4 py-3 text-sm transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-base"
							/>
						</div>

						<button
							onClick={(e) => handleButtonClick(e, handleAddStudent)}
							disabled={!newStudent.name || !newStudent.section}
							className={`relative mt-6 w-full transform overflow-hidden rounded-md px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none active:scale-95 sm:w-auto ${
								!newStudent.name || !newStudent.section
									? 'cursor-not-allowed bg-gray-400 opacity-60'
									: 'cursor-pointer bg-green-500 hover:-translate-y-0.5 hover:bg-green-600'
							} `}
						>
							<div className="ripple-container absolute inset-0"></div>
							<span className="relative z-10 flex items-center justify-center gap-2">
								Start
							</span>
						</button>
					</div>
				</div>

				{/* Right Side - Active List Table */}
				<div className="bg-secondary/70 max-h-[75vh] w-full flex-1 overflow-y-auto rounded-lg p-4 sm:p-6">
					<h2 className="text-dark mb-6 text-lg font-bold sm:text-xl">
						Active
					</h2>

					{activeStudents.length === 0 ? (
						<div className="text-dark/50 mt-8 text-center text-sm sm:text-base">
							No active gatepass entries
						</div>
					) : (
						<div className="overflow-x-auto overflow-y-auto">
							{/* Desktop Table View */}
							<div className="hidden sm:block">
								<table className="bg-accent w-full overflow-hidden rounded-md shadow-sm">
									<thead className="bg-primary text-light">
										<tr>
											<th className="px-3 py-2 text-left text-sm font-semibold lg:px-4 lg:py-3 lg:text-base">
												Student Name
											</th>
											<th className="px-3 py-2 text-left text-sm font-semibold lg:px-4 lg:py-3 lg:text-base">
												Section
											</th>
											<th className="px-3 py-2 text-left text-sm font-semibold lg:px-4 lg:py-3 lg:text-base">
												Code
											</th>
											<th className="px-3 py-2 text-left text-sm font-semibold lg:px-4 lg:py-3 lg:text-base">
												Time
											</th>
											<th className="px-3 py-2 text-center text-sm font-semibold lg:px-4 lg:py-3 lg:text-base">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{activeStudents.map((student, index) => (
											<tr
												key={student.id}
												className={`${
													index % 2 === 0 ? 'bg-primary/20' : 'bg-primary/10'
												} hover:bg-secondary/30 transition-colors`}
											>
												<td className="text-dark px-3 py-2 text-sm font-medium lg:px-4 lg:py-3 lg:text-base">
													{student.name}
												</td>
												<td className="text-dark px-3 py-2 text-sm lg:px-4 lg:py-3 lg:text-base">
													{student.section}
												</td>
												<td className="text-dark px-3 py-2 text-sm lg:px-4 lg:py-3 lg:text-base">
													{student.code}
												</td>
												<td className="text-dark px-3 py-2 font-mono text-sm lg:px-4 lg:py-3 lg:text-base">
													{formatTime(student.startTime)}
												</td>
												<td className="px-3 py-2 text-center lg:px-4 lg:py-3">
													<button
														onClick={(e) =>
															handleButtonClick(e, () => handleDone(student.id))
														}
														className="bg-danger relative transform cursor-pointer overflow-hidden rounded px-3 py-1 text-xs font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-red-500 hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none active:scale-95 sm:px-4 sm:py-2 sm:text-sm"
													>
														<div className="ripple-container absolute inset-0"></div>
														<span className="relative z-10 flex items-center justify-center gap-1">
															Stop
														</span>
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Mobile Card View */}
							<div className="block space-y-4 sm:hidden">
								{activeStudents.map((student, index) => (
									<div
										key={student.id}
										className={`${
											index % 2 === 0 ? 'bg-primary/20' : 'bg-primary/10'
										} bg-accent rounded-lg p-4 shadow-sm`}
									>
										<div className="space-y-2">
											<div className="flex items-start justify-between">
												<div className="flex-1">
													<h3 className="text-dark text-sm font-semibold">
														{student.name}
													</h3>
													<p className="text-dark/70 text-xs">
														{student.section}
													</p>
												</div>
												<div className="text-right">
													<p className="text-dark font-mono text-xs">
														{formatTime(student.startTime)}
													</p>
													<p className="text-dark/70 text-xs">
														Code: {student.code}
													</p>
												</div>
											</div>
											<div className="pt-2">
												<button
													onClick={(e) =>
														handleButtonClick(e, () => handleDone(student.id))
													}
													className="bg-danger relative w-full transform cursor-pointer overflow-hidden rounded px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-105 hover:bg-red-500 hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none active:scale-95"
												>
													<div className="ripple-container absolute inset-0"></div>
													<span className="relative z-10 flex items-center justify-center gap-1">
														Stop
													</span>
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
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
		</div>
	);
}
