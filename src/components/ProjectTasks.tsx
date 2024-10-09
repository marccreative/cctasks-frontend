import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Plus, Clock, Calendar } from 'lucide-react'

interface Task {
  id: number
  name: string
  description: string
  startTime: Date
  finishTime: Date
  dedicatedTime: number
  status: 'todo' | 'in-progress' | 'completed'
}

const initialTasks: Task[] = [
  {
    id: 1,
    name: 'Design mockups',
    description: 'Create initial design mockups for the homepage',
    startTime: new Date('2024-03-15T09:00:00'),
    finishTime: new Date('2024-03-17T17:00:00'),
    dedicatedTime: 16,
    status: 'completed',
  },
  {
    id: 2,
    name: 'Implement login functionality',
    description: 'Develop and test user authentication system',
    startTime: new Date('2024-03-18T09:00:00'),
    finishTime: new Date('2024-03-20T17:00:00'),
    dedicatedTime: 24,
    status: 'in-progress',
  },
]

const ProjectTasks: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: '',
    description: '',
    startTime: new Date(),
    finishTime: new Date(),
    dedicatedTime: 0,
    status: 'todo',
  })

  const handleAddTask = () => {
    if (newTask.name && newTask.description) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 } as Task])
      setNewTask({
        name: '',
        description: '',
        startTime: new Date(),
        finishTime: new Date(),
        dedicatedTime: 0,
        status: 'todo',
      })
      setShowAddTask(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>
      <div className="mb-6">
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2" size={18} />
          Add New Task
        </button>
      </div>
      {showAddTask && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <div className="flex space-x-4">
              <input
                type="datetime-local"
                value={format(newTask.startTime || new Date(), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => setNewTask({ ...newTask, startTime: new Date(e.target.value) })}
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                value={format(newTask.finishTime || new Date(), "yyyy-MM-dd'T'HH:mm")}
                onChange={(e) => setNewTask({ ...newTask, finishTime: new Date(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
            <input
              type="number"
              placeholder="Dedicated Time (hours)"
              value={newTask.dedicatedTime}
              onChange={(e) => setNewTask({ ...newTask, dedicatedTime: Number(e.target.value) })}
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddTask}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
      <div className="space-y-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="mr-1" size={16} />
                <span>{format(task.startTime, 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1" size={16} />
                <span>{task.dedicatedTime} hours</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                task.status === 'completed' ? 'bg-green-200 text-green-800' :
                task.status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
                'bg-gray-200 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectTasks