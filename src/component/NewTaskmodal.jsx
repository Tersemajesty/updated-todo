"use client"

import { useState } from "react"
import "./new-task-modal.css"

const NewTaskmodal=({ isOpen, onClose, onSave })=> {
  const [taskTitle, setTaskTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [addSubtask, setAddSubtask] = useState(false)
  const [subtaskTime, setSubtaskTime] = useState("")

  const categories = ["HEALTH", "WORK", "MENTAL HEALTH"]

  const handleSave = () => {
    if (taskTitle.trim()) {
      onSave({
        title: taskTitle,
        category: selectedCategory,
        hasSubtask: addSubtask,
      })
      setTaskTitle("")
      setSelectedCategory("")
      setAddSubtask(false)
      onClose()
    }
  }

  const handleClose = () => {
    setTaskTitle("")
    setSelectedCategory("")
    setAddSubtask(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">New task</h2>
          <button className="close-btn" onClick={handleClose}>
            <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          {/* Task Input */}
          <div className="input-section">
            <textarea
              placeholder="Write a new task..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="task-input"
            />
          </div>

          {/* Add Subtask Option */}
          <div className="subtask-section">
            <label className="subtask-label">
              <input
                type="checkbox"
                checked={addSubtask}
                onChange={(e) => setAddSubtask(e.target.checked)}
                className="subtask-checkbox"
              />
              Add subtask
            </label>
          </div>

          {/* Categories */}
          <div className="categories-section">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Save Button */}
          <button onClick={handleSave} disabled={!taskTitle.trim()} className="save-btn">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
export default NewTaskmodal