// SNIPPET: Navbar
// Customize: APP_NAME, PRIMARY_COLOR class, links array
// No backend needed. Toggle nav items as needed.

export default function Navbar({ appName = "AppName", user = null }) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      {/* Logo / App Name */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg" /> {/* PLACEHOLDER: logo */}
        <span className="font-bold text-lg text-gray-900">{appName}</span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Dashboard</a>
        <a href="#" className="hover:text-indigo-600 transition-colors">Explore</a>
      </div>

      {/* User / CTA */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-medium text-indigo-700">
              {user.name?.[0] ?? "U"}
            </div>
            <span className="text-sm text-gray-700">{user.name}</span>
          </div>
        ) : (
          <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
}
