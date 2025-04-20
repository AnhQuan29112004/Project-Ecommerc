import { create } from 'zustand';
import { getVendorProducts, getVendors } from '../api/auth';

const vendorStore = create((set) => ({
  vendorData: [],
  vendorCount: 0,
  loading: false,
  error: null,

  fetchVendor: async () => {
    set({ loading: true });
    try {
      const vendorData = await getVendors();
      set({ vendorData: vendorData.items || [], loading: false, error: null });
    } catch (error) {
      set({ error: 'Lỗi khi tải vendors.', loading: false });
    }
  },

    fetchVendorProducts: async (vendorId) => {
        set({ loading: true });
        try {
        const vendorProducts = await getVendorProducts(vendorId);
        set({ vendorData: vendorProducts.items || [], loading: false, error: null });
        } catch (error) {
        set({ error: 'Lỗi khi tải sản phẩm của vendor.', loading: false });
        }
    },
}));
    


export default vendorStore;