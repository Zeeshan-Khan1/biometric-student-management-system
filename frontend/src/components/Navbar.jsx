import React from 'react'
import { SunMedium, MoonStar, UserCircle2 } from 'lucide-react'

const Navbar = () => {
  const [theme, setTheme] = React.useState('light')

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : 'cupcake')
  }, [theme])

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-base-100/90 backdrop-blur border-b border-white/60 shadow-sm">
      <div>
        <p className="text-xs text-gray-500">Dr. AQ Khan School</p>
        <h1 className="font-semibold text-lg text-neutral">Smart Attendance System</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="btn btn-ghost btn-sm rounded-full"
          onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonStar size={18} /> : <SunMedium size={18} />}
        </button>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-200 border border-white/60">
          <UserCircle2 size={22} className="text-primary" />
          <span className="text-sm font-medium text-neutral">Admin</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar

