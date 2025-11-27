import * as categoryRepository from '../repositories/categoryRepository.js';
import * as taskRepository from '../repositories/taskRepository.js';

export const createCategory = async (categoryData, userId) => {
  return await categoryRepository.createCategory({ ...categoryData, user: userId });
};

export const getUserCategories = async (userId) => {
  return await categoryRepository.findCategoriesByUser(userId);
};

export const getCategoryById = async (categoryId, userId) => {
  const category = await categoryRepository.findCategoryById(categoryId);
  if (!category || category.user.toString() !== userId) {
    throw new Error('Categoría no encontrada');
  }
  return category;
};

export const updateCategory = async (categoryId, updateData, userId) => {
  const category = await categoryRepository.findCategoryById(categoryId);
  if (!category || category.user.toString() !== userId) {
    throw new Error('Categoría no encontrada');
  }
  return await categoryRepository.updateCategory(categoryId, updateData);
};

export const deleteCategory = async (categoryId, userId) => {
  const category = await categoryRepository.findCategoryById(categoryId);
  if (!category || category.user.toString() !== userId) {
    throw new Error('Categoría no encontrada');
  }

  // Verificar si hay tareas asociadas
  const tasks = await taskRepository.findTasksByCategory(categoryId);
  if (tasks.length > 0) {
    throw new Error('No se puede eliminar una categoría con tareas asociadas');
  }

  return await categoryRepository.deleteCategory(categoryId);
};