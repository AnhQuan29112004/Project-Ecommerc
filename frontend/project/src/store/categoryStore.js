import { create } from 'zustand';
import { getCategories } from '../api/auth';

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const data = await getCategories();
      set({ categories: data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Lỗi khi tải danh mục.', loading: false });
    }
  },
}));

export default useCategoryStore;