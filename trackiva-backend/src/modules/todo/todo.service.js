import Todo from "./todo.model.js";

// Create
export const createTodo = async (text, userId) => {
  return await Todo.create({ text, userId });
};

// Get all (latest first)
export const getTodos = async (userId) => {
  return await Todo.find({ userId }).sort({ createdAt: -1 });
};

// Update (text or completed)
export const updateTodo = async (id, data, userId) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true }
  );

  if (!todo) throw new Error("Todo not found");

  return todo;
};

// Delete
export const deleteTodo = async (id, userId) => {
  const todo = await Todo.findOneAndDelete({ _id: id, userId });

  if (!todo) throw new Error("Todo not found");
};