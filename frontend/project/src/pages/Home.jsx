import { useEffect } from 'react';
// import ProductCard from '../components/ProductCard';
import useProductStore from '../store/productStore';

const Home = () => {
  const { products, loading, error, fetchProducts, deleteProduct } = useProductStore();

  useEffect(() => {
    fetchProducts(); // Gọi API để lấy tất cả sản phẩm
  }, [fetchProducts]);

  if (loading) return <div className="text-center p-8">Đang tải...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="text-3xl font-bold mb-6">Sản phẩm nổi bật</h1>
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

export default Home;