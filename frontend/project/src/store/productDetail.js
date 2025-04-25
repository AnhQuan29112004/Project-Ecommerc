import { create } from 'zustand';
import { getProductDetail } from '../api/auth';

const productDetail = create((set) => ({
  detail: [],
  loading: false,
  error: null,

  fetchDetailProduct: async (slug) => {
    set({ loading: true });
    try {
      const data = await getProductDetail(slug);
      console.log('Categories:', data);
      set({ detail: data, loading: false, error: null });
    } catch (error) {
      set({ error: 'Lỗi khi tải detail product.', loading: false });
    }
  },
}));

export default productDetail;