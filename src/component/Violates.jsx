import React, { useState, useEffect } from 'react';

export default function Violates() {
	const [students, setStudents] = useState([
		{
			id: 1,
			name: 'Juan Dela Cruz',
			section: 'BSIT 3-1',
			code: 'GP001',
			status: 'DNR',
			startTime: Date.now(),
		},
		{
			id: 2,
			name: 'Maria Santos',
			section: 'BSCS 2-2',
			code: 'GP002',
			status: 'DNR',
			startTime: Date.now(),
		},
		{
			id: 3,
			name: 'Jose Rivera',
			section: 'BSIT 2-1',
			code: 'GP003',
			status: 'DNR',
			startTime: Date.now(),
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
						<th className="px-10 py-3 font-semibold">Status</th>
						<th className="px-10 py-3 font-semibold">Action</th>
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
							<td className="px-4 py-3">{student.status}</td>
							<td className="px-4 py-3">
								<button className="bg-primary text-light rounded px-2 py-1">
									Late
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
