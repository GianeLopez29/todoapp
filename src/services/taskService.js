import * as taskRepository from '../repositories/taskRepository.js';

export const createTask = async (taskData, userId) => {
  return await taskRepository.createTask({ ...taskData, user: userId });
};

export const getUserTasks = async (userId) => {
  return await taskRepository.findTasksByUser(userId);
};

export const getTaskById = async (taskId, userId) => {
  const task = await taskRepository.findTaskById(taskId);
  if (!task || task.user.toString() !== userId) {
    throw new Error('Tarea no encontrada');
  }
  return task;
};

export const updateTask = async (taskId, updateData, userId) => {
  const task = await taskRepository.findTaskById(taskId);
  if (!task || task.user.toString() !== userId) {
    throw new Error('Tarea no encontrada');
  }
  return await taskRepository.updateTask(taskId, updateData);
};

export const deleteTask = async (taskId, userId) => {
  const task = await taskRepository.findTaskById(taskId);
  if (!task || task.user.toString() !== userId) {
    throw new Error('Tarea no encontrada');
  }
  return await taskRepository.deleteTask(taskId);
};