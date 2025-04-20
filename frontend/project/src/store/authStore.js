import { create } from 'zustand';
import { login, register, getUser, logout } from '../api/auth';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  error: null,

  login: async (email, password) => {
    try {
      await login(email, password);
      const userData = await getUser();
      set({ user: userData, isAuthenticated: true, error: null });
    } catch (error) {
      set({ error: 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin.' });
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      await register(username, email, password);
      set({ error: null });
    } catch (error) {
      set({ error: 'Đăng ký thất bại. Vui lòng thử lại.' });
      throw error;
    }
  },

  fetchUser: async () => {
    try {
      const userData = await getUser();
      set({ user: userData, isAuthenticated: true, error: null });
    } catch (error) {
      set({ user: null, isAuthenticated: false, error: null });
    }
  },

  logout: async () => {
    try {
      await logout();
      localStorage.removeItem('accessToken');
      Cookies.remove('refreshToken');
      set({ user: null, isAuthenticated: false, error: null });
    } catch (error) {
      set({ error: 'Đăng xuất thất bại. Vui lòng thử lại.' });
    }
  },
}));

export default useAuthStore;