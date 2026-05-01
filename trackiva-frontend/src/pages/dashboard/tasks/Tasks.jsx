import React, { useEffect, useState } from "react";
import styles from "./Tasks.module.css";
import TaskItem from "./TaskItem";
import { Plus, Target } from "lucide-react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../../../api/todo";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleTask = async (id, current) => {
    try {
      const updated = await updateTodo(id, { completed: !current });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTodo(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = async (id, newText) => {
    try {
      const updated = await updateTodo(id, { text: newText });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.log(err);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Target size={16} />
          </div>
          <div>
            <h2 className={styles.title}>Weekly Goals</h2>
            <p className={styles.subtitle}>Stay consistent 🚀</p>
          </div>
        </div>
        <span className={styles.progressBadge}>
          {completedCount}/{tasks.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.progressLabel}>{Math.round(progress)}%</span>
      </div>

      {/* Add Task */}
      <div className={styles.addTask}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a goal for this week..."
          className={styles.addInput}
        />
        <button className={styles.addBtn} onClick={addTask}>
          <Plus size={16} />
        </button>
      </div>

      {/* Task List */}
      <div className={styles.list}>
        {loading ? (
          <div className={styles.skeletonList}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.skeletonItem}>
                <div className={styles.skeletonCircle} />
                <div className={styles.skeletonLine} />
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyEmoji}>🎯</span>
            <p className={styles.emptyTitle}>No goals yet</p>
            <p className={styles.emptyDesc}>
              Add your first weekly goal above and stay on track.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              toggleTask={() => toggleTask(task._id, task.completed)}
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