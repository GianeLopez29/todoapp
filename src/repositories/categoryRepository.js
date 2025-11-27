import Category from '../models/Category.js';

export const createCategory = async (categoryData) => {
  return await Category.create(categoryData);
};

export const findCategoriesByUser = async (userId) => {
  return await Category.find({ user: userId }).sort({ createdAt: -1 });
};

export const findCategoryById = async (id) => {
  return await Category.findById(id);
};

export const updateCategory = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};