export default function Sidebar() {
	return (
		<aside className="bg-highlight p-md z-100 flex h-screen w-fit flex-col justify-between shadow-md">
			<div className="space-y-4">
				<a
					href="/Gatepass"
					className="flex items-center space-x-4 font-semibold"
				>
					<img src="/public/Logo/SSC Logo.png" alt="SSC" className="logo" />
					<h1 className="text-light translate-y-2 text-4xl">GATEPASS</h1>
				</a>

				<a href="/Gatepass" className="text-light block text-[20px]">
					<div className="bg-primary rounded-md px-5 py-2">
						<i className="fa-solid fa-house icon mr-2"></i>
						Gatepass
					</div>
				</a>

				<a href="/Violates" className="text-light block text-[20px]">
					<div className="bg-primary rounded-md px-5 py-2">
						<i className="fa-solid fa-circle-exclamation mr-2"></i>
						Violates
					</div>
				</a>

				<a href="/History" className="text-light block text-[20px]">
					<div className="bg-primary rounded-md px-5 py-2">
						<i className="fa-solid fa-clock-rotate-left mr-2"></i>
						History
					</div>
				</a>
			</div>

			<div>
				<p className="text-light text-sm">
					ⓒ STI College Davao- Supreme Student Council.
				</p>
				<p className="text-light text-sm">Term 2024 - 2025.</p>
			</div>
		</aside>
	);
}
