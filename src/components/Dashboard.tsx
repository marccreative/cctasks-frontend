import React from 'react'
import { Link } from 'react-router-dom'
import { Folder } from 'lucide-react'

const projects = [
  { id: 1, name: 'Website Redesign', tasks: 12 },
  { id: 2, name: 'Mobile App Development', tasks: 8 },
  { id: 3, name: 'Database Migration', tasks: 5 },
]

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Projects Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <Folder className="text-blue-500 mr-2" size={24} />
              <h2 className="text-xl font-semibold">{project.name}</h2>
            </div>
            <p className="text-gray-600">{project.tasks} tasks</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard