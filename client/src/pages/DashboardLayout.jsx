import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function DashboardLayout() {
  const { user } = useAuth()

  return (
    <div>
      <header>
        <center>
          <h1 className="text-3xl font-bold mt-2">TaskCraft</h1>
        </center>
        <marquee>
          <h3>
            Welcome {user ? user.name : ''} | Manage all your tasks in one place | Click on a task
            row to open the details | Use the + New Task button to add a new task
          </h3>
        </marquee>
        <div className="flex justify-center gap-6 border-b border-gray-400 pb-2">
          <NavLink to="/dashboard" end className="text-blue-500 hover:underline hover:decoration-blue-700">
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/profile" className="text-blue-500 hover:underline hover:decoration-blue-700">
            Profile
          </NavLink>
        </div>
      </header>
      <br />
      <main className="ml-6 mr-6">
        <Outlet />
      </main>
    </div>
  )
}
