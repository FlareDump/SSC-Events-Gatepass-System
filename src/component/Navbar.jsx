export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-md flex justify-between items-center">
      <h1
        className="text-xl font-bold"
        style={{ color: "var(--color-primary)" }}
      >
        GatePass System
      </h1>
      <button className="btn btn-secondary">Logout</button>
    </nav>
  );
}
