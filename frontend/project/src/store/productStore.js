import { create } from 'zustand';
import { getAllProducts } from '../api/auth';

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const data = await getAllProducts();
      set({ products: data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Lỗi khi tải sản phẩm.', loading: false });
    }
  },

  deleteProduct: async (productId) => {
    try {
      // Giả lập API xóa sản phẩm
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      }));
    } catch (error) {
      set({ error: 'Lỗi khi xóa sản phẩm.' });
    }
  },
}));

export default useProductStore;