import React from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, LogOut } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-600">ProjectHub</Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600">
                <LayoutDashboard className="mr-1" size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600">
                <LogOut className="mr-1" size={18} />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header