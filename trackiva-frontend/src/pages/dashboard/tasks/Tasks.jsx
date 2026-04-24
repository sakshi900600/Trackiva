import React, { useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import TaskItem from "./TaskItem";
import { Plus } from "lucide-react";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../../api/todo";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Load tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTodos();
        setTasks(data);
      } catch (err) {
        console.log("Error loading todos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!input.trim()) return;

    try {
      const newTask = await createTodo(input);
      setTasks([newTask, ...tasks]);
      setInput("");
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle
  const toggleTask = async (id, current) => {
    try {
      const updated = await updateTodo(id, {
        completed: !current,
      });

      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const removeTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Edit
  const editTask = async (id, newText) => {
    try {
      const updated = await updateTodo(id, { text: newText });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? (completedCount / tasks.length) * 100
    : 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>This Week’s Goals</h2>
          <p className={styles.sub}>Stay consistent 🚀</p>
        </div>

        <span className={styles.progressText}>
          {completedCount}/{tasks.length}
        </span>
      </div>

      {/* Progress */}
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.divider} />

      {/* Add Task */}
      <div className={styles.addTask}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
        />

        <button onClick={addTask}>
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* List */}
      <div className={styles.list}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              toggleTask={() =>
                toggleTask(task._id, task.completed)
              }
              deleteTask={() => removeTask(task._id)}
              editTask={editTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;