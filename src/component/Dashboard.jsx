import React, { useState, useEffect } from 'react';

export default function Dashboard() {
	const [students, setStudents] = useState([
		{
			id: 1,
			name: 'Juan Dela Cruz',
			section: 'BSIT 3-1',
			code: 'GP001',
			status: 'On Gatepass',
			startTime: Date.now(),
		},
		{
			id: 2,
			name: 'Maria Santos',
			section: 'BSCS 2-2',
			code: 'GP002',
			status: 'On Gatepass',
			startTime: Date.now(),
		},
		{
			id: 3,
			name: 'Jose Rivera',
			section: 'BSIT 2-1',
			code: 'GP003',
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
		<div className="bg-accent flex">
			<div className="flex w-full gap-10">
				{/* Left Side - Form */}
				<div className="bg-accent max-h-[55vh] w-[35vw] rounded-lg p-6 shadow-md">
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
								className="bg-primary/20 w-full rounded-md border-0 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
								className="bg-primary/20 w-full rounded-md border-0 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
								className="bg-primary/20 w-full rounded-md border-0 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</div>

						<button
							onClick={handleAddStudent}
							className="mt-6 w-20 rounded-md bg-green-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-600"
						>
							Start
						</button>
					</div>
				</div>

				{/* Right Side - Active List Table */}
				<div className="bg-secondary/50 w-[35vw] flex-1 rounded-lg p-6">
					<h2 className="text-primary mb-6 text-xl font-bold">Active</h2>

					{activeStudents.length === 0 ? (
						<div className="text-dark/50 mt-8 text-center">
							No active gatepass entries
						</div>
					) : (
						<div className="max-h-[70vh] overflow-x-auto overflow-y-auto">
							<table className="bg-accent w-full overflow-hidden rounded-md shadow-sm">
								<thead className="bg-primary text-light">
									<tr>
										<th className="px-4 py-3 text-left font-semibold">
											Student Name
										</th>
										<th className="px-4 py-3 text-left font-semibold">
											Section
										</th>
										<th className="px-4 py-3 text-left font-semibold">Code</th>
										<th className="px-4 py-3 text-left font-semibold">Time</th>
										<th className="px-4 py-3 text-center font-semibold">
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
											<td className="text-dark px-4 py-3 font-medium">
												{student.name}
											</td>
											<td className="text-dark px-4 py-3">{student.section}</td>
											<td className="text-dark px-4 py-3">{student.code}</td>
											<td className="text-dark px-4 py-3 font-mono">
												{formatTime(student.startTime)}
											</td>
											<td className="px-4 py-3 text-center">
												<button
													onClick={() => handleDone(student.id)}
													className="bg-danger rounded px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
												>
													Stop
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
