import { NavLink } from 'react-router-dom'

const links = [
  { to: '/clients', label: 'Clients' },
  { to: '/widget-builder', label: 'Widget builder' },
  { to: '/global-defaults', label: 'Global defaults' },
  { to: '/documentation', label: 'Documentation' },
]

export default function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-gray-200 bg-white min-h-screen sticky top-0">
      <div className="flex h-16 items-center gap-2.5 border-b border-gray-100 px-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600">
          <span className="text-xs font-bold tracking-tight text-white">O</span>
        </div>
        <span className="text-sm font-semibold tracking-tight text-gray-900">Osca configurator</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive
                ? 'bg-violet-50 font-medium text-violet-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <span className="inline-flex rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
          Admin
        </span>
      </div>
    </aside>
  )
}
