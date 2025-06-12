import React from "react";
import { useState } from "react";
import NewTaskmodal from "../component/NewTaskmodal";
import "./Todo.css";

const TodoList = () => {
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
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swipedTask, setSwipedTask] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      completed: false,
      category: task.category,
      time: "6:00 AM",
    };
    setTasks([...tasks, newTask]);
  };

  const handleTouchStart = (e, taskId) => {
    const touch = e.touches[0];
    setSwipedTask({
      id: taskId,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
    });
  };

  const handleTouchMove = (e, taskId) => {
    if (!swipedTask || swipedTask.id !== taskId) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - swipedTask.startX;
    const deltaY = Math.abs(touch.clientY - swipedTask.startY);

    // Only allow horizontal swipes
    if (deltaY > 30) return;

    // Only allow left swipes (negative deltaX)
    if (deltaX < 0) {
      setSwipeOffset(Math.max(deltaX, -100));
    }
  };

  const handleTouchEnd = (taskId) => {
    if (!swipedTask || swipedTask.id !== taskId) return;

    // If swiped more than 60px, delete the task
    if (swipeOffset < -60) {
      deleteTask(taskId);
    }

    // Reset swipe state
    setSwipedTask(null);
    setSwipeOffset(0);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  };

  return (
    <div className="todo-container">
      {/* Header */}

      <div className="header">
        <h1 className="header-title">
          Today <span className="header-date">{getCurrentDate()}</span>
        </h1>
      </div >
      <div className="header-container1">
        <div className="div">
          <h1 className={`h1 ${activeCategory === "HEALTH" ? "active" : ""}`}
          onClick={()=> setActiveCategory("HEALTH")}>health</h1>
          <h1 className={`h1 ${activeCategory === "WORK" ? "active" : ""}`}
          onClick={()=> setActiveCategory("WORK")}>Work</h1>
        </div>
        <div className="DIV1">
            <h1 className={`h1 ${activeCategory === "MENTAL HEALTH" ? "active" : ""}`}
            onClick={()=> setActiveCategory("MENTAL HEALTH")}>Mental-health</h1>
        <h1 className={`h1 ${activeCategory === "ORDERS" ? "active" : ""}`}
        onClick={()=> setActiveCategory("ORDERS")}>orders</h1> 
        </div>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.filter((task) =>
          activeCategory === "All" ? true: task.category === activeCategory
        )
        .map((task) => (
          <div key={task.id} className="task-item">
            <div
              className="task-content"
              style={{
                transform:
                  swipedTask?.id === task.id
                    ? `translateX(${swipeOffset}px)`
                    : "translateX(0)",
                transition:
                  swipedTask?.id === task.id ? "none" : "transform 0.3s ease",
              }}
              onTouchStart={(e) => handleTouchStart(e, task.id)}
              onTouchMove={(e) => handleTouchMove(e, task.id)}
              onTouchEnd={() => handleTouchEnd(task.id)}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <div className="task-details">
                <div className="task-header">
                  <span
                    className={`task-title ${
                      task.completed ? "completed" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  {task.time && (
                    <div className="task-time">
                      <svg
                        className="clock-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      {task.time}
                    </div>
                  )}
                </div>
                <div
                  className={`task-category ${task.category
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {task.category}
                </div>
              </div>
            </div>
            {swipedTask?.id === task.id && swipeOffset < -20 && (
              <div className="delete-indicator">
                <svg
                  className="delete-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                </svg>
                Delete
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
        <svg
          className="plus-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* New Task Modal */}
      <NewTaskmodal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addTask}
      />
    </div>
  );
};
export default TodoList;
