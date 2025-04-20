import { useEffect } from 'react';
// import ProductCard from '../components/ProductCard';
import { getVendorProducts } from '../api/auth';
import { useSearchParams } from 'react-router-dom';
import { create } from 'zustand';

const useStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (vendorId, keyword = '') => {
    set({ loading: true });
    try {
      const data = await getVendorProducts(vendorId);
      let filteredProducts = data.products || [];
      if (keyword) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      set({ products: filteredProducts, loading: false, error: null });
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

const Store = () => {
  const { products, loading, error, fetchProducts, deleteProduct } = useStore();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    fetchProducts(1, keyword); // Giả lập vendor ID
  }, [keyword, fetchProducts]);

  if (loading) return <div className="text-center p-8">Đang tải...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="text-3xl font-bold mb-6">Cửa hàng</h1>
      {keyword && <p className="mb-4">Kết quả tìm kiếm cho: "{keyword}"</p>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            {/* <ProductCard product={product} onDelete={deleteProduct} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;