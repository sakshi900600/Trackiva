import * as service from "./todo.service.js";

export const createTodo = async (req, res, next) => {
  try {
    const todo = await service.createTodo(
      req.body.text,
      req.user._id
    );

    res.status(201).json({
      success: true,
      message: "Todo created",
      data: todo,
    });
  } catch (err) {
    next(err);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const todos = await service.getTodos(req.user._id);

    res.json({
      success: true,
      data: todos,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await service.updateTodo(
      req.params.id,
      req.body,
      req.user._id
    );

    res.json({
      success: true,
      message: "Updated",
      data: todo,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    await service.deleteTodo(
      req.params.id,
      req.user._id
    );

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    next(err);
  }
};