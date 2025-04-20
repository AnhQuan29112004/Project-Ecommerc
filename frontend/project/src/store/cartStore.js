import { create } from 'zustand';
// import { getCart, getCartCount } from '../api/auth';

const useCartStore = create((set) => ({
  cartItems: [],
  cartCount: 0,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const cartData = await getCart();
      set({ cartItems: cartData.items || [], loading: false, error: null });
    } catch (error) {
      set({ error: 'Lỗi khi tải giỏ hàng.', loading: false });
    }
  },

  fetchCartCount: async () => {
    try {
      const data = await getCartCount();
      set({ cartCount: data.count || 0, error: null });
    } catch (error) {
      set({ error: 'Lỗi khi tải số lượng giỏ hàng.' });
    }
  },

  removeItem: async (itemId) => {
    try {
      // Giả lập API xóa sản phẩm khỏi giỏ hàng
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== itemId),
        cartCount: state.cartCount - 1,
      }));
    } catch (error) {
      set({ error: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng.' });
    }
  },
  addToCart: async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      set((state) => ({ cartCount: state.cartCount + quantity }));
      // Tùy chọn: gọi lại fetchCart để cập nhật cartItems
    } catch (error) {
      set({ error: 'Lỗi khi thêm sản phẩm vào giỏ hàng.' });
    }
  },
}));
    


export default useCartStore;