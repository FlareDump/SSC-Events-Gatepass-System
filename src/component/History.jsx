import React, { useState } from 'react';

export default function History() {
	const [students, setStudents] = useState([
		{
			id: 1,
			name: 'Juan Dela Cruz',
			section: 'BSIT 3-1',
			code: 'GP001',
			status: 'Successful',
			startTime: '08:15 AM',
			endTime: '09:00 AM',
		},
		{
			id: 2,
			name: 'Maria Santos',
			section: 'BSCS 2-2',
			code: 'GP002',
			status: 'Successful',
			startTime: '09:30 AM',
			endTime: '10:15 AM',
		},
		{
			id: 3,
			name: 'Jose Rivera',
			section: 'BSIT 2-1',
			code: 'GP003',
			status: 'Successful',
			startTime: '2025-09-06 10:45 AM',
			endTime: '11:30 AM',
		},
	]);

	return (
		<div className="">
			<table className="bg-accent w-full overflow-hidden rounded-md shadow-sm">
				<thead className="bg-primary text-light">
					<tr>
						<th className="px-10 py-3 font-semibold">Student Name</th>
						<th className="px-10 py-3 font-semibold">Section</th>
						<th className="px-10 py-3 font-semibold">Code</th>
						<th className="px-10 py-3 font-semibold">Time Start</th>
						<th className="px-10 py-3 font-semibold">Time End</th>
						<th className="px-10 py-3 font-semibold">Status</th>
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
							<td className="px-4 py-3">{student.name}</td>
							<td className="px-4 py-3">{student.section}</td>
							<td className="px-4 py-3">{student.code}</td>
							<td className="px-4 py-3">{student.startTime}</td>
							<td className="px-4 py-3">{student.endTime}</td>
							<td className="px-4 py-3">{student.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
