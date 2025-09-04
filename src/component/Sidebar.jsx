export default function Sidebar() {
	return (
		<aside className="bg-highlight p-md flex h-screen w-fit flex-col justify-between shadow-md">
			<ul className="space-y-4">
				<li>
					<a href="#" className="flex items-center space-x-4 font-semibold">
						<img src="/public/Logo/SSC Logo.png" alt="SSC" className="logo" />
						<h1 className="text-light translate-y-2 text-4xl">GATEPASS</h1>
					</a>
				</li>
				<li className="bg-primary rounded-md px-5 py-2">
					<a href="#" className="text-light text-[20px]">
						<i class="fa-solid fa-house icon mr-2"></i>
						Gatepass
					</a>
				</li>
				<li className="bg-primary rounded-md px-5 py-2">
					<a href="#" className="text-light gap- text-[20px]">
						<i class="fa-solid fa-circle-exclamation mr-2"></i>
						Violates
					</a>
				</li>
				<li className="bg-primary rounded-md px-5 py-2">
					<a href="#" className="text-light gap- text-[20px]">
						<i class="fa-solid fa-clock-rotate-left mr-2"></i>
						History
					</a>
				</li>
			</ul>

			<div>
				<p className="text-light text-sm">
					ⓒ STI College Davao- Supreme Student Council.
				</p>
				<p className="text-light text-sm">Term 2024 - 2025.</p>
			</div>
		</aside>
	);
}
