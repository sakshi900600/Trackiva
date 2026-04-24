import * as service from "./interview.service.js";

export const createQA = async (req, res, next) => {
  try {
    const data = await service.createQA(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: "Created",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getQAs = async (req, res, next) => {
  try {
    const data = await service.getQAs(req.query, req.user._id);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getQAById = async (req, res, next) => {
  try {
    const data = await service.getQAById(
      req.params.id,
      req.user._id
    );

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateQA = async (req, res, next) => {
  try {
    const data = await service.updateQA(
      req.params.id,
      req.body,
      req.user._id
    );

    res.json({
      success: true,
      message: "Updated",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQA = async (req, res, next) => {
  try {
    await service.deleteQA(req.params.id, req.user._id);

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    next(err);
  }
};