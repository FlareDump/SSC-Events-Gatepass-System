import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Juan Dela Cruz",
      section: "BSIT 3-1",
      status: "On Gatepass",
      startTime: Date.now(),
    },
    {
      id: 2,
      name: "Maria Santos",
      section: "BSCS 2-2",
      status: "On Gatepass",
      startTime: Date.now(),
    },
  ]);

  const [newStudent, setNewStudent] = useState({ name: "", section: "" });

  // ⏱ Auto-mark sanction if >30 mins
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents((prev) =>
        prev.map((student) => {
          if (student.status === "On Gatepass" && student.startTime) {
            const elapsed = (Date.now() - student.startTime) / 1000 / 60; // in minutes
            if (elapsed >= 30) {
              return { ...student, status: "Sanction" };
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
    setStudents([
      ...students,
      {
        id: Date.now(),
        name: newStudent.name,
        section: newStudent.section,
        status: "On Gatepass",
        startTime: Date.now(),
      },
    ]);
    setNewStudent({ name: "", section: "" });
  };

  const handleDone = (id) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status: "Done" } : s))
    );
  };

  return (
    <div className="dashboard p-6">
      <h1 className="text-2xl font-bold mb-4">Gatepass Dashboard</h1>

      {/* Add Student Form */}
      <div className="form flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Student Name"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Section"
          value={newStudent.section}
          onChange={(e) =>
            setNewStudent({ ...newStudent, section: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Gatepass
        </button>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.section}</td>
                <td
                  className={`p-2 border font-semibold ${
                    s.status === "Sanction"
                      ? "text-red-600"
                      : s.status === "Done"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {s.status}
                </td>
                <td className="p-2 border">
                  {s.status === "On Gatepass" && (
                    <button
                      onClick={() => handleDone(s.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
