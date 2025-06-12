import { useState } from "react"
import NewTaskModal from "./new-task-modal"
import "./Todo.css"

const TodoList =() =>{
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Drink 8 glasses of water",
      completed: false,
      category: "HEALTH",
      time: "6:00 AM",
    },
    {
      id: "2",
      title: "Edit the PDF",
      completed: false,
      category: "WORK",
    },
    {
      id: "3",
      title: "Write in a gratitude journal",
      completed: false,
      category: "MENTAL HEALTH",
    },
    {
      id: "4",
      title: "Stretch everyday for 15 mins",
      completed: false,
      category: "HEALTH",
      time: "6:00 AM",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      completed: false,
      category: task.category,
      time: "6:00 AM",
    }
    setTasks([...tasks, newTask])
  }

  const getCurrentDate = () => {
    const today = new Date()
    const day = today.getDate()
    const month = today.toLocaleString("default", { month: "short" })
    return `${day} ${month}`
  }

  return (
    <div className="todo-container">
      {/* Header */}
      <div className="header">
        <h1 className="header-title">
          Today <span className="header-date">{getCurrentDate()}</span>
        </h1>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <div className="task-details">
                <div className="task-header">
                  <span className={`task-title ${task.completed ? "completed" : ""}`}>{task.title}</span>
                  {task.time && (
                    <div className="task-time">
                      <svg className="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      {task.time}
                    </div>
                  )}
                </div>
                <div className={`task-category ${task.category.toLowerCase().replace(" ", "-")}`}>{task.category}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        <svg className="plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* New Task Modal */}
      <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addTask} />
    </div>
  )
}
export default TodoList
