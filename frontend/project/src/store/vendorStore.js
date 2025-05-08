import { create } from 'zustand';
import { getVendorProducts, getVendors } from '../api/auth';

const useVendorStore  = create((set) => ({
  vendorData: [],
  vendorCount: 0,
  loading: false,
  error: null,

  fetchVendor: async () => {
    set({ loading: true });
    try {
      const vendors = await getVendors();
      set({ vendorData: vendors || [], loading: false, error: null });
      
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
    


export default useVendorStore ;