import axiosInstance from "./axiosInstance";

// 📌 Get all todos
export const getTodos = async () => {
  const res = await axiosInstance.get("/todo");
  return res.data.data;
};

// 📌 Create todo
export const createTodo = async (text) => {
  const res = await axiosInstance.post("/todo", { text });
  return res.data.data;
};

// 📌 Update todo (text / completed)
export const updateTodo = async (id, data) => {
  const res = await axiosInstance.put(`/todo/${id}`, data);
  return res.data.data;
};

// 📌 Delete todo
export const deleteTodo = async (id) => {
  const res = await axiosInstance.delete(`/todo/${id}`);
  return res.data;
};