import React, { useState } from 'react';
import { useTasks } from './task';
import './App.css'; 

const Task = () => {
  const { tasks, dispatch } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Low');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [completedTask, setCompletedTask] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== '') {
      const newTask = {
        id: Math.random().toString(),
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        dueDate: newTaskDueDate,
        status: 'To Do'
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
      resetForm();
    } else {
      alert('Please enter a title for the task.');
    }
  };

  const handleUpdateTask = () => {
    const updatedTask = {
      id: editTaskId,
      title: newTaskTitle,
      description: newTaskDescription,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      status: tasks.find(task => task.id === editTaskId).status
    };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    resetForm();
    setEditTaskId(null);
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    const task = tasks.find(task => task.id === taskId);
    const updatedTask = { ...task, status: newStatus };
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    setCompletedTask(taskId); 
  };

  const handleDeleteTask = taskId => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const handleEditTask = task => {
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setNewTaskPriority(task.priority);
    setNewTaskDueDate(task.dueDate);
    setEditTaskId(task.id);
    setShowForm(true);
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskPriority('Low');
    setNewTaskDueDate('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <div className="task">
      <h1>Task Manager</h1>
      <div className="buttons">
        <button onClick={() => setShowForm(!showForm)}>+ {editTaskId ? 'Edit Task' : 'Create Task'}</button>
      </div>
      {showForm && (
        <div className="add-task-form">
          <input
            type="text"
            placeholder="Title"
            value={newTaskTitle}
            onChange={e => setNewTaskTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTaskDescription}
            onChange={e => setNewTaskDescription(e.target.value)}
          />
          <select value={newTaskPriority} onChange={e => setNewTaskPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            placeholder="Due Date"
            value={newTaskDueDate}
            onChange={e => setNewTaskDueDate(e.target.value)}
          />
          <button onClick={editTaskId ? handleUpdateTask : handleAddTask}>
            {editTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      )}
      <div className="filter">
        <select onChange={e => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="task-list">
        {filteredTasks.map(task => (
          <div className="task-item" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-details">
              <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              {task.dueDate && <span className="due-date">Due: {task.dueDate}</span>}
            </div>
            <div className="task-actions">
              <button onClick={() => handleUpdateStatus(task.id, 'To Do')}>To Do</button>
              <button onClick={() => handleUpdateStatus(task.id, 'In Progress')}>In Progress</button>
              <button onClick={() => handleUpdateStatus(task.id, 'Done')}>Done</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              {task.id === completedTask && <p>Great Job!</p>}
            </div>
            <button onClick={handleToggleDetails}>Update</button>
            {showDetails && (
              <div className="task-update-details">
                <input type="text" placeholder="Notes" />
                <input type="time" placeholder="Reminder Time" />
                <p>Last Activity: {task.status}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
