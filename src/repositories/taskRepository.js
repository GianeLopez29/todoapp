import Task from '../models/Task.js';

export const createTask = async (taskData) => {
  return await Task.create(taskData);
};

export const findTasksByUser = async (userId) => {
  return await Task.find({ user: userId }).populate('category').sort({ createdAt: -1 });
};

export const findTaskById = async (id) => {
  return await Task.findById(id).populate('category');
};

export const updateTask = async (id, updateData) => {
  return await Task.findByIdAndUpdate(id, updateData, { new: true }).populate('category');
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

export const findTasksByCategory = async (categoryId) => {
  return await Task.find({ category: categoryId });
};